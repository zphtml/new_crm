<template>
    <div id="app">
        <transition>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default{
        name: 'APP'
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "./styles/rest.scss";
    @import "./styles/index.scss";
    html{
        min-width: 1000px;
        min-height: 500px;
    }
    body{
        overflow: auto!important;
    }
    #app{
        width:100%;
        height:100%;
    }
    .el-loading-mask {
        z-index: 10!important;
    }
    .v-modal{
        position: fixed;
        left: 170px!important;
        top: 50px!important;
        width: 100%;
        height: 100%;
        opacity: .5;
        background: #000;
    }
    .el-dialog__wrapper {
        position: fixed;
        top: 48px!important;
        right: 0;
        bottom: 0;
        left: 170px!important;
        overflow: auto;
        margin: 0;
    }
</style>
