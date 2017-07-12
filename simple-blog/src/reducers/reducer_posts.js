import _ from 'lodash';
// no need to import from ../actions/index because it's index.js file
import { FETCH_POSTS } from '../actions';

export default function (state = {}, action) {
	switch(action.type) {
	case FETCH_POSTS:
		// lodash util function: convert array into object with key of 'id'
		return _.mapKeys(action.payload.data, 'id');
	}
	return state;
}