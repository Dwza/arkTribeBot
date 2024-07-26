const { createCanvas, loadImage } = require('canvas');

module.exports.cImg = async (lat, lon, map, interaction) => {

    const canvas = createCanvas(1000,1000);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    const image = new Image();
    image.src = "../media/asa_the_island.jpg";
    image.onload = async function () {

        ctx.drawImage(image, 700, 700, 500, 500);

        ctx.fillStyle="black";
        ctx.font = "100px";
        ctx.fillText('Foobar', 700, 500);

        const buffer = canvas.toBuffer('image/jpeg');
        const attachment = new AttachmentBuilder(buffer, {name: 'image.jpg'});

        /*
        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setImage('attachment://image.jpg');
        ;
        
        await interaction.reply({ embeds: [embed], files: [attachment] });
        */
        
    }
        //*/
    console.log('done');
    
} 