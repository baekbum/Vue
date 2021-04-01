import axios from 'axios';

class AxiosService {
  createAxios(token) {
    return axios.create({
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset = utf-8',
            'X-AUTH-TOKEN': token
        }   
    });
  }
}

export default new AxiosService();