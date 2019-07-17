<template>
    <div>
        <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">

                <Sidebar  class="sidebar-container " />

            <div class="main-container">
                <App-main/>
            </div>
        </div>
    </div>
</template>

<script>
    import { Navbar, Sidebar, AppMain } from '@/views/layout';
    export default {
      name: 'layout',
      components: {
        Navbar,
        Sidebar,
        AppMain
      },
      data() {
        return {
          fli1: this.$route.path.split('/')[2],
        }
      },
        methods: {

        },
      computed: {
        sidebar() {
          return this.$store.state.app.sidebar;
        }
      },
      beforeRouteEnter: (to, from, next) => {
        next();
      }
    }
</script>
<style rel="stylesheet/scss" lang="scss">

    .app-wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        .hideSidebar {
            padding-left: 40px;

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
