import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class AdminService {
  userSearch(instance, qs) {
    return instance.get(API_URL + '/member/all/?' + qs , {
      
    }).then(response => {
      
      return response.data;
    }).catch(err => {
      console.log(err);
    });
  }

  userRegister(instance, user) {
    return instance.post(API_URL + '/member', {
      id : user.id,
      password : user.password,
      name : user.name,
      tel : user.tel,
      city : user.city,
      street : user.street,
      zipcode : user.zipcode
    },{
      HEADER
    })
    .then(response => {
      return response.data;
    }).catch(e => {
      console.error(e);
    });
  }
}

export default new AdminService();