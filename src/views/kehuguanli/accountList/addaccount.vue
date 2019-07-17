<template>
    <el-row style="" class="accountmessage2 ku_addBox">
        <p class="crm_title">
            <i class="crm_line"></i>
            <span  @click="jumpxieyiList">协议列表</span>><span  @click="jump_xy_infor">协议详情</span>><span>添加账户</span>

        </p>
        <el-col :span="24" style="margin-top:10px">
            <el-col :sm="24">
                <span style="font-size: 22px;vertical-align: middle">{{data.advertiser0 | ad}}-添加账户</span>
                <accounticon :customer_Data_type="data.advertiser0"></accounticon>
            </el-col>

        </el-col>
        <el-col :span="24" class="kh_InforBox">
            <el-col :span="16" class="kh_left_box">
                <el-col :span="24" class="topInfor">
                    <div class="titleInfor">
                        <span class="listStyle"></span>
                        <span class="listText">账户基本信息</span>
                    </div>
                    <div class="titleBox" >
                        <div style="height: 30px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                    开户性质
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    <el-select v-model="xingzhi" filterable placeholder="请选择" @change="changexingzhi">
                                        <el-option
                                                v-for="(item,key) in xingzhiOptions"
                                                :key="key"
                                                :label="item.name"
                                                :value="key">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 30px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title" style="color:black">
                                    广告主名称
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    <el-select v-model="ggzName"   filterable placeholder="请选择" @change="ggz_change">
                                        <el-option
                                                v-for="(i,key) in ggz_options"
                                                :key="key"
                                                :label="i.advertiser"
                                                :value="key">
                                        </el-option>
                                    </el-select>
                                    <el-tooltip content="点击添加广告主" placement="right" effect="light" style="margin-left: 25px">
                                        <span style="cursor: pointer;color: #54ADFF;font-weight: bold" @click="jump_ggz">?</span>
                                    </el-tooltip>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 30px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title">
                                    {{ $t('titles.nick') }}名称
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    <el-select v-model="cu_ad_product"    filterable placeholder="请选择">
                                        <el-option
                                                v-for="i in cp_options"
                                                :key="i.id"
                                                :label="i.product"
                                                :value="i.id">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 30px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title">
                                    开户域名
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    <el-input v-model="promote_url" placeholder="请输入内容"></el-input>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 30px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title">
                                    客户URL
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    <el-input v-model="url" placeholder="请输入内容"></el-input>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 30px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title" >
                                    主手机号
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    <el-input v-model="tel" placeholder="请输入内容"></el-input>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 30px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title">
                                    服务类型
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    <el-select v-model="a" filterable placeholder="请选择">
                                        <el-option
                                                v-for="i in options"
                                                :key="i.id"
                                                :label="i.label"
                                                :value="i.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 30px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title" >
                                    创建时间
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    <el-date-picker
                                            v-model="ctime"
                                            :clearable="false"
                                            type="date"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </el-col>
                            </el-col>
                        </div>
                    </div>
                </el-col>

            </el-col>
        </el-col>
        <el-col :span="24" class="kh_InforBox">
            <el-col :span="16" class="kh_left_box">
                <el-col :span="24" class="topInfor">
                    <div class="titleInfor">
                        <span class="listStyle"></span>
                        <span class="listText">账号信息</span>
                    </div>
                    <div class="titleBox" >
                        <div style="height: 80px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                    用户名
                                </el-col>
                                <el-col :span="20" class="input_search input_textarea">
                                    <el-input   type="textarea" v-model="a_users" placeholder="输入用户后换行"   :autosize="{ minRows: 3, maxRows: 3}" ></el-input>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 30px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title" style="font-size: 14px;color:black">
                                    密码
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    <el-input type="password" v-model="a_password" placeholder="请输入内容" v-if="passwordData == true"  @blur="passame"></el-input>
                                    <el-input  v-model="a_password" placeholder="请输入内容"  v-else  @blur="passame"></el-input>
                                    <img src="../../../assets/yan.png" @click="passwordData = !passwordData" style="width: 15px;cursor: pointer;margin-top: 2px;margin-left: 5px;vertical-align: middle;" alt="">
                                    <span v-if="pas" style="color: red">
                                        密码必填
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 30px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title" >
                                    是否临时
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    <el-radio-group v-model="radio" class="radio_a">
                                        <el-radio :label="0">否</el-radio>
                                        <el-radio :label="1">是</el-radio>
                                    </el-radio-group>
                                </el-col>
                            </el-col>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24" class="fujianInfor">
                    <el-col :span="24" class="rightInfor">
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">备注信息</span>
                        </div>
                        <div class="inputInfor" >
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="note">
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="24" class="foot_btn">
                        <el-button type="primary" style="width: 80px;height: 30px;"  @click="submiter">提交</el-button>
                        <el-button style="width: 80px;height: 30px;" @click="reset">重置</el-button>
                    </el-col>
                </el-col>
            </el-col>
        </el-col>
    </el-row>
