const { EmbedBuilder } = require('discord.js');

const embed = (color, title, description = null, fields = null, imgUrl = null, footerObj = null, timestamp = false) => {
    const e = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setThumbnail('https://dinoinsel.de/assets/img/dinoinsel-logo-v3.png')
    ;

    if(description) {
        e.setDescription(description);
    }
        
    if(footerObj) {
        e.setFooter({ text: footerObj.text, iconURL: footerObj.iconURL });
    }

    if(imgUrl) {
        e.setImage(imgUrl)
    }

    if(timestamp) {
        e.setTimestamp();
    }

    if(fields) {
        for(const field of fields) {
            e.addFields(
                { name: field.name, value: field.value, inline: field.inline}
            );
        }
    }

    return e;
}
const info = (text) => {
    return embed("White", "Info ❕", text);
}

const error = (text) => {
    return embed("Red", "Error ❌", text);
}

const success = (text) => {
    return embed("Green", "Success ✅", text);
}

const warning = (text) => {
    return embed("Orange", "Warning ⚠️", text);
}


module.exports = {
    info,
    success,
    error,
    warning
}