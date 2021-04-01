export default class User {
    /*
    constructor(id, password) {
      this.id = id;
      this.password = password;
    }
    */
    constructor(id, password, name, tel, city, street, zipcode) {
      this.id = id;
      this.password = password;
      this.name = name;
      this.tel = tel;
      this.city = city;
      this.street = street;
      this.zipcode = zipcode;
    }
}