const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');

const Member = require('../../models/member');

module.exports = {
    deleted: false,
    name: 'leave-tribe',
    description: 'Leave tribe.',
    callback: async (client, interaction) => {
        const { user } = interaction;
        const usr = await Member.findAll({
            where: { user_id: user.id }
        });

        let msg = "You are in no tribe.";
        if(usr.length > 0) {
            for(const u of usr) {
                await u.destroy();
            }
            msg = "You left the tribe!";
        }
        
        interaction.reply(`${msg}`);
    },
};