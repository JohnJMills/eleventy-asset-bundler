# Eleventy Asset Bundler 
The Eleventy Asset Bundler is designed to take the hard work out of managing client site JavaScript and Sass/CSS in your Eleventy project. The bundler searches your output for links to .scss or .js files, bundles those files into usable client side JavaScript and CSS, saves them to your output folder, and updates the HTML content to point to the correct output file. 

There are no shortcodes or lists of assets to manage or folders to keep track of. Just link to a resource using normal HTML markup, and the bundler will generate the file. For example: 

In your eleventy project:
`<link rel="stylesheet" href="/assets/css/main.scss" />`

Outputs to: 
`<link rel="stylesheet" href="/assets/css/main.css" />`

## Under the Hood 
The bundler uses [ESBuild](https://esbuild.github.io/) for JavaScript and [Sass](https://www.npmjs.com/package/sass) for .scss output. 

## Getting Started
... tbd