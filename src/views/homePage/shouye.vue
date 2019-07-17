<template>
    <el-row class="homePage">
        <el-col :span="24">
            <div class="title">
               <span class="title_name">
                   常用功能
               </span>
            </div>
        </el-col>
        <el-col :span="24">
            <div class="card" v-for="(data,index) in rolesData"  :key="index"   v-if="data.type.indexOf(rolesName[0])>-1" @click="jumpList(data.rolesName)">
                <div style="width: 40px;display: inline-block;height: 50px;">
                    <img src="./roles/map.png" alt="导航" style="width: 30px;    vertical-align: middle;">
                </div>
                <div style="width: 90px;display: inline-block">
                    {{data.name}}
                </div>
            </div>
            <div class="card"  @click="jumpAnnouncement()">
                <div style="width: 40px;display: inline-block;height: 50px;">
                    <img src="./roles/announcement.png" alt="公告" style="width: 30px;    vertical-align: middle;">
                </div>
                <div style="width: 90px;display: inline-block;font-size: 14px">
                    公司公告
                </div>
            </div>
        </el-col>
    </el-row>

</template>

<script>
    import {mapGetters} from 'vuex';
    import {roleType} from './roles/roles'; //权限
    export default {
        components:{
        } ,
        data() {
            return {
                rolesData:[],
                rolesName:'',
            }
        },
        computed: {
            ...mapGetters([
                'user',
                'jobTitle'
            ]),
        },
        mounted(){
            this.rolesName = Object.keys(this.jobTitle);
            this.rolesData = roleType;
        },
        methods: {
            jumpList(val){
                this.$router.push({ name: val });
            },
            jumpAnnouncement(){
                this.$router.push({ name: 'announcement' });


            }
        },
        watch: {

        },
        filters: {
        }
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .homePage {
        padding: 0 20px;
        .title {
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #CCCCCC;
            .title_name {
                font-size: 18px;
                font-weight: bold;
            }
        }
        .card {
            width: 140px;
            height: 50px;
            border: 1px solid #CCCCCC;
            line-height: 50px;
            margin: 10px 20px 0 0 ;
            font-size: 13px;
            display: inline-block;
            cursor: pointer;
        }
    }


</style>
