import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class AuthService {
  login(user) {
    return axios.post(API_URL + '/auth/signIn',{
      id: user.id,
      password: user.password
    }).then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    }).catch(err => {
      
      console.log(err.response.data);
      return err.response.data;
    });
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();