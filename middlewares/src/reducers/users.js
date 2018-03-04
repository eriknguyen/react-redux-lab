import { FETCH_USER } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_USER:
      console.log(action.payload);
      return [...state, ...action.payload.data];
  }

  return state;
}