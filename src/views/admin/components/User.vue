<template>
    <div class="user-container">
        <div class="user-search-box">
            <div style="display: flex; align-items: center;">
                <div>
                    <b-dropdown id="user-search" :text="searchCondKey" class="m-md-2" variant="outline-primary">
                        <b-dropdown-item id='all' @click="fnSearchCondition('전체')">전체</b-dropdown-item>
                        <b-dropdown-item id='id' @click="fnSearchCondition('아이디')">아이디</b-dropdown-item>
                        <b-dropdown-item id='name' @click="fnSearchCondition('이름')">이름</b-dropdown-item>
                        <b-dropdown-item id='rank' @click="fnSearchCondition('직급')">직급</b-dropdown-item>
                        <b-dropdown-item id='position' @click="fnSearchCondition('직책')">직책</b-dropdown-item>
                        <b-dropdown-item id='team' @click="fnSearchCondition('팀')">팀</b-dropdown-item>
                        <b-dropdown-item id='retire' @click="fnSearchCondition('퇴사여부')">퇴사여부</b-dropdown-item>
                    </b-dropdown>
                </div>
                <div>
                    <b-input-group size="md">
                        <b-form-input style="background-color: #1b1b1b; border-color: #5e72e4;" v-model="searchCondString"></b-form-input>
                        <b-input-group-append>
                            <b-button size="sm" text="search" variant="outline-primary" @click="fnSearch">검색</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </div>
            </div>
            <div>
                <b-button variant="outline-primary" @click="fnOpenUserModal('C')">등록</b-button>
            </div>            
        </div>
        <div class="user-list-box">
            <table class="user-table">
                <thead>
                    <tr style="height: 3.5vh;">
                        <th scope="cols" style="width: 10%">아이디</th>
                        <th scope="cols" style="width: 10%">이름</th>
                        <th scope="cols" style="width: 10%">전화번호</th>
                        <th scope="cols" style="width: 10%">주소</th>
                        <th scope="cols" style="width: 10%">직급</th>
                        <th scope="cols" style="width: 10%">직책</th>
                        <th scope="cols" style="width: 10%">부서</th>
                        <th scope="cols" style="width: 10%">생성일</th>
                        <th scope="cols" style="width: 10%">수정일</th>
                        <th scope="cols" style="width: 10%">퇴사여부</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in viewList" v-bind:key="index" style="height: 6.5vh;">
                        <td>{{user.id}}</td>
                        <td>{{user.name}}</td>
                        <td>{{user.tel}}</td>
                        <td>{{user.address}}</td>
                        <td>{{user.rankName}}</td>
                        <td>{{user.positionName}}</td>
                        <td>{{user.teamName}}</td>
                        <td>{{user.createDate}}</td>
                        <td>{{user.updateDate}}</td>
                        <td>{{user.isRetire}}</td>
                    </tr>
                </tbody>
            </table>
        </div>      
        <div class="paging-box" ref="paging-box">
            <b-button variant="outline-primary" v-show="pageInfo.curPageRange !== 1" @click="fnPageCursor('first')">&lt;&lt;</b-button>
            <b-button variant="outline-primary" v-show="pageInfo.curPageRange !== 1" @click="fnPageCursor('before')">&lt;</b-button>
            <b-button :variant="fnColorInit(i)" v-for="i in pageInfo.pageRepeatNum" v-bind:key="i" :value="(pageInfo.startPage - 1) + i" @click="fnPageClick($event)">
                {{(pageInfo.startPage - 1) + i}}
            </b-button>
            <b-button variant="outline-primary" v-show="pageInfo.curPageRange !== pageInfo.endPageRange" @click="fnPageCursor('next')">&gt;</b-button>
            <b-button variant="outline-primary" v-show="pageInfo.curPageRange !== pageInfo.endPageRange" @click="fnPageCursor('last')">&gt;&gt;</b-button>
        </div>
        <UserModal ref="modal" :modalType="userModalType" :modelTitle="userModalTitle"></UserModal>
    </div>    
</template>
<script>
import axios from 'axios';
import qs from 'qs';
import AdminService from '../../../service/admin.service';
import CommonService from '../../../service/common.service';
import AxiosService from '../../../service/axios.service';
import UserModal from './UserModal';

