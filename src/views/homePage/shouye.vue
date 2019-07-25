<template>
    <el-row class="homePage">
        <el-col :span="24">
            <div class="title">
               <span class="title_name">
                   常用功能
               </span>
                <div class="notice"  @click="jumpAnnouncement()">
                    <div style="width: 40px;display: inline-block;height: 50px;">
                        <img src="./roles/announcement.png" alt="公告" style="width: 30px;    vertical-align: middle;">
                    </div>
                    <div style="width: 90px;display: inline-block;font-size: 14px">
                        公司公告
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="24">

            <div  v-for="(item,key) in permissionRoutes"  :key="key" v-if="item.meta.title != '超级管理' && item.meta.title != '首页'">
                <div class="home_page_title">
                   <span class="lable"></span> {{item.meta.title}}
                </div>
                <div class="card" v-for="(data,index) in rolesData[item.meta.title]"  :key="index"   v-if="data.type.indexOf(rolesName[0])>-1" @click="jumpList(data.rolesName)">
                    <div style="width: 40px;display: inline-block;height: 50px;">
                        <img src="./roles/map.png" alt="导航" style="width: 30px;    vertical-align: middle;">
                    </div>
                    <div style="width: 90px;display: inline-block">
                        {{data.name}}
                    </div>
                </div>
            </div>

        </el-col>
    </el-row>

</template>

<script>
    import {mapGetters} from 'vuex';
    import {roleType} from './roles/roles'; //权限
    import permissionRoutes from '@/store/permission';
    export default {
        components:{
        } ,
        data() {
            return {
                rolesData:[],
                rolesName:'',
                permissionRoutes: [],
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
            let data=permissionRoutes.getHeaderMenu();
            for(let i=0;i<data.length;i++){
                if(!data[i].hidden){
                    this.permissionRoutes.push(data[i])
                }
            }
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
            .notice {
                float: right;
                cursor: pointer;
            }
        }
        .home_page_title {
            height: 40px;
            line-height: 40px;
            font-size: 15px;
            font-weight: bold;
            padding-left: 10px;
            .lable {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: black;
                display: inline-block;
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
