<template>
    <div class="login-container">
        <div class="login-box">
            <form role="form" style="display: flex; flex-direction: column; width: 100%; padding: 7em; justify-content: center;">
                <h1 style="align-self: center; color: #a5a5a5;">Login</h1>
                <div class="form-group">
                    <label for="inputId">Id</label>
                    <input type="text" class="form-control" id="inputId" placeholder="Enter id" v-model="user.id" >
                </div>
                <div class="form-group">
                    <label for="inputPassword">Password</label> 
                    <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model="user.password" >
                </div>
                <!-- 
                <div class="form-group"> 
                    <label for="exampleInputFile">File input</label>
                    <input type="file" id="exampleInputFile"> <p class="help-block">Example block-level help text here.</p>
                </div>
                <div class="checkbox"> 
                    <label> <input type="checkbox"> Check me out </label>
                </div>
                -->
                <button class="btn btn-default" style="margin-top: 1em; margin-right: 0px;" @click="loginProcess">Sign in</button>
                <!-- <button class="btn btn-default" style="margin-top: 1em;" @click="registerProcess">Sign up</button> -->
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
        loginProcess: function() {
            let me = this;

            if (me.user.id && me.user.password) {
                AuthService.login(me.user)
                .then(function(res) {
                    if (res.errorCode) {
                        alert(res.errorMessage);
                    } else {
                        me.$store.commit('setUserInfo');
                        me.$router.push({name:'main'});
                    }
                });
            }
        },
        registerProcess: function() {
            let me = this;
            me.$router.push({name:'register'});
        }
    }
};

</script>
<style>
.login-container {
    /* background-color: #1a237e; */
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

.login-container .login-box {
    display: flex;
    width: 30vw;
    height: 30vw;
    justify-content: center;
}

</style>
