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
    name: 'create-tribe',
    description: 'Create a tribe.',
    options: [
        {
            name: 'tribe-name',
            description: 'The name of the tribe you want to create.',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'server-name',
            description: 'The name of the Server where your Tribe has its Main-Base',
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: servers.get()
        },
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
            name: options.getString('tribe-name'),
            tag: options.getString('tribe-name').replace(/ /g, '_').toLowerCase(),
            srv_tag: options.getString('server-name'),
            lat: options.get('tribe-lat').value.toFixed(2),
            lon: options.get('tribe-lon').value.toFixed(2),
        }

        const member = await Member.findOne({
            where: {
                user_id: user.id
            }
        });

        let embed = embeds.error(`Tribe **${data.name}**, could not be created!\nYou are in a tribe.\nLeave tribe first!`);
        if(!member) {
            const [tribe, created] = await Tribe.findOrCreate({
                where: { tag: data.tag }, 
                defaults: { name: data.name, lat: data.lat, lon: data.lon, server_tag: data.srv_tag }
            });

            embed = embeds.success(`Tribe **${tribe.name}**, was created!`);
            if(!created) {
                
                embed = embeds.info(`Tribe **${tribe.name}**, already existed!`);
            } else {
                await Member.create({user_id: user.id, tribe_tag: data.tag, tribe_admin: 1});
                tribes.refreshStore();
            }
        }
      
        interaction.reply({embeds: [embed]});
    },
};