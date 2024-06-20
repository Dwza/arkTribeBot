const { EmbedBuilder } = require('discord.js');
const Map = require('../../models/map');

module.exports = {
    name: 'list-maps',
    description: 'List  all maps.',

    callback: async (client, interaction) => {
   
        const maps = await Map.findAll(
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
        .setTitle("All Maps")
        .setColor('Blue')
        ;

        let values = "";
        for(const data of maps) {
            values += "`" + data.name + "`\n";
        }
        embed.addFields(
            {name: 'Map names',
            value: values}
        );
        
        interaction.reply({ embeds: [embed] });
    },
};