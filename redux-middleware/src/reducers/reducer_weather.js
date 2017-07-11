import { FETCH_WEATHER } from '../actions/index';

export default function(state=[], action) {
	switch (action.type) {
	case FETCH_WEATHER:
		// don't use state.push(), don't mutate app state
		// return state.concat[action.payload.data];
		// using equivalent ES6 syntax
		return [ action.payload.data, ...state ];
	}
	return state;
}