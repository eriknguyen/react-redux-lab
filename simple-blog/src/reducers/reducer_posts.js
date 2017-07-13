import _ from 'lodash';
// no need to import from ../actions/index because it's index.js file
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function (state = {}, action) {
	
	switch(action.type) {
		
	case DELETE_POST:
		return _.omit(state, action.payload);

	case FETCH_POST:
		const post = action.payload.data;
		/* 
		// ES5
		const newState = { ...state };
		newState[post.id] = post;
		return newState; */

		// ES6 syntax: key interpolation
		return { ...state, [post.id]: post };

	case FETCH_POSTS:
		// lodash util function: convert array into object with key of 'id'
		return _.mapKeys(action.payload.data, 'id');
	}

	return state;
}