const { EmbedBuilder } = require('discord.js');
const Tribe = require('../../models/tribe');

module.exports = {
    name: 'list-tribes',
    description: 'List  all created tribes.',

    callback: async (client, interaction) => {
     
        const { options } = interaction;
   
        // tríbe
        const trbs = await Tribe.findAll(
            {
                order: [
                    ['name', 'ASC']
                ]
            }
        );
        
        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setThumbnail('https://dinoinsel.de/assets/img/dinoinsel-logo-v3.png')
        .setFooter({ text: 'Last time called', iconURL: 'https://dinoinsel.de/assets/img/dinoinsel-logo-v3.png' })
        .setTitle("All Tribes")
        .setColor('Blue')
        ;

        let tribeNames = "";
        for(const tribe of trbs) {
            tribeNames += "`" + tribe.name + "`\n";
        }
        embed.addFields(
            {name: 'Tribe names',
            value: tribeNames}
        );
        
        interaction.reply({ embeds: [embed] });
    },
};