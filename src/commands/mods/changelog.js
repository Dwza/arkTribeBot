const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
    EmbedBuilder,
} = require('discord.js');

const {parse} = require('node-html-parser');

const  axios = require('axios');
const { mods } = require('../../utils/store');
const formatDate = require('../../utils/formatDate');

module.exports = {
    name: 'changelog',
    description: 'List Changelog of Mod.',

    options: [
        {
            name: 'mod-name',
            description: 'The name of the Mod',
            required: true,
            type: ApplicationCommandOptionType.Integer,
            choices: mods.get()
        },
    ],

    callback: async (client, interaction) => {
     
        const { options } = interaction;

        const mod = {
            id: options.get('mod-name').value,
        }

        
        const embed = new EmbedBuilder()
            .setColor('Blue')
            .setThumbnail('https://dinoinsel.de/assets/img/dinoinsel-logo-v3.png')
            .setTitle(mods.get(mod.id).name)
        ;

        const config = {
            baseURL: process.env.CURSE_API_URL,
            headers: {
                'Accept':'application/json',
                'x-api-key': process.env.CURSE_API_KEY
            }
        }

        await axios.get(`/mods/${mod.id}/files?pageSize=10`, config)
            .then(async function(res) {

                //console.log(res.data.data);

                let i = 0;
                let date, nextDate;
                let content = "";
                while(date === nextDate) {
                    const data = res.data.data[i];
                    if(i === 0) {
                        date = formatDate(data.fileDate);
                    }
                    nextDate = formatDate(data.fileDate);

                    if(date === nextDate && data.fileName.includes('windowsserver')) {
                        embed.setFooter({ text: `Last mod update: ${date}`, iconURL: 'https://dinoinsel.de/assets/img/dinoinsel-logo-v3.png' });
                        const fileId = data.id;
                        await axios.get(`/mods/${mod.id}/files/${fileId}/changelog`, config)
                            .then(function(res) {
                                const root = parse(res.data.data);
                                const pTags = root.querySelectorAll("p");
                                
                                for(let i = 0; i < pTags.length; i++) {

                                    let row = pTags[i].innerHTML.replaceAll("<br>", '\r\n');
                                        row = row.replaceAll("&nbsp; -", " -");

                                    if(row.includes(':')) {
                                        row = `**${row}**`;
                                        if(i > 0) {
                                            row = `\r\n${row}`;
                                        }
                                    }
                                        
                                    content += row + `\r\n`;
                                }
                            });
                    }
                    i++;
                }
                embed.setDescription(content);
            })
            .catch((err) => {
                console.log('ERR:', err);
            })
        ;
        
        interaction.reply({ embeds: [embed] });
    },
};