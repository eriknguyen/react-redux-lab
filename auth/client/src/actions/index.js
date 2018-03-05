import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function(dispatch) {
    // submit email/password to server
    axios.post(`${ROOT_URL}/signin`, { email, password });
    
    // if request is good
    //   - update authenticated state
    //   - save jwt token
    //   - redirect to route


    /**
     * If request is bad
     *   -> show error to user
     */
  }
}