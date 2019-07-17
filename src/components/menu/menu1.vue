<template>
        <div style="display: inline-block" class="clint headerTitle">
            <el-menu
                    :default-active="activeNav"
                    class="nav-menu-container"
                    mode="horizontal"
                    background-color="#363f5e"
                    style="border-bottom: none"
                    text-color="#fff">
                <template v-for="item in permissionRoutes" v-if="!item.hidden">
                    <router-link :to="item.path">
                        <el-menu-item :index="item.path"  style="display: inline-block">{{item.meta.title}}</el-menu-item>
                    </router-link>
                </template>
            </el-menu>
            <el-dropdown trigger="click" v-if="more.length>0" menu-align="start">
                <div class="avatar-wrapper">
                    更多...<i class="el-icon-caret-bottom"/>
                </div>
                <el-dropdown-menu class="user-dropdown" slot="dropdown" style="width:200px;font-size: 12px">
                    <template v-for="(item,index) in more">
                        <router-link  class='inlineBlock' :to="item.path">
                            <el-dropdown-item>
                                <img :src="item.icon" alt="" style="vertical-align: middle;width: 15px;margin-right: 10px;">
                                {{item.meta.title}}
                            </el-dropdown-item>
                        </router-link>
                    </template>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

</template>

<script>

  import { mapGetters } from 'vuex';

    export default {
      name: 'mennue',
        data() {
        return {
          activeNav: '',
          }
      },
      methods:{

      },
      watch:{

        permissionRoutes(val){
          this.activeNav='/'+this.$route.path.split('/')[1]
        },
        $route() {
          this.activeNav='/'+this.$route.path.split('/')[1]
        }
      },
      mounted:function(){

        this.activeNav='/'+this.$route.path.split('/')[1];
      },
      computed: {
        ...mapGetters([
          'accountList',
          'curaccount',
        ])
      },
      props: ['permissionRoutes','more']
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

    .container {
        width:100%;
        height: 60px;
        position: fixed;
        top:0;
        z-index:1000;
        background: rgb(54,63,94);
    }
    .el-menu {
        border-radius: 2px;
        list-style: none;
        position: relative;
        margin: 0;
        padding-left: 0;
        background-color: #324157;
    }
    .icon {
        width: 1.6em;
        height: 1.6em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
    .el-menu .is-active{
        color: #20a0ff;
    }
    .avatar-container {
        float: right;
    }
    .el-menu li{
        width:95px;
        text-align: center;
        font-size: 14px;
        color: #bfcbd9;
        font-weight: 500;
    }
    .el-menu li:hover{
        background: #48576a;

    }
    .nav-logo-container {
        width: 180px;
        height: 59px;
        float: left;
        z-index: 9999;
        position: relative;
    }

    .nav-logo-container img {
        width:70%;
        position: absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        margin: auto;
    }
    .nav-menu-container {
        float: left;
    }
    .el-dropdown{
        width: 135px;
        height: 50px;
        line-height: 52px;
        text-align: center;
        cursor: pointer;
        float: right;
        .user-avatarp[data-v-c1bfb5ca] {
            width: 40px;
            height:40px;
        }
    }
    .el-dropdown-menu__item--divided:before {
        height:0;
    }
    .el-dropdown-menu {
        width:100px;
        text-align: center;
    }
    .el-menu .router-link-active li{
        background: #324157;
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .clint{
        .el-dropdown{
            width: 200px;
        }
        .el-dropdown-menu[data-v-361da169] {
            width: 200px !important;
            text-align: center;
        }
        .el-dropdown {
            color: #fff;
            font-size: 14px;
        }
        .is-active{
            border-bottom: 3px solid #fff !important;

        }
        .el-menu-item{
            transition: all .3s;
        }

        .el-menu {
            border-radius: 2px;
            list-style: none;
            position: relative;
            margin: 0;
            padding-left: 0;
            margin-left: 30px;
            background-color: #222f3b;
            border: none;
        }
        .el-menu .is-active {
            color: #fff;
        }
        .router-link-active li, .el-menu-item.is-active {
            color: white !important;
            background-color: #363f5e !important;
        }
        .el-menu li[data-v-5bebbbcc]:hover {
            background: none!important;
        }
        .el-menu--dark .el-menu-item, .el-menu--dark .el-submenu__title {
            background: rgb(54,63,94) !important;
            color: #fff !important;

        }
        .el-menu--horizontal .el-menu-item {
            height: 45px;
            line-height: 50px;
        }
        .router-link-active li{
            border-bottom: 3px solid #fff !important;
        }
    }
    .router-link-active li{
        background: #f7f7f7;
    }
    @media screen and (max-width:800px){
        .crm_header {
            .clint .el-menu{
                margin: 0;
                padding: 0;
            }
            .el-dropdown {
                width: auto;
            }
            .menuitem {
                width: auto;
            }
            .el-dropdown-menu {
                width: 40px!important;
            }
        }

    }
</style>
