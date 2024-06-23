const fs = require('fs');
const path = require('path');
const getAllFiles = require('./getAllFiles');

class Store {
    file = null;
    storesPath = null;
    storeName = null;
    store = [];
    ext = null;
    constructor(storeName) {
        if(typeof storeName !== "undefined") {
            this.load(storeName);
        }
    }

    load (storeName)  {
        this.storeName = storeName;
        this.storesPath = path.join(__dirname, '../stores');
        this.ext = "json";
        this.file = path.join(this.storesPath, this.storeName + "." + this.ext);
        this.store = JSON.parse(fs.readFileSync(this.file, "utf8") || '[]');
        return this
    }
    add (data) {
        this.store.push(data);
        fs.writeFileSync(this.file, JSON.stringify(this.store, null, 4));
    }
    write (data) {
        this.store = data;
        fs.writeFileSync(this.file, JSON.stringify(this.store, null, 4));
    }
    writeFromModel (entries, nameKey = "name", valueKey = "tag") {

        const data = [];
        for(const entry of entries) {
            data.push({name: entry[nameKey], value: entry[valueKey]});
        }
       
        this.store = data;
        fs.writeFileSync(this.file, JSON.stringify(this.store, null, 4));

    }
    get (value = null) {
        if(value) {
            return this.store.find(s => s.value === value);
        }
        return this.store;
    }
}

// Autoload stores
const storeExport = {};
const storeFiles = getAllFiles(path.join(__dirname, '..', 'stores'));
for (const storeFile of storeFiles) {
    let store = storeFile.replace(/^.*[\\/]/, '').replace(/.json/, '');
    storeExport[store] = new Store(store);
}

//export autloaded stores
module.exports = storeExport;
