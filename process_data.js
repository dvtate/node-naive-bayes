
const db = require("./db");
const preProcess = require("./pre_process");

// calls python script
const scrape = async (url, nlp) =>
    new Promise((resolve, reject) => {

        if (cache[url] && (!nlp || cache[url].summary))
            return resolve(cache[url]);

        // in future remove -W ignore, my machine is just weird bad
        require("child_process").exec(
            `python -W ignore ./data/scrape.py ${url} ${nlp ? 1 : 0}`,
            (error, stdout, stderr) => {
                if (error)
                    reject(error, stderr);
                else {
                    //console.log(stdout)
                    const ret = JSON.parse(stdout);
                    cache[url] = ret;
                    resolve(ret);
                }
                if (stderr)
                    console.error(stderr);
        });
    });


//
async function addData(terms, url, classification){
    let text = await scrape(url));
    text = text["text"];
    text = preProcess(text);


}

//
async function checkData(terms, url){
    // get text
    let text = await scrape(url));
    text = text["text"];
    text = preProcess(text);

    function pClass(text, classification) {
        let ret = 1;
        for (w in classification)
            if (w != ' ')
                if (text.includes(w))
                    ret *= classification[w] / classification[' '];
                else
                    ret *= 1 - classification[w] / classification[' '];

        return ret;
    }

    let ret = {};
    for (c in db.data[terms])
        ret[c] = pClass(text, c);

}


async function addDataCheck(terms, url, classification) {

}
