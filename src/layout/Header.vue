<template>
    <div class="header">
        <div style="width: 12vw;"></div>
        <div class="menu-box">
            <div class="menu" v-for="(menu) in menuList" v-bind:key="menu.pathName">
                <router-link :to="{name : menu.pathName}">
                    <!-- <font-awesome-icon :icon="menu.iconName"/> -->
                    <span class="title">{{menu.title}}</span>
                </router-link>
            </div>
        </div>
        <div class="user-box">
            <font-awesome-icon icon="user" style="font-size: 1.5em; margin-right: 0.3em; cursor: pointer;"/>
            <span style="margin-right: 2em;">{{userInfo.name}}님</span>
            <font-awesome-icon icon="sign-out-alt" style="font-size: 1.5em; cursor: pointer;" @click="logoutProcess"/>
        </div>
        <!--  -->
    </div>
</template>
<script>
import Vue from 'vue';
import AuthService from '../service/auth.service';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAddressCard, faUser, faHome, faUserCog, faSignOutAlt, faShoppingBasket, faList} from '@fortawesome/free-solid-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAddressCard, faUser, faHome, faUserCog, faSignOutAlt, faShoppingBasket, faList)

Vue.component('font-awesome-icon', FontAwesomeIcon)
export default {
    name: "Header",
    props: ['userInfo'],
    data() {
        return {
            menuList : [
                { pathName : 'dashboard', iconName : 'home', title : '홈', selected: false},
                { pathName : 'admin', iconName : 'user-cog', title : '관리자', selected: false}
            ]
        }
    },
    methods : {
        logoutProcess: function() {
            let me = this;

            AuthService.logout();
            me.$router.push({name:'login'});
        },
    }
}
</script>
<style>
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;    
    border-bottom: 0.3em solid #2f2f2f;
}

.menu-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 45vw;
}

.menu {
    font-size: 2em;
    cursor: pointer;
}

.menu .title {
    color: #a5a5a5;    
}

.menu .title:hover {
    color: white;
}

.user-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 1vw;
    width: 43vw;
    justify-content: flex-end;
}
</style>