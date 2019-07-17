<template>
  <div class="errPage-container">
    <el-button @click="back" icon='arrow-left' class="pan-back-btn">返回</el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        <h2>你没有权限去该页面</h2>
      </el-col>
      <el-col :span="12">
        <img src="http://test.myushan.com/ZPCRM401.gif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>
<script>


    export default {
      data() {
        return {

        }
      },
      methods: {
        back() {
            this.$router.push({ name: 'Login' });
        },
        jump(){
            this.$router.push({ name: 'index' });
        }
      }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .errPage-container {
        width: 800px;
        margin: 100px auto;
        .pan-back-btn {
            background: #008489;
            color: #fff;
        }
        .pan-gif {
            margin: 0 auto;
            display: block;
        }
        .pan-img{
            display: block;
            margin: 0 auto;
        }
        .text-jumbo {
            font-size: 60px;
            font-weight: 700;
            color: #484848;
        }
        .list-unstyled {
            font-size: 14px;
            li {
                padding-bottom: 5px;
            }
            a {
                color: #008489;
                text-decoration: none;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>
