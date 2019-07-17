<template>
    <el-col :span="14" class="setUpRighrInfor">
        <p class="crm_title">
            <i class="crm_line"></i>
             <span style="font-size: 14px;color: #222F3B;">基本信息</span>
        </p>
      <div class="box">
        <div class="boxInfor headerImf">
            <span class="title">头像</span>
            <pullImg @postImg= postImg ></pullImg>
        </div>
          <div  class="boxInfor">
              <span  class="title">用户名</span>
              <span class="infor">{{user.username}}</span>
          </div>
          <div class="boxInfor">
              <span  class="title">姓名</span>
              <el-input class="InforInput" v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="boxInfor">
              <span  class="title">工作时间</span>
              <span class="infor">{{user.jobtime | time}}</span>
          </div>
          <div class="boxInfor">
              <span  class="title">员工属性</span>
              <span class="infor">{{user.istrue | cur}}</span>
          </div>
          <div class="pullButton" style="text-align: right">
              <el-button type="primary" @click="submitForm()">提交</el-button>
              <el-button @click="resetForm()">重置</el-button>
          </div>
      </div>
    </el-col>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { uptouxiang,upusersinfo } from '@/api/login'
    import pullImg from '@/components/Upload/Upload'
    import moment from "moment"
    var formData
    function getBlobBydataURI(dataURI,type) {
      var binary = atob(dataURI.split(',')[1]);
      var array = [];
      for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type:type });
    }
    export default {
        data() {
            return {
              input:'',
            };
        },
        computed: {
            ...mapGetters([
                'user',
            ])
        },
        components: {
            pullImg,
        },
      filters: {
        cur: function (value) {
          if(value==0){
            return '试用期员工'
          }else if(value==1){
            return '正式员工'
          }
        },
        time: function (value) {
          return moment(value*1000).format('YYYY-MM-DD')
        },
      },
      mounted () {
        this.input=this.user.name
      },
        methods: {
            submitForm() {
              if(this.input==''){
                this.$message.error('姓名不准为空');
              }else{

                upusersinfo(this.user.id,{name:this.input}).then(response => {
                  if(response.code == 200){
                    this.$message({
                      message: '修改成功',
                      type: 'success'
                    });
                    uptouxiang(this.user.id,formData).then(response => {
                      response.data.image=response.data.image
                      localStorage.setItem('CRM-User', JSON.stringify(response.data));
                      window.location.reload()
                    }).catch(error => {

                    });
                  }else{
                    this.$message.error('错误，'+response.msg);
                  }
                }).catch(error => {

                });
              }

            },
            postImg(val){
              //base64 转 blob
              let $Blob= getBlobBydataURI(val,'image/jpg');
              formData = new FormData();
              formData.append("Uptouxiang[imageFile]", $Blob ,"file_"+Date.parse(new Date())+".jpg");

            },
            resetForm() {
                this.input=''
            }
        }
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .setUpRighrInfor{
        padding-left: 20px;
        .box {
            margin-top: 20px;
            font-size: 12px;
            .boxInfor {
                margin-bottom: 10px;
                .title {
                    display: inline-block;
                    width:80px;
                    height:25px;
                    line-height: 25px;
                    text-align: right;
                }
                .infor {
                    display: inline-block;
                    margin-left: 20px;
                }
                .InforInput{
                    width: 80%;
                    margin-left: 20px;
                    display: inline-block;
                }
            }
        }

    }
</style>
