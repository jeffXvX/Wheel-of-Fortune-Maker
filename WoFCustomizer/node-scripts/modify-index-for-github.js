const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const wofGithubPageUrl = 'https://jeffxvx.github.io/Wheel-of-Fortune-Maker/';
const docWriteScript = "document.write('<base href=\"' + document.location + '\" />');";
const generatedIndexPath = './dist/app/index.html';
const outputIndexPath = '../docs/index.html';

const ifile = JSDOM.fromFile(generatedIndexPath).then(dom=>{

    /* append the github page url to the styles link element */
    const links = dom.window.document.querySelectorAll('link');
    // hard coded as the last link, changes to index.html or
    // changes by the angular cli in how index.html is generated
    // could necessitate a change here.
    const stylesCssNode = links[2];
    const stylesHref = stylesCssNode.attributes.getNamedItem('href');
    stylesHref.textContent = wofGithubPageUrl + stylesHref.textContent;

    /* append the github page url to the src elements in the body */
    const body = dom.window.document.querySelector('body');
    body.querySelectorAll('script').forEach(scriptNode=>{
        const srcAttr = scriptNode.attributes.getNamedItem('src');
        srcAttr.textContent = wofGithubPageUrl + srcAttr.textContent;
    });

    /* add the document write script to the body */
    const firstSrc = body.querySelector('script');
    const docWriteScriptElement = dom.window.document.createElement('script');
    docWriteScriptElement.textContent = docWriteScript;
    body.insertBefore(docWriteScriptElement, firstSrc);

    return dom.serialize();    
}).then(newHtml=>{
    fs.writeFile(outputIndexPath,newHtml,(err) => {
        if (err) throw err;
        console.log('Index.html written to docs folder.');
      });
});

