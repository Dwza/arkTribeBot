const Tribe = require('../../models/tribe');
const { tribes } = require('../../utils/store');
const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');

module.exports = {
    deleted: false,
    name: 'delete-tribe',
    description: 'Delete a Tribe.',
    devOnly: true,
    options: [
        {
            name: 'tribe-name',
            description: 'Name of the Tribe',
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: tribes.get()
        },
    ],

    callback: async (client, interaction) => {
        const {options} = interaction;

        const data = {
            name: options.getString('tribe-name'),
            tag: options.getString('tribe-name').replace(/ /g, '_').toLowerCase()
        }

        if(await Tribe.destroy({ where: { tag: data.tag } })) {
            const modelData = await Tribe.findAll();;
            tribes.writeFromModel(modelData);
            interaction.reply(`Tribe **${data.name}** was deleted!`);
        }
    },
};