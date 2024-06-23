const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');

const Member = require('../../models/member');
const Tribe = require('../../models/tribe');
const embeds = require('../../utils/getEmbet');
const { servers } = require('../../utils/store');

module.exports = {
    deleted: false,
    name: 'update-tribe-map',
    description: 'Update tribe map',
    options: [
        {
            name: 'server-name',
            description: 'The name of the Server where your Tribe has its Main-Base',
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: servers.get()
        }
    ],

    callback: async (client, interaction) => {

        const {options, user} = interaction;

        const data = {
            server_tag: options.getString('server-name'),
        }
    
        const member = await Member.findOne({
            where: { user_id: user.id }
        });

        let embed = embeds.error(`Something went wrong!`);
        if(member) {
            const tribe = await Tribe.findOne({
                where: { tag: member.tribe_tag }
            });
            
            if(tribe) {
                const old_server = tribe.server_tag;
                const new_server = data.server_tag;
                tribe.server_tag = data.server_tag;

                if (old_server !== new_server) {
                    await tribe.save();
                    embed = embeds.success(`## Changed Server 📌`);
                    embed.addFields(
                        {name: 'Old Server', value: `${servers.get(old_server).name}`, inline: true},
                        {name: 'New Server', value: `${servers.get(new_server).name}`, inline: true}
                    );
                } else {
                    embed = embeds.info(`Servers are the same!`);
                }
            } else {
                embed = embeds.error(`Tribe does'nt exist anymore! `);
            }
        } else {
            embed = embeds.warning(`You are in no tribe!`);
        }

        interaction.reply({embeds: [embed]});
    },
};