const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');

const Tribe = require('../../models/tribe');
const Member = require('../../models/member');
const { tribes } = require('../../utils/store');

module.exports = {
    deleted: false,
    name: 'join-tribe',
    description: 'Join a tribe.',
    options: [
        {
            name: 'tribe-name',
            description: 'The name of the tribe you want to join.',
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: tribes.get()
        },
    ],

    callback: async (client, interaction) => {

        const {options, user} = interaction;
       
        const data = {
            tag: options.getString('tribe-name'),
        }
    
        //create or select member
        const [member, created] = await Member.findOrCreate({
            where: { user_id: user.id }, 
            defaults: { tribe_tag: data.tag }
        });

        let msg = "Tribe joined!";
        if(!created) {
            msg = "You are already assigned to this tribe!";
            if(member.tribe_tag !== data.tag) {
                msg = "You are assignet to another Tribe. Leave tribe first!";
            }
        }

        interaction.reply(`${msg}`);
        
    },
};