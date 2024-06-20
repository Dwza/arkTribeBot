const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');
const Server = require('../../models/server');
const { servers, maps } = require('../../utils/store');


module.exports = {
    deleted: false,
    name: 'create-server',
    description: 'Create a Server',
    devOnly: true,
    options: [
        {
            name: 'server-name',
            description: 'The name of the Server',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'map-name',
            description: 'The name of the Server',
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: maps.get()
        },
    ],

    callback: async (client, interaction) => {
        const {options} = interaction;
        const server_name = options.getString('server-name');
        const map_tag = options.getString('map-name');
        const server_tag = server_name.replace(/ /g, '_').toLowerCase();
        
       const [server, created] = await Server.findOrCreate({where: { tag: server_tag }, defaults: { name: server_name, map_tag: map_tag}});

        if(!created) {
            interaction.reply(`Server "${server_name}", already existed!`);
        }else {
            const modelData = await Server.findAll();;
            servers.writeFromModel(modelData);
            interaction.reply(`Server "${server_name}", was created!`);
        }
    },
};