<template>
    <div class="user-modal-container">
        <b-modal ref="user-modal" :title="modelTitle" hide-footer no-close-on-backdrop>
            <div style="border-top: 0.2em solid, border-bottom: 0.2em solid; padding: 1em 0px 1em 0px;">
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
                <div>
                    <table class="user-group-table" style="width: 100%">
                        <thead>
                            <tr>
                                <th scope="cols" style="width: 30%; padding-left: 0.5em;">직급</th>
                                <th scope="cols" style="width: 30%; padding-left: 0.5em;">직책</th>
                                <th scope="cols" style="width: 40%; padding-left: 0.5em;">부서</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <b-dropdown id="inputRank" class="m-md-2" variant="outline-primary" :text="user.rankName">
                                        <b-dropdown-item :id="rank.id" v-for="rank in rankList" v-bind:key="rank.id" @click="fnChangeProperty('rank', rank.id)">
                                            {{rank.name}}
                                        </b-dropdown-item>
                                    </b-dropdown>
                                </td>
                                <td>
                                    <b-dropdown id="inputRank" class="m-md-2" variant="outline-primary" :text="user.positionName">
                                        <b-dropdown-item :id="position.id" v-for="position in positionList" v-bind:key="position.id" @click="fnChangeProperty('position', position.id)">
                                            {{position.name}}
                                        </b-dropdown-item>
                                    </b-dropdown>
                                </td>
                                <td>
                                    <b-dropdown id="inputRank" class="m-md-2" variant="outline-primary" :text="user.teamName">
                                        <b-dropdown-item :id="team.id" v-for="team in teamList" v-bind:key="team.id" @click="fnChangeProperty('team', team.id)">
                                            {{team.name}}
                                        </b-dropdown-item>
                                    </b-dropdown>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
        init: function() {
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
                isRetire : ''
            }
        },
        fnChangeProperty: function(key, value) {
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
                    }
                }
            }
        },
        fnSave: function() {
            let me = this;
            let instance = AxiosService.createAxios(me.$store.getters.getUserInfo.accessToken);

            AdminService.userSearch(instance, qs.stringify(this.searchCondParam))
                .then(function(res) {
                    if (res) {
                        me.totalUserCount = res.count;
                        me.userList = res.data;
                        me.pageInfo.totalPage = Math.ceil(me.totalUserCount / me.pageInfo.viewLimit);
                        me.pageInfo.endPageRange = Math.ceil(me.pageInfo.totalPage / 10);

                        me.pageInfo.startPage = ((me.pageInfo.curPageRange - 1) * 10) + 1;
                        me.pageInfo.endPage = ((me.pageInfo.startPage + 10) - 1) <= me.pageInfo.totalPage ? ((me.pageInfo.startPage + 10) - 1) : me.pageInfo.totalPage;
                        me.pageInfo.pageRepeatNum = (me.pageInfo.endPage + 1) - me.pageInfo.startPage;

                        me.fnPaging();
                    }
                });
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
