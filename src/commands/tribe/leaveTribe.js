const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');

const Member = require('../../models/member');
const Tribe = require('../../models/tribe');
const embeds = require('../../utils/getEmbet');
const { tribes } = require('../../utils/store');

module.exports = {
    deleted: false,
    name: 'leave-tribe',
    description: 'Leave tribe.',
    callback: async (client, interaction) => {
        const { user } = interaction;
        const member = await Member.findOne({
            where: { user_id: user.id }
        });
        let embed = embeds.info('You are in no tribe.');
        
        if(member) {
            const tag = member.tribe_tag;
            await member.destroy();
            embed = embeds.success('You left the tribe!');
            const members = Member.findAll({
                where: {
                    tribe_tag: tag
                }
            });

            if(!members.length) {
                await Tribe.destroy({
                    where: {
                        tag: tag
                    }
                });
                tribes.refreshStore();
            }
        }
        
        interaction.reply({embeds: [embed]});
    },
};