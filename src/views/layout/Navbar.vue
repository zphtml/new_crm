<template>
    <el-menu class="navbar clear" mode="horizontal">
        <span style="cursor: pointer;color: #1a2a42;margin-left: 30px;" @click="tui">
            «返回
        </span>
        <div style="float: right;height: 50px;line-height: 50px;">
            <span style="display: inline-block;width: 30px;height: 30px;border-radius: 100%;background: #64cd64;vertical-align: middle;"></span>
            <el-dropdown trigger="click" style="vertical-align: middle;margin-left: 30px;">
               <span class="el-dropdown-link">
                    <span ref="username">{{user.name}}</span><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <router-link  class='inlineBlock' to="/account/reports/overview">
                        <el-dropdown-item>
                            首页
                        </el-dropdown-item>
                    </router-link>
                    <router-link  class='inlineBlock' to="/someboy">
                        <el-dropdown-item>
                            个人设置
                        </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
                </el-dropdown-menu>

            </el-dropdown>
            <span style="margin-left:30px;display: inline-block;width: 100px;text-align: center;border-left: 1px solid #dde2e9;height: 50px;line-height: 50px;">
                <svg class="icon"  aria-hidden="true" style="vertical-align: middle;color: #1a2a42;width: 18px" @click="logout">
                  <use xlink:href="#icon-tuichu"></use>
                </svg>
            </span>
        </div>
    </el-menu>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Hamburger from '@/components/Hamburger';
    import Levelbar from './Levelbar';

    export default {
      components: {
        Levelbar,
        Hamburger
      },
      computed: {
        ...mapGetters([
          'sidebar',
          'name',
          'user',
          'avatar'
        ])
      },
      /*watch: {
        $route() {
          let index = this.$route.path.indexOf('/',1);
          this.activeNav = this.$route.path.substring(0,index);
        }
      },*/
      methods: {
        tui(){
          this.$router.go(-1)
        },
        logout() {
          this.$store.dispatch('LogOut').then(() => {
            this.$router.push({ path: '/login' })
          });
        },
        toggleSideBar() {
          this.$store.dispatch('ToggleSideBar')
        }
      }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .clear:after{
        display:block;
        content:"clear";
        height:0;
        clear:both;
        visibility:hidden;
    }
    .icon {
        width: 2em; height: 2em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
    .clear{zoom:1;}
    .navbar {
        position: fixed;
        z-index: 111;
        left: 166px;
        right: 0;
        top: 0;
        border-bottom: 1px solid #dde2e9;
        height: 50px;
        background: #f4f8ff;
        line-height: 50px;
        font-family: "PingFang SC";
        font-size: 14px;
        border-radius: 0px !important;
        .hamburger-container {
            line-height: 50px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }
        .errLog-container {
            display: inline-block;
            position: absolute;
            right: 150px;
        }
    }
</style>



