<template>
    <div class="main-container">
        <Header :userInfo='userInfo' style="height: 10vh;"></Header>
        <router-view style="height: 90vh;" />
    </div>    
</template>
<script>

import Header from './Header.vue'

export default {
    components: {
        Header
    },
    data() {
        return {
            userInfo : {}
        }
    },
    created() {
        if (this.$store.getters.getUserInfo.userInfo) {
            this.userInfo = this.$store.getters.getUserInfo.userInfo;
        }        
    }
}
</script>
<style>
.main-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.modal-backdrop {
  display: none;
}

.modal-dialog .modal-content {
    background: #e8eaf6;
}
</style>