export default {
    components: {
        UserModal
    },
    data() {
        return {
            searchCondKey : '전체',
            searchCondVal : 'ALL',
            searchCondString : '',
            searchCondition : {
              '전체' : 'ALL',
              '아이디' : 'ID',
              '이름' : 'NAME',
              '직급' : 'RANK',
              '직책' : 'POSITION',
              '팀' : 'TEAM',
              '퇴사여부' : 'Retire'
            },
            searchCondParam :{
                searchCond : '',
                searchString : '',
                offset : 0, // 현재 페이지
                limit : 0 // 몇개씩 끊어서 가져올지
            },
            pageInfo : {
                viewLimit : 10,
                rowLimit : 100, // 가져올 맥스 데이터 수
                curPage : 1, // 현재 페이지
                totalPage : 1, // 총 페이지 수
                startPage : 1, // 시작 페이지
                endPage : 1, // 끝 페이지
                curPageRange : 1, // 현재 페이지 영역 넘버
                endPageRange : 1, // 마지막 페이지 영역 넘버
                pageRepeatNum : 0 // 반복 횟수
            },
            userList : [],
            viewList : [],
            totalUserCount : 0,
            lastElement : null,
            userModalTitle : '',
            userModalType : ''
        }
    },
    methods: {
        fnSearchCondition: function(key) {
            this.searchCondKey = key;
            this.searchCondVal = this.searchCondition[key];

            if (key === '전체') {
                this.searchCondString = '';
            }
        },
        fnSearch: function() {
            let me = this;
            let instance = AxiosService.createAxios(me.$store.getters.getUserInfo.accessToken);

            this.searchCondParam.searchCond = this.searchCondVal;
            this.searchCondParam.searchString = this.searchCondString;
            this.searchCondParam.offset = (this.pageInfo.curPageRange - 1) * 100;
            this.searchCondParam.limit = this.pageInfo.rowLimit;            

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
        fnPaging: function() {
            this.viewList = this.userList.slice((this.pageInfo.curPage - 1) * 10, (this.pageInfo.curPage * 10));
        },
        fnPageClick: function(evt) {
            let target = evt.target;
            
            this.pageInfo.curPage = parseInt(target.value);
            
            this.fnChangeBtnColor(target);
            this.fnPaging();
        },
        fnPageCursor: function(param) {
            if ('first' === param) {
                this.pageInfo.curPageRange = 1;
            } else if ('last' === param) {
                this.pageInfo.curPageRange = this.pageInfo.endPageRange;
            } else if ('before' === param) {
                this.pageInfo.curPageRange--;
            } else if ('next' === param) {
                this.pageInfo.curPageRange++;
            }

            this.fnSearch();
        },
        fnChangeBtnColor: function(target) {
            if (this.lastElement) {
                this.lastElement.setAttribute('class', 'btn btn-outline-primary');
            } else {
                this.$refs["paging-box"].children[2].setAttribute('class', 'btn btn-outline-primary');
            }

            target.setAttribute('class', 'btn btn-outline-warning');
            this.lastElement = target;
        },
        fnColorInit: function(index) {
            if (1 === index) {
                return 'outline-warning';
            } else {
                return 'outline-primary';
            }            
        },
        fnOpenUserModal: function(type) {
            if ('C' === type) {
                this.userModalTitle = '사용자 등록';
                this.$refs["modal"].init();
            } else {
                this.userModalTitle = '사용자 수정';
            }

            this.userModalType = type;
            
            this.$refs["modal"].$refs["user-modal"].show();
        }
    },
    created() {
        let me = this;
        let instance = AxiosService.createAxios(me.$store.getters.getUserInfo.accessToken);

        CommonService.getUserProperties(instance)
                .then(function(res) {
                    if (res) {
                        me.$store.commit('setRankInfo', res.rank);
                        me.$store.commit('setPositionInfo', res.position);
                        me.$store.commit('setTeamInfo', res.team);
                    }
                });
    }
};
</script>
<style>
.user-container {
    display: flex;
    flex-direction: column;
    padding: 1em;
    height: 100%;
    width: 100%;
}

.user-container .user-search-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 8%;
    border-bottom: 0.1em solid #2f2f2f;
}

.user-container .user-list-box {
    height: 87%;
    padding-top: 1.5vh;
}

.user-container .paging-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 5%;
}

.user-container .paging-box > div > ul li {
    list-style-type: none;
    float: left;
    margin-left: 1em;
}

table.user-table {
  border-collapse: collapse;
  text-align: center;
  line-height: 1.5;
  width: 100%;
}

table.user-table thead th {
  /* padding: 10px; */
  font-weight: bold;
  color: #5e72e4;
  border-bottom: 3px solid #5e72e4;;
}

table.user-table td {
  /* width: 350px;
  padding: 10px; */
  border-bottom: 1px solid #ccc;
}


</style>
