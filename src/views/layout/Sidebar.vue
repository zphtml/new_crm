<template>
        <div style="height: 100%;" class="sidebar-wrapper"   :class="{isshow:!isCollapse}">
            <el-menu mode="vertical"
                     theme="dark"
                     unique-opened
                     background-color="#363f5e"
                     text-color="#fff"
                     :default-active="$route.name"
                     class="slide">
                <div style="position: absolute;left: 0px;top:50px;bottom: 0;overflow: auto"
                     class="clear activeClass scroller">
                    <template v-for="child in permissionRoutes" v-if="!child.hidden" >
                        <el-submenu :index="child.name" v-if="!child.noDropdown">
                            <template slot="title">
                                    <span >
                                        {{child.meta.title}}
                                    </span>
                            </template>
                            <router-link v-for="child1 in child.children" :key="child1.path" v-if="!child1.hidden"
                                         class="title-link"
                                         :to="{name:child1.name}">
                                <template v-if="child1.name==$route.name || child1.name == $route.fullPath.substring( $route.fullPath.lastIndexOf('/', $route.fullPath.lastIndexOf('/') - 1)+1,$route.fullPath.lastIndexOf('/'))">
                                    <el-menu-item :index="child1.name" class="is-active">
                                        {{child1.meta.title}}
                                    </el-menu-item>
                                </template>
                                <template v-else>
                                    <el-menu-item :index="child1.name">
                                        {{child1.meta.title}}
                                    </el-menu-item>
                                </template>
                            </router-link>
                        </el-submenu>
                        <router-link :key="child.path"  v-if="child.noDropdown" class="title-link"
                                     :to="{name:child.children[0].name}">
                            <template v-if="child.name==$route.name || child.name == $route.fullPath.substring( $route.fullPath.lastIndexOf('/', $route.fullPath.lastIndexOf('/') - 1)+1,$route.fullPath.lastIndexOf('/'))">
                                <el-menu-item :index="child.name" class="is-active">
                                    {{child.meta.title}}
                                </el-menu-item>
                            </template>
                            <template v-else>
                                <el-menu-item :index="child.name">
                                    {{child.meta.title}}
                                </el-menu-item>
                            </template>
                        </router-link>
                    </template>



                </div>

            </el-menu>
        </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import permissionRoutes from '@/store/permission';
  export default {
    name: 'Sidebar',
    components: {
    },
    data() {
      return {
        activeClass:'activeClass',
        errorClass:'errorClass',
          isCollapse:true,
        celou:true,
        informationUser:[],
        fli: this.$route.path.split('/')[2],
        permissionRoutes: permissionRoutes.get(this.$route),
        srcImg:'',
      }
    },
    methods: {

        layoutbar(val){
          this.isCollapse = val;

        },
        handleCommand(command){
            if(command == "setUp"){
                this.$router.push({ path: '/account/reports/mySettings' })
            }else if(command == "logout"){
                this.$store.dispatch('LogOut').then(() => {
                    this.$router.push({ path: '/login' })
                });
            }
        },
    },
    watch: {
      $route() {
        this.fli = this.$route.path.split('/')[2];
        this.permissionRoutes=permissionRoutes.get(this.$route);
      }
    },
      computed: {
      ...mapGetters([
          'user',
        'curaccount',
        'accountList',
      ]),
      showAccounts: function () {
        let index = this.$route.path.indexOf('/', 1);
        return this.$route.path.substring(0, index) == '/account';
      }
    },


  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .isshow {
        width: 0!important;
        overflow: hidden;
        transition: all .28s ease-out;
    }
    .sidebar-wrapper {
        width: 170px;
        position: fixed;
        top: 0px;
        bottom: 0;
        left: 140px;
        transition: all .28s ease-out;
        z-index:999;
        transform: translate(-140px, 0);
        .sidebar-container {
            transform: translate(132px, 0);
        }
    }
    .layoutBtn {
        display: none;
        position: absolute;
        top:50px;
        z-index:999;
    }
    li{
        list-style: none;
    }
    .tao {
        display: inline-block;
    }
    .no {
        display: none;
    }

    .is-active .tao {
        display: none;
    }

    .is-active .no {
        display: inline-block;
    }

    .el-menu {
        min-height: 100%;

    }

    .wscn-icon {
        margin-right: 10px;
    }

    .hideSidebar .title-link {
        display: inline-block;
        padding-left: 10px;
    }

    .hideSidebar .account-title {
        display: none;
        padding-left: 10px;
    }

    .lol1 {
        transition: all 1s linear;
    }

    .clear:after {
        display: block;
        content: "clear";
        height: 0;
        clear: both;
        visibility: hidden;
    }

    .clear {
        zoom: 1;
    }
    /*滚轴*/
    .scroller::-webkit-scrollbar{
        width: 5px;
        height: 16px;
        background-color:rgba(0,0,0,.3);
        border-radius:0;
    }

    /*定义滚动条的轨道，内阴影及圆角*/
    .scroller::-webkit-scrollbar-track{
        border-radius: 10px;
        background-color: white;
    }
    /*定义滑块，内阴影及圆角*/
    .scroller::-webkit-scrollbar-thumb{
        /*width: 10px;*/
        height: 20px;
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(24,31,41,.2);
        background-color: rgba(205,211,237,.4);
    }
    .el-menu--dark .el-menu-item, .el-menu--dark .el-submenu__title {
        color: #73b2ff;
    }
    @media screen and (max-width:800px){
        .layoutBtn {
            display: block;
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">

.activeClass {
    background: rgb(54,63,94);
    width:170px;
    .el-menu-item, .el-submenu__title {
        height: 45px !important;
        line-height: 45px !important;
    }
    .el-menu--dark .el-menu-item, .el-menu--dark .el-submenu__title {
        background: rgb(54,63,94);
        color: white !important;
    }
    .el-menu--dark .el-menu-item:hover, .el-menu--dark .el-submenu__title:hover {
        background-color: #499fe2 !important;

    }
    .el-submenu__title:hover {
        background-color: #363f5e !important;
    }
    .el-menu--dark .el-submenu .el-menu .el-menu-item:hover {
        background-color: #499fe2 !important;

    }
    .router-link-active li,.el-menu-item.is-active{
        color: white !important;
        background-color: #499fe2 !important;
    }
    .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
        color: white !important;
    }
    .el-menu--dark .el-menu-item[data-v-4a85853a], .el-menu--dark .el-submenu__title[data-v-4a85853a] {
        color: #222f3b;
    }
    .is-opened {
        overflow: hidden;
        ul.el-menu li{
            color: #adb4c7!important;

        }
        ul.el-menu li.is-active{
            color: white!important;
        }
        ul.el-menu li:hover{
            color: white!important;
        }
    }
    .is-opened ul.el-menu li:hover {
        color: white!important;
        background-color: #499fe2 !important;
    }
    .el-menu-item:focus, .el-menu-item:hover {
        outline: 0;
        background-color: #499fe2 !important;
    }
    .headImg {
        width:35px;
        height:35px;
        border-radius: 50%;
        overflow: hidden;
        margin-top: 10px;
        img{
            width:100%;

        }
    }
}

</style>
