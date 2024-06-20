const Map = require('../../models/map');
const { maps } = require('../../utils/store');

const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');

module.exports = {
    deleted: false,
    name: 'create-map',
    description: 'Create a Map.',
    devOnly: true,
    options: [
        {
            name: 'map-name',
            description: 'Name of the Map',
            required: true,
            type: ApplicationCommandOptionType.String
        },
    ],

    callback: async (client, interaction) => {
        const {options} = interaction;

        const map_tag = options.getString('map-name').replace(/ /g, '_').toLowerCase();
        
        const [map, created] = await Map.findOrCreate({where: { tag: map_tag }, defaults: { name: await options.getString('map-name') }});

        if(!created) {
            interaction.reply(`Map **${map.name}**, already existed!`);
        }else {
            const modelData = await Map.findAll();;
            maps.writeFromModel(modelData);
            interaction.reply(`Map **${map.name}**, was created!`);
        }
    },
};