const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
    EmbedBuilder,
} = require('discord.js');

const {parse} = require('node-html-parser');

const  axios = require('axios');
const { plugins } = require('../../utils/store');

module.exports = {
    name: 'changelog',
    description: 'List Changelog of Plugin.',

    options: [
        {
            name: 'mod-name',
            description: 'The name of the Mod',
            required: true,
            type: ApplicationCommandOptionType.Integer,
            choices: plugins.get()
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
            .setTitle(plugins.get(mod.id).name)
        ;

        const config = {
            baseURL: process.env.CURSE_API_URL,
            headers: {
                'Accept':'application/json',
                'x-api-key': process.env.CURSE_API_KEY
            }
        }

        await axios.get(`/mods/${mod.id}/files?pageSize=1`, config)
            .then(async function(res) {

                const data = res.data.data[0];
           
                const d = new Date(data.fileDate);
                let day = d.getDate(); 
                let month = d.getMonth()+1;
                let year = d.getFullYear();
                let dString = (day<10?"0":"") + day + "." + (month<10?"0":"") + month + "." + year;

                embed.setFooter({ text: `Last mod update: ${dString}`, iconURL: 'https://dinoinsel.de/assets/img/dinoinsel-logo-v3.png' })
            
                const fileId = data.id;
                await axios.get(`/mods/${mod.id}/files/${fileId}/changelog`, config)
                    .then(function(res) {
                        const root = parse(res.data.data);
                        const pTags = root.querySelectorAll("p");
                        let content = "";
                        for(let i = 0; i < pTags.length; i++) {

                            let row = pTags[i].innerHTML.replaceAll("<br>", '\r\n');

                            if(row.includes(':')) {
                                row = `**${row}**`;
                                if(i > 0) {
                                    row = `\r\n${row}`;
                                }
                            }
                                
                            content += row + `\r\n`;
                        }
                        embed.setDescription(content);
                    });
            })
            .catch((err) => {
                console.log('ERR:', err);
            })
        ;
        
        interaction.reply({ embeds: [embed] });
    },
};