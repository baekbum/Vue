<template>
    <div class="user-modal-container">
        <b-modal ref="user-modal" :title="modelTitle" hide-footer no-close-on-backdrop>
            <div style="border-top: 0.2em solid; padding: 1em 0px 1em 0px;">
                <div class="form-group" v-show="modalType === 'U'">
                    <label for="inputId">사원번호</label>
                    <input type="text" class="form-control" id="inputId" v-model="user.id"  disabled>
                </div>
                <div class="form-group">
                    <label for="inputName">이름</label>
                    <input type="text" class="form-control" id="inputName" placeholder="Enter Name" v-model="user.name">
                </div>
                <div class="form-group">
                    <label for="inputPassword">비밀번호</label>
                    <input type="password" class="form-control" id="inputPassword" placeholder="Enter Password" v-model="user.password">
                </div>
                <!-- <div class="form-group">
                    <label for="inputPasswordCheck">비밀번호 확인</label>
                    <input type="password" class="form-control" id="inputPainputPasswordChecksword" v-model="user.passwordCheck">
                </div> -->
                <div class="form-group">
                    <label for="inputTel">전화번호</label>
                    <input type="text" class="form-control" id="inputTel" placeholder="Enter Tel" v-model="user.tel">
                </div>
                <div class="form-group">
                    <label for="inputAddress">주소</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="Enter Address" v-model="user.address">
                </div>
                <div style="width: 100%; display: flex; border-top: 0.1em solid;">
                    <div style="width: 50%; display: flex; align-items: center;">
                        <div style="width: 35%; text-align: center;"><label>직급</label></div>
                        <div style="width: 65%; border-right: 0.1em solid;">
                            <b-dropdown id="inputRank" class="m-md-2" variant="outline-primary" :text="user.rankName">
                                <b-dropdown-item :id="rank.id" v-for="rank in rankList" v-bind:key="rank.id" @click="fnChangeProperty('rank', rank.id)">
                                    {{rank.name}}
                                </b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>
                    <div style="width: 50%; display: flex; align-items: center;">
                        <div style="width: 35%; text-align: center;"><label>직책</label></div>
                        <div style="width: 65%;">
                            <b-dropdown id="inputRank" class="m-md-2" variant="outline-primary" :text="user.positionName">
                                <b-dropdown-item :id="position.id" v-for="position in positionList" v-bind:key="position.id" @click="fnChangeProperty('position', position.id)">
                                    {{position.name}}
                                </b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>
                </div>
                <div style="width: 100%; display: flex; border-top: 0.1em solid; border-bottom: 0.1em solid;">
                    <div style="width: 50%; display: flex; align-items: center;">
                        <div style="width: 35%; text-align: center;"><label>부서</label></div>
                        <div style="width: 65%; border-right: 0.1em solid;">
                            <b-dropdown id="inputRank" class="m-md-2" variant="outline-primary" :text="user.teamName">
                                <b-dropdown-item :id="team.id" v-for="team in teamList" v-bind:key="team.id" @click="fnChangeProperty('team', team.id)">
                                    {{team.name}}
                                </b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>
                    <div style="width: 50%; display: flex; align-items: center;">
                        <div style="width: 35%; text-align: center;"><label>퇴사여부</label></div>
                        <div style="width: 65%;">
                            <b-dropdown id="inputRank" class="m-md-2" variant="outline-primary" :text="user.isRetire">
                                <b-dropdown-item @click="fnChangeProperty('retire', 'Y')">Y</b-dropdown-item>
                                <b-dropdown-item @click="fnChangeProperty('retire', 'N')">N</b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>                    
                </div>
                <!-- <div class="form-group">
                    <label for="inputRank">퇴사 여부</label>
                    <b-dropdown id="inputRank" class="m-md-2" variant="outline-primary">
                        <b-dropdown-item id='all'>전체</b-dropdown-item>
                    </b-dropdown>
                </div> -->
            </div>
            <div style="display: flex;">
                <b-button class="mt-3" variant="outline-primary" block @click="fnSave">저장</b-button>
                <b-button class="mt-3" variant="outline-primary" block @click="hideModal">닫기</b-button>
            </div>            
        </b-modal>
    </div>
</template>
<script>
import AxiosService from '../../../service/axios.service';
import AdminService from '../../../service/admin.service';

export default {
    name: "UserModal",
    props: ['modelTitle','modalType'],
    data() {
        return {
            user : {},
            rankList : [],
            positionList : [],
            teamList : [],
            propertyMap : new Map()
        }
    },
    methods: {
        init: function(type, data) {
            if ('C' === type) {
                this.user = {
                    id : 0,
                    name : '',
                    password : '',
                    passwordCheck : '',
                    tel : '',
                    address : '',
                    rankId : '0',
                    rankName : '사장',
                    positionId : '0',
                    positionName : '사장',
                    teamId : '100',
                    teamName : '본사',
                    isRetire : 'N'
                }
            } else {
                this.user = {
                    id : data.id,
                    name : data.name,
                    password : '',
                    passwordCheck : '',
                    tel : data.tel,
                    address : data.address,
                    rankId : data.rankId,
                    rankName : data.rankName,
                    positionId : data.positionId,
                    positionName : data.positionName,
                    teamId : data.teamId,
                    teamName : data.teamName,
                    isRetire : data.isRetire
                }
            }
        },
        fnChangeProperty: function(key, value) {
            if ('retire' === key) {
                this.user.isRetire = value;
            } else{
                let obj = this.propertyMap.get(key);
                for (let i = 0; i < obj.length; i++) {
                    if (obj[i].id === value) {
                        if ('rank' === key) {
                            this.user.rankId = obj[i].id;
                            this.user.rankName = obj[i].name;
                        } else if ('position' === key) {
                            this.user.positionId = obj[i].id;
                            this.user.positionName = obj[i].name;
                        } else if ('team' === key) {
                            this.user.teamId = obj[i].id;
                            this.user.teamName = obj[i].name;
                        } else {}
                    }
                }
            }

            
        },
        fnSave: function() {
            let me = this;
            let instance = AxiosService.createAxios(me.$store.getters.getUserInfo.accessToken);

            if ('C' === me.modalType) {
                AdminService.userRegister(instance, me.user)
                .then(function(res) {
                        if (res) {
                            if (res.errorCode) {
                            alert(res.errorMessage);
                        } else {
                            alert('저장되었습니다.');
                            me.hideModal();
                            me.$parent.fnSearch();
                        }
                    }
                });
            } else {
                AdminService.userUpdate(instance, me.user)
                .then(function(res) {
                        if (res) {
                            if (res.errorCode) {
                            alert(res.errorMessage);
                        } else {
                            alert('수정되었습니다.');
                            me.hideModal();
                            me.$parent.fnSearch();
                        }
                    }
                });
            }            
        },
        hideModal: function() {
            this.$refs['user-modal'].hide();
        }
    },
    mounted() {
        this.rankList = Object.assign([],this.$store.getters.getRankInfo);
        this.positionList = Object.assign([],this.$store.getters.getPositionInfo);
        this.teamList = Object.assign([],this.$store.getters.getTeamInfo);
        this.propertyMap.set('rank', this.rankList);
        this.propertyMap.set('position', this.positionList);
        this.propertyMap.set('team', this.teamList);
    }
};
</script>
<style>
</style>
