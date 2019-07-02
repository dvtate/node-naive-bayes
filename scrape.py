
import newspaper; # https://newspaper.readthedocs.io/en/latest/
import sys;
import json;

'''
# need to run once to download natural langauge toolkit
import nltk
nltk.download('punkt')
''';

# This script accepts an article url as argument
try:
    article = newspaper.Article(sys.argv[1]);
    article.download();
    article.parse();
    nlp = sys.argv[2];
    if nlp:
        article.nlp();

    if not article.text:
        with open("/tmp/badurls.txt", 'a') as f:
            f.write(sys.argv[1]);
        print("null");

    else:
        ret = {
            "text" : article.text,
            "date" : article.publish_date,
        };

        if nlp:
            ret["summary"] = article.summary;
            ret["keywords"] = '\n'.join(article.keywords);

        print(json.dumps(ret));

except: # null on error
    with open("/tmp/badurls.txt", 'a') as f:
        f.write(sys.argv[1]);
    print("null");
