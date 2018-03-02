import jsdom from 'jsdom';
import jquery from 'jquery';


/* Setup testing environment to run like a browser in the command line */

// check out jsdom document
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;

// use virtual $ to tell jQuery for using global.window instead of auto-looking for the default browser window object
// $ now will work as normal jQuery but using the virtual fake 
const $ = jquery(global.window); 



// Build `renderComponent` helper that render given React component


// Build helpers for simulating events


// Setup `chai-jquery` for testing DOM element

