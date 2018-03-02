import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';


/* Setup testing environment to run like a browser in the command line */

// check out jsdom document
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;

// use virtual $ to tell jQuery for using global.window instead of auto-looking for the default browser window object
// $ now will work as normal jQuery but using the virtual fake 
const $ = jquery(global.window); 


/**
 * Build `renderComponent` helper that render given React component
 */
function renderComponent(ComponentClass) {
  // create an instance of ComponentClass and render it into document with React test-utils
  const componentInstance = TestUtils.renderIntoDocument(
    // wrap the component with react-redux Provider
    <Provider store={createStore(reducers)}>
      <ComponentClass />
    </Provider>
  );
  // return an actual DOM reference to that instancce wrapped by jQuery so chai-jquery can be used to test
  return $(ReactDOM.findDOMNode(componentInstance));
}


// Build helpers for simulating events


// Setup `chai-jquery` for testing DOM element


export { renderComponent, expect };