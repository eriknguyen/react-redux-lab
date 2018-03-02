import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';


/** 
 * 1. Setup testing environment to run like a browser in the command line 
 */

// check out jsdom document
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;

// use virtual $ to tell jQuery for using global.window instead of auto-looking for the default browser window object
// $ now will work as normal jQuery but using the virtual fake 
const $ = jquery(global.window); 


/**
 * 2. Build `renderComponent` helper that render given React component
 */
function renderComponent(ComponentClass, props, state) {
  // create an instance of ComponentClass and render it into document with React test-utils
  const componentInstance = TestUtils.renderIntoDocument(
    // wrap the component with react-redux Provider
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );
  // return an actual DOM reference to that instancce wrapped by jQuery so chai-jquery can be used to test
  return $(ReactDOM.findDOMNode(componentInstance));
}


/**
 * 3. Build helpers for simulating events
 */
// add a new function to jQuery
$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  // instead of TestUtils.Simulate.change(), need to refer to the event method by string reference
  // this is the jQuery reference of DOM element, eg. $('div') and can be an array => use this[0] to make sure it's the first one
  TestUtils.Simulate[eventName](this[0]);
}


/**
 * 4. Setup `chai-jquery` for testing DOM element
 * Refer to chai-jquery documentation
 */
chaiJquery(chai, chai.util, $);


export { renderComponent, expect };