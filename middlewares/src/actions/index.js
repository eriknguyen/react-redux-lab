import { FETCH_USER } from './types';
import axios from 'axios';

export function fetchUsers() {
  // return the promise here
  const request = axios.get('https://jsonplaceholder.typicode.com/users');

  return {
    type: FETCH_USER,
    payload: request
  }
}