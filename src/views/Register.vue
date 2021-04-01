<template>
    <div class="register-container">
        <div class="register-box">
            <form role="form" style="display: flex; flex-direction: column; width: 100%; padding: 7em; background-color: white; border-radius: 5em; justify-content: center;">
                <h1 style="align-self: center;">회원가입</h1>
                <div class="form-group">
                    <label for="inputId">아이디</label>
                    <input type="text" class="form-control" id="inputId" v-model="user.id" >
                </div>
                <div class="form-group">
                    <label for="inputPassword">비밀번호</label> 
                    <input type="password" class="form-control" id="inputPassword" v-model="user.password" >
                </div>
                <!-- <div class="form-group">
                    <label for="inputPassword">비밀번호 확인</label> 
                    <input type="password" class="form-control" id="inputPasswordCheck">
                </div> -->
                <div class="form-group">
                    <label for="inputName">이름</label>
                    <input type="text" class="form-control" id="inputName" v-model="user.name" >
                </div>
                <div class="form-group">
                    <label for="inputTel">전화번호</label>
                    <input type="text" class="form-control" id="inputTel" placeholder="000-0000-0000" v-model="user.tel" >
                </div>
                <div class="form-group" style="display: flex;">
                    <div class="address">
                        <label for="inputCity">시</label>
                        <input type="text" class="form-control" id="inputCity" v-model="user.city" >
                    </div>
                    <div class="address">
                        <label for="inputStreet">구</label>
                        <input type="text" class="form-control" id="inputStreet" v-model="user.street">
                    </div>
                    <div class="address">
                        <label for="inputZipcode">우편번호</label>
                        <input type="text" class="form-control" id="inputZipcode" v-model="user.zipcode">
                    </div>
                </div>
                <button class="btn btn-default" style="margin-top: 1em; margin-right: 0px;" @click="registerProcess">Sign up</button>
            </form>
        </div>
    </div>
</template>
<script>
import User from '../models/user'
import AuthService from '../service/auth.service';

export default {
    data() {
        return {
            user : new User('', '', '', '', '', '', ''),
            loading : false,
            message : ''
        }
    },
    methods: {
        registerProcess: function() {
            let me = this;

            if (me.user.id && me.user.password) {
                AuthService.register(me.user)
                .then(function(res) {
                    if (res) {
                        me.$router.push({name:'main'});
                    } else {
                        alert('이미 등록된 ID입니다.');
                    }
                });
            }
        }
    }
};

</script>
<style>
.register-container {
    /*background-color: #1a237e;*/
    height: 100vh;    
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    /*flex-flow: row nowrap; direction과 wrap을 합쳐놓은 것 */
    /* justify-content: space-between; /*내부 아이템을 어떻게 배치할 것인지 결정 */
    /* align-items: center; /* 아이템들의 수직 위치 결정 */
}

.register-container .register-box {
    display: flex;
    width: 30vw;
    justify-content: center;
}

.form-group .address {

}

</style>
