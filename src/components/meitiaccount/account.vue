<template>
    <el-col :span="24" class="ct account_xg">
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;font-weight:bold;">
            <el-col :span="14" style="padding-left: 0">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                账户基本信息
            </el-col>
            <el-col :span="10" style="text-align: right;padding: 0">
                <el-button type="primary" @click="add_xiaohao" size="mini">新增消耗</el-button>
                    <el-button type="primary" v-if="editAccount==true" @click="edit()"  size="mini">编辑</el-button>
                    <el-button type="primary" v-if="editAccount==false" @click="uploadaccount">保存</el-button>
                    <el-button v-if="editAccount==false" @click="editAccount=true">取消</el-button>
            </el-col>
        </el-col>
        <el-col :span="24" style="margin-top: 10px;padding: 0">
            <el-col :span="6" style="border: 1px solid #e6e6e6;padding: 0">
                <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                    广告主
                </el-col>
                <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                    {{ $t('titles.nick') }}
                </el-col>
                <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                    开户域名
                </el-col>
                <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                    客户URL
                </el-col>
                <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                    开户性质
                </el-col>
                <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                    销售
                </el-col>
                <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                    优化师
                </el-col>
                <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                    服务类型
                </el-col>
            </el-col>
            <el-col :span="18" style="border: 1px solid #e6e6e6;padding: 0">
                <el-col :span="24" class="cusmessage" style="color: #222f3b">
                    <div v-if="editAccount==true">
                         <span v-if="item1.guanggaozhu">
                          {{ item1.guanggaozhu }}
                    </span>
                        <span v-else>
                        ---
                    </span>
                    </div>
                   <div  v-if="editAccount==false">
                       <el-select v-model="ggzName" filterable placeholder="请选择"   @change="ggz_change">
                           <el-option
                                   v-for="(i,key) in ggz_options"
                                   :key="key"
                                   :label="i.advertiser"
                                   :value="key">
                           </el-option>
                       </el-select>
                   </div>
                </el-col>
                <el-col :span="24" class="cusmessage" style="color: #222f3b">
                    <div v-if="editAccount==true">
                        <span v-if="item1.product">
                            {{ item1.product }}
                        </span>
                        <span v-else>
                            ---
                        </span>
                    </div>
                    <div v-if="editAccount==false">
                        <el-select v-model="cpName" filterable placeholder="请选择"    @change="cu_ad_change">
                            <el-option
                                    v-for="(i,key) in cp_options"
                                    :key="key"
                                    :label="i.product"
                                    :value="key">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="24" class="cusmessage" style="color: #222f3b">
                    <span v-if="editAccount==true">{{item.promote_url | curr}}</span>
                    <el-input v-model="item1.promote_url" placeholder="请输入内容" v-if="editAccount==false"></el-input>
                </el-col>
                <el-col :span="24" class="cusmessage" style="color: #222f3b">
                    <span v-if="editAccount==true">{{item.url | curr}}</span>
                    <el-input v-model="item1.url" placeholder="请输入内容" v-if="editAccount==false"></el-input>
                </el-col>

                <el-col :span="24" class="cusmessage" style="color: #222f3b">
                    <div v-if="editAccount==true">
                         <span v-if="item1.guanggaozhu">
                          {{ item1.xingzhi }}
                    </span>
                        <span v-else>
                        ---
                    </span>
                    </div>
                    <div  v-if="editAccount==false">
                        <el-select v-model="xingzhi" filterable placeholder="请选择" @change="changexingzhi">
                            <el-option
                                    v-for="(item,key) in xingzhiOptions"
                                    :key="key"
                                    :label="item.name"
                                    :value="key">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>

                <el-col :span="24" class="cusmessage" style="color: #222f3b">
                    {{item.marketname}}
                </el-col>
                <el-col :span="24" class="cusmessage" style="color: #222f3b">
                    <span v-if="editAccount==true">{{item.tel | curr}}</span>
                    <el-input v-model="item1.tel" placeholder="请输入内容" v-if="editAccount==false"></el-input>
                </el-col>
                <el-col :span="24" class="cusmessage" style="color: #222f3b">
                    <span v-if="editAccount==true">{{item.server_type | server(options) | curr}} </span>
                    <el-select v-model="a" filterable placeholder="请选择"  v-if="editAccount==false" @change="aword">
                        <el-option
                                v-for="i in options"
                                :key="i.value"
                                :label="i.label"
                                :value="i.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>
        </el-col>
        <!--弹窗 转出-->
        <el-dialog title="新增消耗" :visible.sync="addFormVisible"  @close="close"   v-for="(data,index) in formData" :key="index" :close-on-click-modal="false" class="tan_shiftTo" >
            <ul class="shiftTo">
                <li>
                    <p class="first_p">日期</p>
                    <p class="last_p">
                        <el-date-picker
                                v-model="data.date"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </p>
                </li>
                <li>
                    <p  class="first_p">消耗</p>
                    <p class="last_p">
                        <el-input class="tan_input"  type="text" ></el-input>
                        <input style="line-height: normal; border: none;padding-left:12px;font-size: 12px;height: 24px; position: absolute;left: 1px;top: 4px;width: 148px;outline: none;z-index:9"
                               type="number" v-model="data.cost"
                               name="mouse2"
                               placeholder="单行输入"
                               onmousewheel="return false;">
                    </p>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="pull_xh" >确 定</el-button>
                        <el-button  @click="addFormVisible = false">取 消</el-button>
			</span>
        </el-dialog>
    </el-col>
