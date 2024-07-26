const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');
const { plugins } = require('../../utils/store');

module.exports = {
    deleted: false,
    name: 'add-mod',
    description: 'Add a Mod.',
    devOnly: true,
    options: [
        {
            name: 'mod-name',
            description: 'Name of the Mod',
            required: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'project-id',
            description: 'Project-Id of the Mod',
            required: true,
            type: ApplicationCommandOptionType.Integer
        },
    ],

    callback: async (client, interaction) => {
        const {options} = interaction;

        const modName = options.getString('mod-name');
        const projectId = options.get('project-id');
        const p = plugins.get();

        if((p.filter(e => e.value === projectId.value)).lenght > 0) {
            interaction.reply(`${modName} already exists!`);
        }else {
            const mod = {
                name: modName,
                value: projectId.value
            }
            p.push(mod);
            plugins.writeFromModel(p, "name", "value")
            interaction.reply(`${modName} was added!`);
        }
    },
};