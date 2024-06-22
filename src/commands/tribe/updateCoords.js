const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');

const Member = require('../../models/member');
const Tribe = require('../../models/tribe');

module.exports = {
    deleted: false,
    name: 'update-coords',
    description: 'Update tribe coords',
    options: [
        {
            name: 'tribe-lat',
            description: 'LAT of Main-Base 0,00 -99,99',
            required: true,
            type: ApplicationCommandOptionType.Number,
            min_value: 0.00,
            max_value: 99.99
            
        },
        {
            name: 'tribe-lon',
            description: 'LON of Main-Base 0,00 -99,99',
            required: true,
            type: ApplicationCommandOptionType.Number,
            min_value: 0.00,
            max_value: 99.99
        },
    ],

    callback: async (client, interaction) => {

        const {options, user} = interaction;

        const data = {
            lat: options.get('tribe-lat').value.toFixed(2),
            lon: options.get('tribe-lon').value.toFixed(2),
        }
    
        const member = await Member.findOne({
            where: { user_id: user.id }
        });

        if(member) {
            const tribe = await Tribe.findOne({
                where: { tag: member.tribe_tag }
            });
            
            if(tribe) {
                const tLat = tribe.lat.toFixed(2);
                const tLon = tribe.lon.toFixed(2);
                const dLat = data.lat;
                const dLon = data.lon;

                const old_coords = tLat + "/" + tLon;
                const new_coords = dLat + "/" + dLon;

                tribe.lat = dLat;
                tribe.lon = dLon;

                if(tLat != dLat || tLon != dLon) {
                    await tribe.save();
                    interaction.reply(`changed from ${old_coords} to ${new_coords}`);
                }else{
                    interaction.reply(`coords are the same!`);
                }
            }else{
                interaction.reply(`tribe doesnt exist anymore.`);
            }
        }else{
            interaction.reply(`member has not tribe`);
        }
    },
};