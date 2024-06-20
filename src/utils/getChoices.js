module.exports = async (Model, name_property, value_property) => {
    const choices = [];
    const models = await Model.findAll();
    
    for( const model of models) {
        if (typeof model[name_property] === "undefined" || typeof model[value_property] === "undefined" ) {
            console.error("name_property or value_property was not set!");
            return [];
        }
        choices.push({name: model[name_property], value: model[value_property]});
    }

    return choices;
}
