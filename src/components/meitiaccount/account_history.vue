<template>
    <el-col :span="24" class="ct account_his">
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;font-weight:bold;">
            <el-col :span="24" style="padding-left: 0">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
               <span>账户记录</span>
                <span style="float: right">总充值：{{all_xufei  | currency('')}}(币)</span>
                <span style="float: right;margin-right: 10px" >总消耗：{{all_xiaohao   | currency('')}}(币)</span>
            </el-col>
        </el-col>
        <el-col :span="24" class="box">

            <el-col :span="24" class="table_header" style="margin-top: 10px;padding:0;" :class="{tr_padding:header_tr}">
                <div style="display: flex;">
                    <div  class="header">
                        媒介合同名称
                    </div>
                    <div  class="header">
                        充值（账户币）
                    </div>
                    <div  class="header">
                        开始时间
                    </div>
                    <div  class="header">
                        结束时间
                    </div>
                    <div  class="header">
                        返点
                    </div>
                    <div  class="header">
                        临时账户
                    </div>
                    <div  class="header">
                        密码
                    </div>
                    <div  class="header">
                        标签
                    </div>
                    <div  class="header">
                        结束
                    </div>
                </div>

            </el-col>
            <el-col :span="24" class="body" style="padding: 0;position: relative">
                <div style="position: absolute;left: 0;right: 0;bottom: 0;top: 0;margin: auto;text-align: center;line-height: 250px" v-if="accountList.length == 0">
                    暂无记录
                </div>
                <div class="list" :class="{active:index==isActive}"  @click="changeClass(data,index)" style="display: flex" v-for="(data,index) in accountList"  :key="index"  v-else>
                    <div class="body_tr">
                        <el-tooltip :content="data.title" placement="top" effect="light">
                            <span class="title_name" > {{data.title}}</span>
                        </el-tooltip>

                    </div>
                    <div class="body_tr">
                        {{data.xf_cost}}
                    </div>
                    <div class="body_tr">
                        {{data.ctime | ctimeData}}
                    </div>
                    <div class="body_tr" >
                        <span v-if="data.endtime == '4092599349'" >
                           {{data.endtime  | ctimeData}}
                        </span>
                        <span v-else style="color: red;">
                              {{data.endtime  | ctimeData}}
                        </span>
                    </div>
                    <div class="body_tr">
                        {{data.fandian}}
                    </div>
                    <div class="body_tr">
                        <span v-if="data.state == 1">
                            是
                        </span>
                        <span v-if="data.state != 1">
                            否
                        </span>
                    </div>
                    <div class="body_tr">
                        <span>{{data.a_password}}</span>
                        <div style="position: absolute;right: 0;bottom: 0;text-align: right">
                            <el-popover
                                    placement="top"
                                    width="160"
                                    @hide="changehide">
                                <p>
                                    <el-input v-model="data.a_password" size="mini" style="margin: 10px 0;"></el-input>
                                </p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                                    <el-button type="primary" size="mini" @click="modification(data)">确定</el-button>
                                </div>
                                <div slot="reference" style="width: 30px;display: inline-block;vertical-align: top">
                                    <i class="el-icon-edit" style="color: #0c88fc;font-size: 13px;cursor: pointer"></i>
                                </div>
                            </el-popover>

                        </div>


                    </div>
                    <div class="body_tr">
                        <div style="display: inline-block;width: 80%;  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor: pointer">
                            <el-tooltip :content="data.tags" placement="top" effect="light">
                                <span> {{data.tags}}</span>
                            </el-tooltip>

                        </div>
                        <div style="display: inline-block;vertical-align: top">
                            <i class="el-icon-edit" style="color: #0c88fc;font-size: 13px;cursor: pointer"  @click="tan_type(data)"></i>
                        </div>
                    </div>
                    <div class="body_tr">

                        <span v-if="data.endtime != '4092599349'" style="color: red;">
                            已结束
                        </span>
                        <el-button v-else size="mini" type="primary" @click="jieshu(data)">
                            结束
                        </el-button>
                    </div>
                </div>
            </el-col>
        </el-col>
        <!--弹窗 修改标签-->
        <el-dialog title="修改标签" :visible.sync="setType"  @close="addhttp=false"  :close-on-click-modal="false" class="tan_shiftTo_yuming" >
            <div>
                <div slot="reference">
                    <div  class="checkbox" v-for="(data,key) in list_type_all" >
                        <p style="width: 70px;display: inline-block;vertical-align: top">
                            {{data.parent_name}}:
                        </p>
                        <p style="width: 360px;display: inline-block">
                            <el-checkbox-group v-model="data['type'+key]" size="mini" @change="add_type">
                                <el-checkbox :label="data.name" v-for="(data,index) in data.list" :key="index"></el-checkbox>
                            </el-checkbox-group>
                        </p>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="pull_xh" >确 定</el-button>
                        <el-button  @click="setType = false">取 消</el-button>
			</span>
        </el-dialog>
    </el-col>
