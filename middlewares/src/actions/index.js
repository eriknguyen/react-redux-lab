import { FETCH_USER } from './types';

export function fetchUsers() {
  return {
    type: FETCH_USER,
    payload: [
      { name: 'User 1' },
      { name: 'User 2' },
      { name: 'User 3' }
    ]
  }
}