/*jshint esversion:6*/

//  From node js. This makes it so we can work with file and directory paths more easily
const path = require('path');
//  This is a webpack plugin that will be used to bundle html. Will auto insert js bundles made by webpack as well. This is useful for when the file name is hashed and may change often
const HtmlWebpackPlugin = require('html-webpack-plugin');

//  Object that webpack will use to load webpack configuratoin settings
module.exports = {
  //  What JS files to accept. Since Babel will output it's own JS and we also need to use the main JS file that other more specific JS files will be imported to.
  //  Only the index.js needs to be listed because it imports the other connected js files itself. If there were JS files that are used but not imported by index.js then they would need listed here as well.
  entry: ['babel-polyfill', './src/js/index.js', ],

  //  Where the bundled JS that webpack produces will be stored
  output: {
    //  The folder to store bundled JS
    //  Path.resolve creates the path that we want our bundled JS put
    //  __dirname is a specific keyword that finds the absolute path to the root of the project
    //  Basically this will combine the absolute path from here to the root of the directory and find out how to get to the dist folder from there.
    path: path.resolve(__dirname, 'dist'),
    //  This is what we are going to name the final that is generated
    //  webpack-dev-server isn't actually saving the newly compiled bundle.js it is actually only injecting it into the HTML this is why we only specify to "dist" above.
    //  However we still have to specify the js folder for when webpack actually does generate and write the js bundle like when we run: webpack --mode development
    filename: 'js/bundle.js'
  },

  //  webpack-dev-server will look for this object to see if there are any settings it should use.
  devServer: {
    //  This tells webpack-dev-server where it should look to serve pages from
    contentBase: './dist'
  },

  // Here is where we store an array of any plugins that we will be using
  plugins: [
    //  Allows html to be bundled when webpack is run and automatically inserts the created bundle.js file into the html doc
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ],

  //  Modules are basically processors that can be used on the code. So far we a
  module: {
    //  The set of rules for when a module should be used and how
    //  Each rule set is stored as it's own object and array so if we want to do something like use SASS later we just have to add a new object to the array outlining the SASS rules we want to use
    rules: [{
      //  If the file is a .js file then use these rules on it
      test: /\.js$/,
      //  If the file is in the node_modules folder we don't want to do these to it
      //  These will not be in the front end so we don't need to process them to be displayed on the front end. They are just tools that will be used here to help us develop and produce
      exclude: /node_modules/,
      //  What to do if a file is .js and not in nod_modules
      use: {
        //  If this is the case we are going to use babel-loader on that file and babel-loader will transpile and polyfill it before webpack bundles 
        loader: 'babel-loader'
      }
    }]
  }
};