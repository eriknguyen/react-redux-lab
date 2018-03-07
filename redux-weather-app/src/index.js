import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromiseMiddleware from 'redux-promise';

import App from './components/app';
import reducers from './reducers';

// apply ReduxPromiseMiddleware middleware to our redix
const createStoreWithMiddleware = applyMiddleware(ReduxPromiseMiddleware)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<App />
	</Provider>
	, document.querySelector('.container'));
