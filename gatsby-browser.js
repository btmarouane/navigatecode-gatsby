/* eslint-disable */
/**
 * Trust All Scripts
 *
 * This is a dirty little script for iterating over script tags
 * of your Ghost posts and adding them to the document head.
 *
 * This works for any script that then injects content into the page
 * via ids/classnames etc.
 *
 */
//require("prismjs/themes/prism-okaidia.css");
//require("prismjs/themes/prism-tomorrow.css");
//require("./static/styles/prism-toolbar.min.css");
//require("./static/styles/prism-tomorrow.min.css");
//require("./static/styles/prism-line-numbers.min.css");
/*require("prismjs/themes/prism-solarizedlight.css")
require("prismjs/plugins/command-line/prism-command-line.css")
const { withPrefix } = require("gatsby");


const addScript = url => {
    const script = document.createElement("script")
    script.src = withPrefix(url)
    script.async = true
    document.body.appendChild(script)
}

const addCss = path => {
    const css = document.createElement("style")
    css.type = "text/css"
    css.href = withPrefix(path)
    css.rel = "stylesheet"
    document.head.appendChild(css)
}
*/
/*exports.onInitialClientRender = () => {
    console.log("loaded !!!!!");
    //window.onload = () => {
    addScript("scripts/prism.min.js")
    addScript("scripts/prism-toolbar.min.js")
    addScript("scripts/prism-line-numbers.min.js")
    addScript("scripts/prism-copy-to-clipboard.min.js")
    addScript("scripts/prism-php.min.js")
    addScript("scripts/loader.js")
    //addCss("styles/prism-tomorrow.min.css")
    //addCss("styles/prism-line-numbers.min.css")
    //addCss("styles/prism-toolbar.min.css")
    //}
}
*/
var trustAllScripts = function () {
    var scriptNodes = document.querySelectorAll('.load-external-scripts script');

    for (var i = 0; i < scriptNodes.length; i += 1) {
        var node = scriptNodes[i];
        var s = document.createElement('script');
        s.type = node.type || 'text/javascript';

        if (node.attributes.src) {
            s.src = node.attributes.src.value;
        } else {
            s.innerHTML = node.innerHTML;
        }

        document.getElementsByTagName('head')[0].appendChild(s);
    }
};

exports.onRouteUpdate = function () {
    trustAllScripts();
};
