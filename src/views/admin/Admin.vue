<template>
    <div class="admin-container">
        <div class="admin-menu">
            <AdminMenu @adminSubMenuClick="changeMenu"></AdminMenu>
        </div>
        <div class="admin-content">
            <User v-show="componentShowInfo.user"></User>
            <Item v-show="componentShowInfo.item"></Item>
        </div>
    </div>
</template>
<script>
import AdminMenu from './components/AdminMenu';
import User from './components/User';
import Item from './components/Item';

export default {
    components : {
        AdminMenu,
        User,
        Item
    },
    data() {
        return {
            componentShowInfo : {
                user : true,
                item : false
            }
        }
    },
    methods : {
        changeMenu : function(menuName) {
            for (const key in this.componentShowInfo) {
                this.componentShowInfo[key] = false;
            }

            this.componentShowInfo[menuName] = true;
        }
    }
};
</script>
<style>
.admin-container {
    display: flex;
    flex-direction: row;
}

.admin-container .admin-menu {
    width: 12vw;
    border-right: 0.1em solid #707070;
}

.admin-container .admin-content {
    width: 88vw;
}
</style>