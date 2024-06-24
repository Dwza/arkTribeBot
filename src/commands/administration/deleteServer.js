const Server = require('../../models/server');
const { servers } = require('../../utils/store');
const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');

module.exports = {
    deleted: false,
    name: 'delete-server',
    description: 'Delete a Server.',
    devOnly: true,
    options: [
        {
            name: 'server-name',
            description: 'Name of the Server',
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: servers.get()
        },
    ],

    callback: async (client, interaction) => {
        const {options} = interaction;

        const data = {
            name:  options.getString('server-name'),
            tag: options.getString('server-name').replace(/ /g, '_').toLowerCase()
        };
      
        if(await Server.destroy({ where: { tag: data.tag } })) {
            servers.refreshStore();
            interaction.reply(`Server **${data.name}** was deleted!`);
        }
    },
};