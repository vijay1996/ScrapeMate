# ScrapeMate
###### Easy web scraper.
<br/><br/>
## Installation
*ScrapeMate* is available as open source node package to all developers to use in projects.
It can be installed by running the following node command: <br/>
```npm install scrapemate --save```
<br/><br/>
## Description
*ScrapeMate* can be used to scrape different HTML tags and links from any webpage by passing on URL of the target and other optional parameters. It primarily consists of the following functions - <br/><br/>
**getTags(url)** - To get a list of all the tags used in the HTML code of a target webpage located in the passed on URL.<br/><br/>
**getLinks(url)** - Used to obtain all the links placed in the target webpage located in the passed on URL.<br/><br/>
**getTagItem(url,tag)** - Used to obtain all the tags passed on to the function present in the target webpage located in the passed on URL.
<br/><br/>
## Usage

Import scrapemate to your javascript file after installing ScrapeMate
```javascript
let scrapemate = require('scrapemate');
```
Example for *getTags(url)*
```javascript
let uri = 'https://google.com';
scrapemate.getTags(uri).then(res => {
    var result = res;
    console.log(result);
});
```
Example for *getLinks(url)*
```javascript
let uri = 'https://google.com';
scrapemate.getLinks(uri).then(res => {
    console.log(res);
    console.log(res.length);
});
``` 

Example for *getTagItem(uri,tag)*
```javascript
let uri = 'https://google.com';
let tag = 'div';
scrapemate.getTagItem(uri, tag).then (res => {
    console.log(res);
    console.log(res.length);
});
```
