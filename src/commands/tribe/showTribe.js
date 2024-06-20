const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
    EmbedBuilder,
} = require('discord.js');

const { tribes } = require('../../utils/store');
const Tribe = require('../../models/tribe');
const Member = require('../../models/member');
const Server = require('../../models/server');
const Map = require('../../models/map');

module.exports = {
    name: 'show-tribe',
    description: 'Show tribe details.',
    options: [
        {
            name: 'tribe-name',
            description: 'The name of the Server',
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: tribes.get()
        },
    ],

    callback: async (client, interaction) => {
     
        const { options } = interaction;
        const data = {};

        // tríbe
        const trbs = await Tribe.findAll({
            where: {
                tag: options.getString('tribe-name')
            }
        });
        
        data.name = trbs[0].name;
        data.lat = trbs[0].lat;
        data.lon = trbs[0].lon;

        // members
        const members = await Member.findAll({
            where: {
                tribe_tag: trbs[0].tag
            }
        });
        data.count = members.length;
      
        // server
        const server = await Server.findAll({
            where: {
                tag: trbs[0].server_tag
            }
        });

        data.server = server[0].name
        // map
        const map = await Map.findAll({
            where: {
                tag: server[0].map_tag
            }
        });

        
        data.map = map[0].name;

        const embed = new EmbedBuilder()
        .setTitle(`Detail zu ${data.name}`)
        .setColor('Blue')
        .addFields(
            { name: 'Name:', value: data.name, inline: true},
            { name: 'Mitglieder:', value: `${data.count}`, inline: true},
        )
    
        .addFields({ name: 'Map', value: data.map, inline: false })
        .addFields(
            { name: 'LAT', value: `${data.lat.toFixed(2)}`, inline: true},
            { name: 'LON', value: `${data.lon.toFixed(2)}`, inline: true}
        )
        .addFields({ name: 'Server', value: data.server, inline: false, })
        .addFields()
        .setTimestamp()
        .setThumbnail('https://dinoinsel.de/assets/img/dinoinsel-logo-v3.png')
        .setImage('https://dinoinsel.de/storage/gallerie/avFOhkEZYCKkzVr2IjdsimxFUqwrL1yuEDuPh9XN.jpg')
        .setFooter({ text: 'Last time called', iconURL: 'https://dinoinsel.de/assets/img/dinoinsel-logo-v3.png' })
        ;
        
        interaction.reply({ embeds: [embed] });
    },
};