</template>

<script>
    /*eslint-disable */
    import {account_info, account_updataru,account_add,checkaccount_add} from '@/api/meitiaccount';
    import { customer_advertiser_list,account_add_pi_ru } from '@/api/kehu';
    import accounticon from '@/components/cusmessage/accountIcon';
    import {mapGetters} from 'vuex';
    import moment from "moment"
    let audit = {}
    export default {
      name: 'ct',
      data() {
        return {
            routeId:'',
            xingzhi:'直开',
            xingzhiOptions:[
                {
                    name:'直开',
                    id:'1'
                },{
                    name:'拼框',
                    id:'2'
                },{
                    name:'外地',
                    id:'3'
                },{
                    name:'框架',
                    id:'4'
                }
            ],
          customer_Data_type:'',
          passwordData:true,
          same:false,
          proct:false,
          yonghu:false,
          pas:false,
          a_users: '',
          a_password: '',
          radio: 0,
          radio1: 1,
          data:{},
          note: '',
          ctime:moment().format('YYYY-MM-DD'),
          appname: '',
            advertiser_name:'',
          promote_url: '',
            url:'',
          fandianID:'',
          tel: '',
          a: '130001',
            cu_ad_id:'',
            cu_ad_product:'',
            ggzName:'',
            ggz_options:[],
            cpName:'',
            cp_options:[],
          options: [{
            value: '130001',
            label: '优化服务+页面'
          }, {
            value: '130002',
            label: '页面'
          }, {
            value: '130003',
            label: '优化服务'
          }, {
            value: '130004',
            label: '无服务'
          }, {
            value: '130005',
            label: '监督'
          }],
          attr: '无',
          qudao: '',
          qudaolist:[],
            tan(data) {
                this.$confirm(data, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(this.data.rencontract){
                        this.fandianID = this.data.rencontract.fandian;
                    }else{
                        this.fandianID = '';
                    }
                    let data={
                        submituser:this.user.id,
                        contract_id:this.routeId,
                        advertiser_name:this.advertiser_name,
                        appname:this.appname,
                        server_type:this.a,
                        promote_ur:this.promote_ur,
                        pingbidiyu:this.attr,
                        tel:this.tel,
                        state:this.radio,
                        a_users:this.getSplitString(this.a_users),
                        a_password:this.a_password,
                        note:this.note,
                        avid:this.data.advertiser,
                        prlin_id:this.data.product_line,
                        fandian:this.fandianID,
                        cu_ad_id:this.cu_ad_id,
                        cu_ad_product:this.cu_ad_product,
                        ctime:moment(this.ctime).format('YYYY-MM-DD'),
                        promote_url:this.promote_url,
                        xingzhi:this.xingzhi,
                        url:this.url,
                    }
                    if(this.radio1=='1'){
                        data.qudao=0
                    }else if(this.radio1=='2'){
                        data.qudao=this.qudao
                    }
                    account_add_pi_ru(data).then(response =>{
                        if(response.code == 200){
                            this.$message({
                                message: '上传成功',
                                type: 'success'
                            });
                            this.success();
                        }else{
                            this.$message({
                                showClose: true,
                                message: '上传失败',
                                type: 'error'
                            });
                        }

                    }).catch(error => {

                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消提交'
                    });
                });
            },
            success() {
                this.$notify({
                    title: '上传成功',
                    message: '此页面将跳转到--账户列表',
                    type: 'success'
                });
                let _this = this;
                let url=location.href.split('?')[1];
                let ref=url.split('&');
                let uriId = decodeURI(ref[0].split('=')[1]);
                this.$router.push({ name: 'agreementDetails'  , query: { id: uriId}});
            },
            customer_advertiser_list:function(){

                customer_advertiser_list({
                    id:this.accounts.id,
                }).then(response => {
                    this.ggz_options = response.list;
                }). catch(err => {this.$message.error('获取失败');});
            },
        }
      },
        components: {
            accounticon
        },

      filters: {
        cur: function (value) {
          if (value) {
            return value.name
          } else {
            return '--'
          }
        },
        ad: function (value) {
          if (value) {
            return value.advertiser
          } else {
            return '--'
          }
        },

      },
      computed: {
        ...mapGetters([
          'user',
          'roles',
            'accounts'
        ])
      },
        mounted(){
            this.routeId = this.$route.query.id;
            this.customer_advertiser_list();
        },
      methods: {
          getSplitString(str) {
              var arr = str.split(",");

              var resources = [];
              for (var i = 0; i < arr.length; i++) {
                  var arr1 = arr[i].split(/\s+/);
                  for (var j = 0; j < arr1.length; j++) {
                      if (arr1[j] != "") {
                          resources.push(arr1[j].replace(/^\s*|\s*$/g,""));
                      }
                  }
              }
              return resources;
          },
          changexingzhi(index){
              let reg = /^[\u4E00-\u9FA5]+$/;
              if(!reg.test(index)) {
                  this.xingzhi = this.xingzhiOptions[index].name;
              }
          },
          ggz_change(index){
           this.cu_ad_id = this.ggz_options[index].id;
           this.cp_options = this.ggz_options[index].product0;
           this.cu_ad_product = "";
          },
          //跳转
          jumpxieyiList(){
              this.$router.push({ name: 'ProtocolList' });
          },
          jump_xy_infor(){
              this.$router.push({ name: 'agreementDetails' , query: { id:this.routeId}});
          },
       jumpaccount(){
           this.$router.push({ name: 'accountList',query: { id: this.routeId,gsId:this.$route.query.gsId} });
       },
        //重置
        reset(){
            this.appname='';
            this.promote_url='';
            this.url='';
            this.tel='';
            this.a_users='';
            this.a_password='';
            this.note='';
            this.radio1='1';
            this.radio='1';
        },
        passame(val){

          if(this.a_password==''){
            this.pas=true;
          }else{
            this.pas=false;
          }

        },
        submiter(){
          let pattern = /^[\u4E00-\u9FA5a-zA-Z0-9_\-\~@!#%&*（）\.\u4E00-\u9FA5]*$/;
          let pass_yan=pattern.test(this.a_password);
          if(typeof this.ggzName != 'number' ){
              this.$message('广告主必选');
          }else if(this.cu_ad_product == ""){
              this.$message('产品名称必选');
          }else if(this.url == ""){
              this.$message('客户URL必选');
          }else if(this.a_users==''){
            this.$message('用户名必填');
          } else if(this.a_password==''){
            this.$message('密码必填');
          }else{
              let data = '提交后不可更改，是否继续?';
              this.tan(data);
          }
        },
          jump_ggz(){
              this.$router.push({ name: 'Advertiser' , query: { id:this.accounts.id}});
          },
      },
      watch: {
        customer: function (val) {

        },
      },
      created() {
          this.routeId = this.$route.query.id;
         account_add(this.routeId).then(response =>{

          this.qudao=response.qudao_list[0].id;
          this.qudaolist=response.qudao_list;
          this.data=response.contract_info
         }).catch(error => {

         });
          /*

           */
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/addform.scss";

</style>
