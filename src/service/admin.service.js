import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class AdminService {
  userSearch(instance, qs) {
    return instance.get(API_URL + '/member/all/?' + qs , {
      
    }).then(response => {
      
      return response.data;
    }).catch(err => {

      console.log(err.response.data);
      return err.response.data;
    });
  }

  userRegister(instance, user) {
    return instance.post(API_URL + '/member', {
      name : user.name,
      password : user.password,      
      tel : user.tel,
      address : user.address,
      rankId : user.rankId,
      positionId : user.positionId,
      teamId : user.teamId
    })
    .then(response => {
      return response.data;
    }).catch(err => {
      console.log(err.response.data);
      return err.response.data;
    });
  }

  userUpdate(instance, user) {
    return instance.put(API_URL + '/member/' + user.id, {
      name : user.name,
      password : user.password,      
      tel : user.tel,
      address : user.address,
      rankId : user.rankId,
      positionId : user.positionId,
      teamId : user.teamId,
      isRetire : user.isRetire
    })
    .then(response => {
      return response.data;
    }).catch(err => {
      console.log(err.response.data);
      return err.response.data;
    });
  }
}

export default new AdminService();