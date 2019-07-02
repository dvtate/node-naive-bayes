const fs = require("fs");

// wisdom is stored here
let data = {
    /*

    "terms,keywords,etc.": {
        classification: {
            undefined: total number of words
            "word" : number of occurances
        }
        option2: {
            ' ': total number of words
            "word" : number of occurances
        }
    }
    */
};


const file = "/tmp/bayesian_classifier_db";

// write to disk/send to web storage
function save(){
    // should probably put this somewhere safe...
    fs.writeFileSync(file, JSON.stringify(data));
}

// read from disk/load web storage
function load(){
    return data = JSON.parse(fs.readFileSync(file));
}

module.exports = {
    data: data,
    save: save,
    load: load,
};


// save every 2 mins
setInterval(save, 2 * 60 * 1000);