</template>
<script>
    import { addaccountcoust,customer_advertiser_list} from '@/api/kehu';
    import { mapGetters } from 'vuex';
    import moment from "moment"
    export default {
        data() {
            return {
                editAccount:true,
                ggzName:'',
                ggz_options:[],
                cu_ad_id:'',
                cpName:'',
                cp_options:[],
                cu_ad_product:'',
              input:"",
              qudao:'',
              a:'',
              formData:[
                  {
                      account_name:'',
                      date:'',
                      cost:'',
                      left_cost:'',
                      avid:'',
                  }
              ],
               xingzhi:'',
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
              addFormVisible:false, //消耗
              options: [
                  {
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
              cityoption:[
                {
                  name:' 无'
                },
                {
                  name:' 北京市'
                },
                {
                  name:'天津市'
                },
                {
                  name:'上海市'
                },
                {
                  name:'重庆市'
                },
                {
                  name:'河北省'
                },
                {
                  name:'河南省'
                },
                {
                  name:'云南省'
                },
                {
                  name:'辽宁省'  },
                {
                  name:'黑龙江省'   },
                {
                  name:'湖南省 '  },
                {
                  name:'安徽省 '  },
                {
                  name:'山东省 '  },
                {
                  name:'新疆维吾尔'   },
                {
                  name:'江苏省'   },
                {
                  name:'浙江省 '  },
                {
                  name:'江西省'   },
                {
                  name:'湖北省'  },
                {
                  name:'广西壮族'   },
                {
                  name:'甘肃省 '  },
                {
                  name:'山西省 '  },
                {
                  name:'内蒙古 '  },
                {
                  name:'陕西省'   },
                {
                  name:'吉林省' },
                {
                  name:'福建省'  },
                {
                  name:'贵州省'  },
                {
                  name:'广东省'   },
                {
                  name:'青海省'   },
                {
                  name:'西藏'  },
                {
                  name:'四川省'   },
                {
                  name:'宁夏回族'   },
                {
                  name:'海南省'   },
                {
                  name:'台湾省'  },
                {
                  name:'香港特别行政区'  },
                {
                  name:'澳门特别行政区'
                }],
              radio: '1',
              quin:'',
              attr:'',
              affer:{
                'submituser':"",
                'contract_id':"",
                'appname':"",
                'server_type':"",
                'promote_url':"",
                'pingbidiyu':"",
                'sem':"",
                'prlin_id':"",
                'fandian':"",
                'qudao':"",
                'state':"",
                'a_users':"",
                'a_password':"",
                'note':"",
                'avid':"",
                'appid':"",
                  'xingzhi':'',
                  'url':'',
              },
                accountId:'',
              addaccountcoust:function(data){
                  addaccountcoust({
                      data:data,
                  }).then(response => {
                      if(response.code == 200){
                          this.$message({
                              type: 'success',
                              message:response.msg
                          });
                      }else{
                          this.$message({
                              showClose: true,
                              message: '上传失败！',
                              type: 'error'
                          });
                      }
                  }).catch(() => {});
              },
              customer_advertiser_list:function(){
                    customer_advertiser_list({
                        id: this.accountId,
                    }).then(response => {
                        this.ggz_options = response.list;
                    }). catch(err => {this.$message.error(err);});
                },
            }
        },
        filters: {
            server: function (value,options) {
              for(let i=0;i<options.length;i++){
                if(options[i].value==value){
                  return options[i].label
                }
              }
            },
            qudao: function (value) {
              if(value>0){
                return '是'
              }else{
                return '否'
              }
            },
            qudao1: function (value) {
              if(value){
                return value.advertiser
              }else{
                return '无'
              }
            },
            curr:function (val) {
              if(val){
                return val
              }else{
                return '--'
              }
            },
            cur: function (value) {
              if(value){
                return value.name
              }else{
                return '--'
              }
            }
          },
        watch:{
            qudaolist:function (val) {
    //              console.log(val)
            },
            item:function (val) {

              let that=this;
              that.a=val.server_type.toString();
              that.attr=val.pingbidiyu;
              that.qudao=val.qudao;
              this.formData[0].account_name = val.a_users;
              this.formData[0].avid = val.avid;
            },
          },
        computed: {
            ...mapGetters([
                'user',
                'accounts',
            ]),
              item1: function () {
                var obj={};
                obj=JSON.parse(JSON.stringify(this.item));
                this.ggzName = obj.guanggaozhu;
                this.cu_ad_id = obj.cu_ad_id;
                this.cpName = obj.product;
                this.cu_ad_product = obj.cu_ad_product;
                this.xingzhi = obj.xingzhi;
                return obj
              }
        },
//      props: ['item','qudaolist'],
      props: {
        item: {
          default: {},
          required: true,
        },
        qudaolist: {
          default: [],
          required: true,
        },
        account: {
          default: true,
          required: true,
        },
      },
      methods:{
          changexingzhi(index){
              let reg = /^[\u4E00-\u9FA5]+$/;
              if(!reg.test(index)) {
                  this.xingzhi = this.xingzhiOptions[index].name;
              }
          },
        uploadaccount(){
          this.affer.submituser=this.user.id;
          this.affer.contract_id=this.item1.contract_id;
          this.affer.appname=this.item1.appname;
          this.affer.promote_url=this.item1.promote_url;
          this.affer.tel=this.item1.tel;
          this.affer.prlin_id=this.item1.prlin_id;
          this.affer.fandian=this.item1.fandian;
          this.affer.state=this.item1.state;
          this.affer.qudao=this.qudao;
          this.affer.a_users=this.item1.a_users;
          this.affer.a_password=this.item1.a_password;
          this.affer.note=this.item1.note;
          this.affer.appid=this.item1.appid;
          this.affer.avid=this.item1.avid;
          this.affer.pingbidiyu=this.attr;
          this.affer.server_type=Number(this.a);
          this.affer.cu_ad_id = this.cu_ad_id;
          this.affer.cu_ad_product = this.cu_ad_product;
            this.affer.xingzhi = this.xingzhi;
            this.affer.url = this.item1.url;
          this.$emit('account_updataru', this.affer);
          this.editAccount = true;
        },
        add_xiaohao(){
            this.addFormVisible = true;
        },
          close(){
            this.addFormVisible = false;
          },
       pull_xh(){
           this.formData[0].left_cost = this.formData[0].cost;
           this.$confirm('是否提交?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
           }).then(() => {
               this.formData[0].date = moment(this.formData[0].date).format('YYYY-MM-DD');
               this.addaccountcoust(this.formData[0]);
                this.addFormVisible = false;
           }).catch(() => {
               this.$message({
                   type: 'info',
                   message: '已取消提交'
               });
           });
       },
          edit(){
                this.editAccount = false;
                if(this.$route.path == '/customer/cusList/kehuliebiao/modifyAccount'){
                    this.accountId = this.accounts.id;
                }else{
                    this.accountId = this.item.avid;
                }

              this.customer_advertiser_list();
          },
          ggz_change(index){
              this.cu_ad_id = this.ggz_options[index].id;
              this.cp_options = this.ggz_options[index].product0;
          },
          cu_ad_change(index){
              this.cu_ad_product = this.cp_options[index].id;
          },
      },
      created() {

      },

    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .account_xg{
        .cusmessage{
            height: 35px!important;
            font-size: 12px;
            line-height: 35px!important;
            padding-left: 17px;
            border-bottom: 1px solid #e6e6e6;
        }
        .radio {
            .el-radio__input {
                .el-radio__inner {
                    border-color: #bfcbd9;
                    background: none;
                    border-radius: 0;
                }
            }
            .el-radio__label {
                color: #000;
                font-weight:normal;
                font-size: 12px;
            }
            .is-checked {
                .el-radio__inner::after {
                    content: '';
                    width: 9px;
                    height: 5px;
                    position: absolute;
                    top: 4px;
                    left: 4px;
                    border: 3px solid #bbbbbb;
                    border-top: none;
                    border-right: none;
                    background: transparent;
                    border-radius: 0;
                    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
                    /* opacity: 0; */
                    -moz-transform: rotate(-45deg);
                    -ms-transform: rotate(-45deg);
                    -webkit-transform: rotate(-45deg);
                    transform: rotate(-45deg);
                }
            }
        }
        .tan_shiftTo {
            .el-dialog {
                width:360px;
                .el-dialog__header {
                    position: relative;
                    padding:0;
                    height:40px;
                    line-height: 45px;
                    text-align: center;
                    background: #dde2e8;
                    font-size: 12px;
                    position: relative;
                    .el-dialog__title {
                        color: #606987;
                    }
                    .el-dialog__headerbtn {
                        position: absolute;
                        right:10px;
                        top:0;
                        bottom: 0;
                        margin:auto;
                    }
                }
                .el-dialog__body {
                    padding: 10px 20px;
                    .shiftTo {
                        margin:0;
                        padding:0;
                        list-style: none;
                        .el-date-editor.el-input {
                            width:150px;
                        }
                        p{
                            font-size: 12px;
                            display: inline-block;
                            margin:0;
                        }
                        li{
                            margin: 5px 0;
                            .first_p {
                                width:100px;
                                text-align: right;
                                margin-right: 30px;
                            }
                            .last_p{
                                width:150px;
                                position: relative;
                                .el-select {
                                    height:30px;
                                    input{
                                        height: 30px !important;
                                        line-height: 30px!important;
                                    }
                                }
                            }
                            p{
                                .right_span{
                                    width:40px;
                                    height:25px;
                                    border-radius: 3px;
                                    background: #f0f2f5;
                                    text-align: center;
                                    line-height: 25px;
                                    font-size: 12px;
                                    display: inline-block;
                                    border:1px solid #bbbbbb;
                                    float: right;
                                    margin-top: 2.5px;
                                    cursor: pointer;
                                }
                                .tan_input,.yanqi {
                                    height:30px;
                                    width:100%;
                                    input{
                                        height: 30px!important;
                                        line-height:29px!important;
                                    }
                                    .el-input__icon {
                                        vertical-align: top;
                                        line-height: 20px;
                                    }
                                }
                            }
                        }
                    }

                }
                .dialog-footer {
                    button.el-button{
                        width:80px;
                        height: 30px!important;
                        text-align: center;
                        line-height: 30px;
                        padding: 0;
                        margin:0 10px;
                    }
                }
            }
            .el-input__icon {
                line-height: 20px!important;
            }
        }
    }

</style>
