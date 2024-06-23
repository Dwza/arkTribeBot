const embeds = require('../../utils/getEmbet');

module.exports = {
    name: 'test',
    description: 'test!',
    // devOnly: Boolean,
    testOnly: true,
    // options: Object[],
    // deleted: Boolean,

    callback: async (client, interaction) => {

        const embed = embeds.info("hello");
        //const embed = embeds.success;
  
        /*
        const lat = 50;
        const lon = 50
        const canvas = createCanvas(1000,1000);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'blue';
        ctx.fillRect(0,0, canvas.width, canvas.height);

        const image = new Image();
        image.src = "../../../media/asa_the_island.jpg";
        image.onload = async function () {

            ctx.drawImage(image, 700, 700, 500, 500);

            ctx.fillStyle="black";
            ctx.font = "100px";
            ctx.fillText('Foobar', 700, 500);

            const buffer = canvas.toBuffer('image/jpeg');
            const attachment = new AttachmentBuilder(buffer, {name: 'image.jpg'});

            const embed = new EmbedBuilder()
            .setColor('Blue')
            .setImage('attachment://image.jpg');
            ;
            
            await interaction.reply({ embeds: [embed], files: [attachment] });
        }

        image.onerror = function() {
            console.log('failed to load image');
        }*/
        interaction.reply({ embeds: [embed] });
        //interaction.reply(`tested`);
    },
};