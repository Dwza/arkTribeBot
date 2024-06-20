const { EmbedBuilder } = require('discord.js');
const Server = require('../../models/server');
const Map = require('../../models/map');

module.exports = {
    name: 'list-servers',
    description: 'List  all servers.',

    callback: async (client, interaction) => {
   

        const m = {};
        const maps = await Map.findAll();
        for(const map of maps) {
            m[map.tag] = map.name;
        }

        const result = await Server.findAll(
            {
                order: [
                    ['name', 'ASC']
                ]
            }
        );
        
        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setThumbnail('https://dinoinsel.de/assets/img/dinoinsel-logo-v3.png')
        .setTimestamp()
        .setFooter({ text: 'Stand', iconURL: 'https://dinoinsel.de/assets/img/dinoinsel-logo-v3.png' })
        .setTitle("All Servers")
        .setColor('Blue')
        ;

        let values = "";
        for(const data of result) {
            values += "`" + data.name + " > " + m[data.map_tag] + "` \n";
        }
        embed.addFields(
            {name: 'Server names',
            value: values}
        );
        
        interaction.reply({ embeds: [embed] });
    },
};