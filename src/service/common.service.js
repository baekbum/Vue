import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class CommonService {
  getUserProperties(instance) {
    return instance.get(API_URL + '/common/userProperties', {
      
    }).then(response => {
      
      return response.data;
    }).catch(err => {
      console.log(err);
    });
  }
}

export default new CommonService();