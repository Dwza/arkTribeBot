const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');

const Tribe = require('../../models/tribe');
const Member = require('../../models/member');
const embeds = require('../../utils/getEmbet');
const { servers, tribes } = require('../../utils/store');

module.exports = {
    deleted: false,
    name: 'give-admin',
    description: 'Give Admit to other tribemember.',
    options: [
        {
            name: 'user',
            description: 'The name of the user you want to pass admin.',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        }
    ],

    callback: async (client, interaction) => {

        const {options, user} = interaction;
        const mention = options.get('user');
 
        const current_member = await Member.findOne({
            where: {
                user_id: user.id
            }
        });

        let embed = embeds.error(`You are not in a tribe!`);
        if(current_member) {
            embed = embeds.error(`You can't pass tribe admin rights.\nYou are not the admin.\nOnly tribe admins can give them away.`);
            if(current_member.tribe_admin) {
                const other_member = await Member.findOne({
                    where: {
                        user_id: mention.user.id,
                        tribe_tag: current_member.tribe_tag
                    }
                });
                embed = embeds.error(`${mention.user.username} is not a member of your tribe!`);
                if(other_member) {
                    await current_member.update({tribe_admin: 0});
                    await other_member.update({tribe_admin: 1});
                    embed = embeds.success(`<@${mention.user.id}> is the new admin in your tribe!`);
                }
            }
        }
      
        interaction.reply({embeds: [embed]});
    },
};