</template>
<script>
    import { account_updataru,upaccount_tags,account_tags_list} from '@/api/meitiaccount';
    import { addaccountcoust,customer_advertiser_list} from '@/api/kehu';
    import { end_account } from '@/api/kehu';
    import { mapGetters } from 'vuex';
    import moment from "moment"
    export default {
        data() {
            return {
                accountId:'',
                header_tr:false,
                visible: false,
                accountList:[],
                account:[],
                all_xufei:0,
                all_xiaohao:0,
                isActive:0,
// 弹窗
                setType:false,
                tags:[],
                tagsTitle:'',
                affer:{
                    submituser:"",
                    contract_id:"",
                    appname:"",
                    server_type:"",
                    promote_url:"",
                    pingbidiyu:"",
                    tel:"",
                    prlin_id:"",
                    fandian:"",
                    qudao:"",
                    state:"",
                    a_users:"",
                    a_password:"",
                    note:"",
                    appid:"",
                    avid:""
                },
                list_type_all:[],
                account_tags_list(val){
                    account_tags_list({
                    }).then(response => {
                        response.map(function (val,key) {
                            val['type'+key] = [];
                        });
                        this.list_type_all = response;
                        let data =  val.tags.split(',');
                        this.list_type_all.map(function (val,key) {
                            val.list.map(function(a){
                                data.map(function (item) {
                                    if(a.name == item){
                                        val['type'+key].push(item)
                                    }
                                })

                            })
                        })

                    }).catch(error => {
                    });
                },
                upaccount_tags(){
                    this.setType = false;
                    upaccount_tags({
                        id:this.accountId,
                        tags:this.tagsTitle,
                    }).then(response => {
                        if(response.code == 200){
                            this.$emit('yuming_click');
                        }else{
                            this.$message.error('提交失败');
                        }
                    }).catch(error => {
                        this.$message.error('提交失败');
                    });
                },
 // 结束
                end_account:function(val){
                    end_account({
                        id:val.id,
                    }).then(response => {
                        if(response.cdoe == 200){
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$emit('yuming_click');
                        }
                    }). catch(err => {this.$message.error(err);});
                },
            }
        },
        watch:{

            item:function (val) {
                this.accountList = val;
                this.account = JSON.parse(JSON.stringify( val));
                if(val.length>8){
                    this.header_tr = true;
                }
                this.all_xufei = 0;
                this.all_xiaohao = 0;
                let _this = this;
                this.accountList.filter(function(item){
                    _this.all_xufei+=Number(item.xf_cost);
                    _this.total_cost+=Number(item.total_pay);
                })
            },
          },
        computed: {
            ...mapGetters([
                'user',
                'accounts',
            ]),
        },
      methods:{
          jieshu(val){
              this.$confirm(' 是否结束?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  this.end_account(val);
              }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消'
                  });
              });
          },
          changehide(){
            this.accountList = this.account;

          },
          modification(val){
              this.affer.submituser=this.user.id;
              this.affer.contract_id=val.contract_id;
              this.affer.appname=val.appname;
              this.affer.promote_url=val.promote_url;
              this.affer.tel=val.tel;
              this.affer.prlin_id=val.prlin_id;
              this.affer.fandian=val.fandian;
              this.affer.state=val.state;
              this.affer.qudao=val.qudao;
              this.affer.a_users=val.a_users;
              this.affer.a_password=val.a_password;
              this.affer.note=val.note;
              this.affer.avid=val.avid;
              this.affer.appid=val.appid;
              this.affer.pingbidiyu=val.pingbidiyu;
              this.affer.server_type=val.server_type;
              this.$emit('account_updataru', this.affer);
              this.visible = false;
          },
//  点击查看合同详情
          changeClass(data,val){
              this.isActive = val;
              this.$emit('getContractInfor',data);
          },
//  弹窗
          //  二级域名条件
          add_type(){
              this.tags = [];
              let _this = this;
                  this.list_type_all.map(function (val,key) {
                      _this.tags = _this.tags.concat(val['type'+key])
              })
//              this.tags = [...this.productCheck,...this.pageCheck];
              this.tagsTitle = this.tags.join(',')
          },
          tan_type(val){
            this.setType = true;
              this.accountId = val.id;
            this.account_tags_list(val)

          },
          pull_xh(){
              let data = false;
              this.list_type_all.map(function (val,key) {
                  if(val['type'+key].length == 0){
                      data = true;
                  }
              })
              if(data){
                  this.$message({
                      message: '产品类型,页面类型,都必须选择！',
                      type: 'warning'
                  });
              }else{
                  this.upaccount_tags()
              }
          },
      },
      created() {

      },
        filters:{
            ctimeData(val){

                var time=new Date(parseInt(val) * 1000);
                return   moment(time).format('YYYY-MM-DD')
            },
        },
        props: ['item']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .account_his{
       .box {
           font-size: 12px;
       }

        .body {
            height:210px;
            overflow-x: hidden;
            border:1px solid rgb(230, 230, 230);
            box-sizing: border-box;
        }
        .tr_padding {
            padding-right:16px!important;
        }
        .list:hover {
            background: #f5f7fa;
        }
        .active {
            background: #f5f7fa;
        }
        .header,.body_tr {
            width:20%;
            padding: 0 3px!important;
            border: 1px solid rgb(230, 230, 230);
            box-sizing: border-box;
            height:28px;
            line-height: 28px;
            overflow: hidden;
            position: relative;
        }
        .body_tr {
            cursor: pointer;
            border-top: none;
            border-right: none;
        }
    }

</style>
