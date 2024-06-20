const Map = require('../../models/map');
const { maps } = require('../../utils/store');
const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');

module.exports = {
    deleted: false,
    name: 'delete-map',
    description: 'Delete a Map.',
    devOnly: false,
    options: [
        {
            name: 'map-name',
            description: 'Name of the Map',
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: maps.get()
        },
    ],

    callback: async (client, interaction) => {
        const {options} = interaction;

        const map_name = options.getString('map-name');
        const map_tag = options.getString('map-name').replace(/ /g, '_').toLowerCase();

        if(await Map.destroy({ where: { tag: map_tag } })) {
            const modelData = await Map.findAll();;
            maps.writeFromModel(modelData);
            interaction.reply(`Map **${map_name}** was deleted!`);
        }
    },
};