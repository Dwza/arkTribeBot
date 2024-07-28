const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');
const { mods } = require('../../utils/store');

module.exports = {
    deleted: false,
    name: 'delete-mod',
    description: 'Delete a Mod.',
    devOnly: true,
    options: [
        {
            name: 'mod-name',
            description: 'Name of the Mod',
            required: true,
            type: ApplicationCommandOptionType.Integer,
            choices: mods.get()
        },
    ],

    callback: async (client, interaction) => {
        const {options} = interaction;

        const mod = options.get('mod-name');
        const p = mods.get();
        const current = mods.get(mod.value);

        mods.writeFromModel(p.filter(e => e.value !== mod.value), "name", "value");

        interaction.reply(`${current.name} was deleted!`);
    },
};