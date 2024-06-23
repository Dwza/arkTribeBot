const { EmbedBuilder } = require('discord.js');

const embed = (color, title, description = null) => {
    const e = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setThumbnail('https://dinoinsel.de/assets/img/dinoinsel-logo-v3.png')
    ;

    if(description) {
        e.setDescription(description);
    }
        
    return e;
}
const info = (text) => {
    return embed("White", "Info ❕", text)
    ;
}

const error = (text) => {
    return embed("Red", "Error ❌", text)
    ;
}

const success = (text) => {
    return embed("Green", "Success ✅", text)
    ;
}

const warning = (text) => {
    return embed("Orange", "Warning ⚠️", text)
    ;
}

const msg = (title, text) => {
    return embed("Blue", title, text)
    ;
}


module.exports = {
    msg,
    info,
    success,
    error,
    warning
}