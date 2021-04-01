<template>
    <div class="admin-menu-container">
        <div class="menu-title" v-for="menu in menuList" v-bind:key="menu.name" @click="adminSubMenuClick(menu.name)">
            <span class="title">{{menu.title}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "AdminMenu",
    data() {
        return {
            menuList : [
                { title : '사용자 관리', name : 'user'},
                { title : '아이템 관리', name : 'item'}
            ],
        }
    },
    methods : {
        adminSubMenuClick: function(menuName) {
            this.$emit('adminSubMenuClick', menuName);
        }
    }
};
</script>
<style>
.admin-menu-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2vh;
}

.admin-menu-container .menu-title{
    font-size: 1.5em; 
    margin-top: 1vh; 
    margin-bottom: 1vh; 
    cursor: pointer;
}

.admin-menu-container .menu-title .title:hover {
    color: white;
}
</style>
