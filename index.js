const request = require('request');

function isAlpha(string) {
    let alphaFlag = 1;
    for (let i = 0; i < string.length; i++) {
        if ((string[i] >= 'A' && string[i] <= 'Z') || (string[i] >= "a" && string[i] <= 'z')) {
            continue;
        } else {
            alphaFlag = 0;
        }
    }

    if (alphaFlag == 0) {
        return false;
    } else {
        return true;
    }
}

function getTagsFromBody(body) {
    let i = 0;
    var tag = "";
    let tags = [];
    while (i < body.length) {
        if (body.substring(i, i + 1) == '<') {
            tag += body.substring(i, i + 1);
            i = i + 1
            while ((body.substring(i, i + 1) != ' ') && body.substring(i, i + 1) != ">") {
                tag = tag + body.substring(i, i + 1);
                i = i + 1;
            }
            tag += body.substring(i, i + 1);
            if (tag.length <= 10) {
                if (tag.substring(1, 2))
                    tags.push(tag);
            }
            tag = "";
        }
        i = i + 1;
    }
    let buffer = new Set(tags);
    buffer = Array.from(buffer);
    tags = [];
    for (i = 0; i < buffer.length; i++) {
        if (buffer.indexOf(buffer[i].substring(0, buffer[i].length - 1)) == -1) {
            if (buffer[i].charAt(buffer[i].length - 1) == " ") {
                let word = ""
                for (let j = 0; j < buffer[i].length; j++) {
                    if (buffer[i][j] == " ") {
                        word += ">";
                    } else {
                        word += buffer[i][j];
                    }
                }
                buffer[i] = word;
            }
            if (isAlpha(buffer[i].substring(1, 2))) {
                tags.push(buffer[i]);
            }
        }
    }
    return tags
}

function getBody(uri) {
    return new Promise ((resolve,reject) => {
        request(uri, (err,res,body) => {
            if (err) reject(err);
            resolve(res);
        });
    });
}

async function returnBody(uri) {
    try {
        var result = '';
        await getBody(uri).then(res => {
            result = res  
        });
        return result;
    } catch (error) {
        return error;
    }
}

async function getTags(uri) {
    let body = ""
    var tags = [];
    body = await returnBody(uri);
    body = body.body;
    tags = getTagsFromBody(body);
    return tags;
}

async function getLinks(uri, startsWith="", filter="/"){
    let body = await returnBody(uri);
    body = body.body;
    let links = [];
    let link = "";
    let i = 0;
    while (i < body.length) {
        if (body.substring(i, i + 8) == "<a href=") {
            let end = body.substring(i + 8, i + 9);
            i = i + 9;
            while (body.substring(i, i + 1) != end) {
                link += body.substring(i, i + 1);
                i += 1;
            } 
            let httpsArray = link.split('https://');
            httpsArray.forEach(element => {
                if (element.indexOf('http://') != -1) {
                    let httpArray = element.split('http://');
                    httpArray.forEach(item => {
                        if ((item.substring(0,startsWith.length) == startsWith)){
                            links.push(item);
                        }
                    });
                } else {
                    if ((element.substring(0,startsWith.length) == startsWith)){
                        links.push(element);
                    }
                }
            });
        } else {
            i += 1;
        }
    }
    return links;
}

async function getTagItem(uri, tag) {
    let body = await returnBody(uri);
    body = body.body;
    let tags = [];
    let tagString = "";
    let i = 0;
    let startTag = '<' + tag;
    let endTag = '</' + tag + '>';
    while (i < body.length) {
        if (body.substring(i, i + startTag.length) == startTag) {
            while (body.substring(i, i + endTag.length) != endTag) {
                tagString += body.substring(i, i + 1);
                i += 1;
            }
            tagString += endTag;
            tags.push(tagString);
        } else {
            i += 1;
        }
    }
    return tags;
}



let uri = 'https://google.com';

getTagItem(uri, 'div').then (res => {
    console.log(res);
    console.log(res.length);
});
getLinks(uri).then(res => {
    console.log(res);
    console.log(res.length);
})

getTags(uri).then(res => {
    var result = res;
    console.log(result);
});
*/

