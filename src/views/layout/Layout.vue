<template>
    <div>
        <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened,wrapperWidth:Sidebar}">
            <div >
                <Sidebar ref="sidebar" class="sidebar-container"/>
            </div>
            <div class="main-container">
                <!--<Navbar/>-->
                <App-main/>
            </div>
        </div>
    </div>
</template>

<script>
    import { Navbar, Sidebar, AppMain } from '@/views/layout';
    import { bus } from '../../store/eventBus'
    export default {
      name: 'layout',
      components: {
        Navbar,
        Sidebar,
        AppMain
      },
      data() {
        return {
          Sidebar:true,
          fli1: this.$route.path.split('/')[2],
        }
      },
      computed: {
        sidebar() {
          return this.$store.state.app.sidebar;
        }
      },
        mounted(){
          let _this = this;
            bus.$on('layout', function (itm) {
                _this.Sidebar = itm;
                _this.$refs.sidebar.layoutbar(itm);
            })
        },
        methods: {
        },
      beforeRouteEnter: (to, from, next) => {
        next();
      }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "src/styles/mixin.scss";
    .wrapperWidth{
        padding-left: 160px!important;
        transition: all .28s ease-out;
    }
    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        padding-left: 0px;
        transition: all .28s ease-out;
        &.hideSidebar {
            padding-left: 40px;
            .sidebar-wrapper {
                transform: translate(-140px, 0);
                .sidebar-container {
                    transform: translate(132px, 0);
                }
                &:hover {
                    transform: translate(0, 0);
                     z-index: 1001;
                    .sidebar-container {
                        transform: translate(0, 0);
                    }
                }
            }
        }
        .sidebar-wrapper {
            width: 170px;
            position: fixed;
            top: 0px;
            bottom: 0;
            transition: all .28s ease-out;
            z-index:999;
            overflow-x: hidden;
            @include scrollBar;
        }
        .sidebar-container {
            transition: all .28s ease-out;
        }
        .main-container {
            margin-top: 50px;
            width: 100%;
            min-height: 100%;
            transition: all .28s ease-out;
        }
    }
    .nub1 .navbar{
        display: none;
        left: 50px !important;
    }
    .nub2 .navbar{
        left: 180px !important;
    }

</style>
