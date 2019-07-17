<template>
    <el-col :span="24" class="ct">
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;font-weight:bold;margin-bottom: 10px">
            <el-col :span="10" style="padding-left: 0">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                二级域名
            </el-col>
            <el-col :span="14" style="text-align: right;padding: 0">
                <el-button type="primary"  @click="add_history_href" size="mini" v-if="is_show">添加二级域名</el-button>
                <el-button type="primary"  @click="addhref" size="mini">申请二级域名</el-button>
            </el-col>
        </el-col>
        <el-col :span="24" class="ym_list" style="padding: 0">
            <el-col :span="24" class="header" style="padding: 0">
                <div style="display: flex;">
                    <div class="head">申请时间</div>
                    <div class="head">二级域名</div>
                    <div class="head" style="text-align: center">审核进度</div>
                    <div class="head" style="text-align: center">状态</div>
                    <div class="head" style="text-align: center">历史</div>
                </div>
            </el-col>
            <el-col :span="24" style="padding: 0">
                <div style="display: flex" v-for="(data,index) in list"      :key="index">
                    <div class="body_tr">
                        {{data.ctime | ctimeData}}
                    </div>
                    <div class="body_tr">
                         <span v-if="data.true_url">
                            <a :href="'//'+data.true_url" target="_blank">{{data.true_url}}</a>
                        </span>
                        <span v-else>
                            未解析
                        </span>
                    </div>
                    <div class="body_tr" style="text-align: center">
                        <span style="color: #41800C" v-if="data.audit==1 && data.audit_count == 1">
                            一审已通过
                        </span>
                        <span v-if="data.audit==0 && data.audit_count == 1">
                            一审未审核
                        </span>
                        <span style="color: red" v-if="data.audit==2 && data.audit_count == 1">
                            一审驳回
                        </span>
                        <span style="color: #41800C" v-if="data.audit==1 && data.audit_count == 2 && data.is_ultimate_shenhe == 1">
                            审核通过
                        </span>
                        <span v-if="data.audit==0 && data.audit_count == 2">
                             二审未审核
                        </span>
                        <span style="color: red" v-if="data.audit==2 && data.audit_count == 2">
                             二审驳回
                        </span>
                    </div>
                    <div class="body_tr" style="text-align: center">
                        <span v-if="data.status == 1" type="primary"  style="padding: 5px 15px;width: auto;cursor: pointer;color: blue"  @click="jieshu(data)" >结束</span>
                        <span v-if="data.status == 0" style="color: red">已结束</span>
                    </div>
                    <div class="body_tr" style="text-align: center">
                        <el-popover
                                placement="right"
                                width="400"
                                trigger="click">
                            <el-col :span="24"   v-loading="listLoading">
                                <el-col :span="24" style="padding-left: 20px;padding-top: 20px" v-if="shenheVal.length >0">
                                    <el-col :span="24" class="shenhe_note" v-for="(data,index) in shenheVal"  :key="index">
                                        <div class="top_icon"></div>
                                        <div class="box" :class="{box_no:data.type == 2}">
                                            <div class="header" style=" color:rgb(163, 165, 167);">
                        <span class="name">
                            {{data.users0.name}}
                        </span>
                                                <span class="date">
                           {{data.catated_at | cur}}
                        </span>
                                            </div>
                                            <div class="note">
                                                <div class="left_icon">

                                                    <img src="../../styles/images/dui.png" alt="" style="width: 18px;display: inline-block;vertical-align: middle;"  v-if="data.type != 2">
                                                    <img src="../../styles/images/cuo.png" alt="" style="width: 18px;display: inline-block;vertical-align: middle;"  v-if="data.type == 2">

                                                </div>
                                                <div class="right_note">
                                                    {{data.note | note}}
                                                </div>
                                            </div>
                                        </div>
                                    </el-col >
                                </el-col>
                                <el-col :span="24" v-else>
                                    <span>暂无记录</span>
                                </el-col>
                            </el-col>

                            <span slot="reference" @click="look_shenhe(data.id)" style="cursor: pointer">查看</span>
                        </el-popover>
                    </div>
                </div>
            </el-col>
        </el-col>
        <!--弹窗 转出-->
        <el-dialog title="申请二级域名" :visible.sync="addhttp"  @close="addhttp=false"  :close-on-click-modal="false" class="tan_shiftTo_yuming" >
            <div>
                <div slot="reference">
                    <div>
                        开户域名 : {{promote_url}}
                    </div>
                    <div>
                        开户性质 : {{xingzhi}}
                    </div>
                    <div  class="checkbox" v-for="(data,key) in list_type_all"  :key="key">
                        <p style="width: 70px;display: inline-block;vertical-align: top">
                            {{data.parent_name}}:
                        </p>
                        <p style="width: 360px;display: inline-block">
                            <el-checkbox-group v-model="data['type'+key]" size="mini" @change="add_type">
                                <el-checkbox :label="data.name" v-for="(data,key) in data.list" :key="key"></el-checkbox>
                            </el-checkbox-group>
                        </p>
                    </div>
                    <div style="margin: 4px 0">解析说明
                        <span style="font-size: 12px;color: #2A5EE8;">  (注 : 如果有多个二级域清单条多次申请)</span>
                    </div>
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 4}"
                            placeholder="建议解析格式：产品名；前缀；主域名；投放方式；客户IP地址；"
                            v-model="note">
                    </el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
						<el-button type="primary" :loading="loadingBut" @click="pull_xh" >确 定</el-button>
                        <el-button  @click="addhttp = false">取 消</el-button>
			</span>
        </el-dialog>
        <el-dialog title="添加二级域名" :visible.sync="add_history_tan"  @close="add_history_tan=false"  :close-on-click-modal="false" class="tan_shiftTo_yuming" >
           <el-row>
               <el-col :span="24">
                   <el-table
                           v-loading="listLoading_yuming"
                           border
                           :data="yuming_list"
                           height="300"
                           style="width: 100%">
                       <el-table-column
                               width="50"
                               label="选择">
                           <template slot-scope="scope">
                               <div>
                                   <input :key="scope.$index" @click="changeRadio(scope.row)" type="radio" name="item">
                               </div>
                           </template>
                       </el-table-column>
                       <el-table-column
                               label="域名">
                           <template slot-scope="scope">
                               <div>
                                   {{scope.row.true_url}}
                               </div>
                           </template>
                       </el-table-column>
                       <el-table-column
                               label="ip">
                           <template slot-scope="scope">
                               <div>
                                   {{scope.row.ip}}
                               </div>
                           </template>
                       </el-table-column>
                   </el-table>

               </el-col>
               <el-col :span="24">
                   <div style="text-align: center;margin-top: 10px">
                       <el-button type="primary" @click="change_pull_yuming" size="small">确定</el-button>
                       <el-button @click="add_history_tan=false"  size="small">取消</el-button>
                   </div>
               </el-col>
           </el-row>
        </el-dialog>
    </el-col>
</template>
<script>

    import { mapGetters } from 'vuex';
    import { add_jiexi_url,updemainstatus,upaccount_tags,account_tags_list,account_name_for_doman_list,manual_add_domain} from '@/api/meitiaccount';
    import { audit_history} from '@/api/contract';
    import moment from "moment"
    export default {
        data() {
            return {
                addhttp:false,
                note:'',
                accountId:'',
                list:[],
                promote_url:'',
                xingzhi:'',
                loadingBut:false,
                add_jiexi_url(){
                    add_jiexi_url({
                        account_id:this.accountId,
                        note:[this.note],
                        submitusers:this.user.id,
                        audit:	1,
                        audit_count: 1
                    }).then(response => {
                        if(response.code == 200){
                            this.loadingBut = false;
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.addhttp = false;
                            this.$emit('yuming_click');
                        }else{
                            this.loadingBut = false;
                            this.$message.error('提交失败');
                        }
                    }).catch(() => {
                        this.loadingBut = false;
                        this.$message.error('提交失败');
                    });
                },
//审核历史
                listLoading:true,
                shenheVal:[],
                routeId:'',
                audit_history:function(){
                    audit_history({
                        id:this.routeId,
                        gongneng:'yuming',
                    }).then(response => {
                        this.listLoading = false;
                        this.shenheVal = response;
                    }).catch(() => {
                        this.listLoading = false;
                    });
                },
                updemainstatus(val){
                    updemainstatus({
                        id:val,
                        status:0,
                    }).then(() => {
                        this.$emit('yuming_click');
                    }).catch(() => {
                        this.$message.error('提交失败');
                    });
                },
// 弹窗
                tags:[],
                tagsTitle:'',
                productCheckList:[
                    {
                    name:'生活工具类',
                },{
                    name:'交友类',
                },{
                    name:'读书类',
                },{
                    name:'游戏类',
                },{
                    name:'直播类',
                },{
                    name:'教育类',
                },{
                    name:'视频类',
                },{
                    name:'电商类',
                },{
                    name:'资讯类',
                },{
                    name:'金融类',
                }],
                pageCheckList:[
                    {
                    name:'下载',
                },{
                    name:'注册',
                },{
                    name:'咨询',
                },{
                    name:'整站推广',
                },{
                    name:'微信加粉',
                },{
                    name:'二类电商',
                },{
                    name:' 游戏（纯玩）',
                }],
                upaccount_tags(){
                    upaccount_tags({
                        id:this.accountId,
                        tags:this.tagsTitle,
                    }).then(response => {
                        if(response.code == 200){
                            this.add_jiexi_url()
                        }else{
                            this.$message.error('提交失败');
                        }
                    }).catch(() => {
                        this.$message.error('提交失败');
                    });
                },
                list_type_all:[],
                account_tags_list(){
                    account_tags_list({
                    }).then(response => {
                        response.map(function (val,key) {
                            val['type'+key] = [];
                        });
                        this.list_type_all = response;

                    }).catch(() => {
                    });
                },
//弹窗新增域名
                listLoading_yuming:false,
                is_show:false,
                add_history_tan:false,
                radio:'',
                is_yuming_data:{},
                yuming_list:[],
                select_yuming:{},
                account_name_for_doman_list(){
                    this.listLoading_yuming = true;
                    account_name_for_doman_list({
                        account_name:this.is_yuming_data.a_users,
                        advertiser:this.is_yuming_data.avid,
                    }).then(response => {
                        this.yuming_list = response.data
                        this.listLoading_yuming = false;
                    }).catch(() => {
                        this.$message.error('提交失败');
                        this.listLoading_yuming = false;
                    });
                },
                //添加账户
                manual_add_domain(data){
                    this.add_history_tan = false;
                    manual_add_domain(data).then(response => {
                        if(response.code == '200'){
                            this.$message({
                                message: '添加成功！',
                                type: 'success'
                            });
                            this.$emit('yuming_click');
                        }
                    }).catch(() => {
                        this.$message.error('提交失败');
                    });
                },
            }
        },
        mounted(){

        },

      methods:{
// 添加二级域名
//  二级域名条件
          add_type(){
              this.tags = [...this.list_type_all[0].type0,...this.list_type_all[1].type1];
              this.tagsTitle = this.tags.join(',')
          },
          //添加二级域
          addhref(){
              this.addhttp = true;
              this.account_tags_list()
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
                  this.loadingBut = true;
                  this.upaccount_tags();
              }
          },

          jieshu(val){
              this.$confirm(' 是否结束?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  this.updemainstatus(val.id);
              }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消'
                  });
              });

          },
//审核历史
          look_shenhe(val){
              this.listLoading = true;
              this.shenheVal = [];
            this.routeId = val;
            this.audit_history();
          },
//新增已有二级域
          add_history_href(){
              this.yuming_list = [];
              this.add_history_tan = true;
              this.account_name_for_doman_list();
          },
          changeRadio(val){
              this.select_yuming = val;
          },
          change_pull_yuming(){
            if(Object.keys(this.select_yuming).length>0){
                let data =  this.select_yuming;
                data['account_id'] = this.accountId;
                this.$confirm('总账户是否添加该域名?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.manual_add_domain(data)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }else{
                this.$message({
                    message: '请选择要是用的域名！',
                    type: 'warning'
                });
            }
          },
      },
        computed: {
            ...mapGetters([
                'user',
            ]),
        },
        filters: {
            cur: function (value) {
                return moment(value*1000).format('YYYY-MM-DD HH:mm:ss')
            },
             ctimeData(val){

                    var time=new Date(parseInt(val) * 1000);
                    return   moment(time).format('YYYY-MM-DD')
                },
        },
        watch:{
            yuming(val){
                this.is_show = true;
                this.is_yuming_data = val.data;
                this.accountId = val.newId;
                this.list = val.yuminglist;
                this.promote_url = val.data.promote_url;
                this.xingzhi = val.data.xingzhi;
            },
        },
        props: ['yuming']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .ct{
        .ym_list {
            padding: 0;
            border-bottom: none;
                .head,.body_tr {
                    font-size: 12px;
                    width: 33.3333%;
                    padding: 0 3px!important;
                    border: 1px solid rgb(230, 230, 230);
                    box-sizing: border-box;
                    height:25px;
                    line-height: 25px;
                    overflow: hidden;
                }
        }
        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid #e6e6e6;
        }
        .tan_shiftTo_yuming {
            .el-dialog {
                width:480px;
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
                    .checkbox {
                        margin-bottom: 15px;
                        .el-checkbox {
                         margin-left: 0;
                            margin-right: 10px;
                        }
                    }
                }
                .dialog-footer {
                    text-align: center;

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
    .shenhe_note{
        width:100%;
        height:80px;
        border-left:1px solid #d9d9d9;
        position: relative;
        .top_icon {
            width:10px;
            height:10px;
            border-radius: 50%;
            border:2px solid #0b87e7;
            position: absolute;
            top:-5px;
            left:-5px;
        }
        .bottom_icon {
            width:10px;
            height:10px;
            border-radius: 50%;
            border:2px solid #0b87e7;
            position: absolute;
            bottom:-5px;
            left:-5px;
        }
        .box {
            width:100%;
            height:70px;
            position: absolute;
            top:-20px;
            left:10px;
            overflow: hidden;
            border:1px solid #c4dfb4;
            border-radius: 5px;
            background: #f6ffee;
            .header {
                width:100%;
                height:25px;
                font-size: 12px;
                padding: 0 5px;
                .name{
                    display: inline-block;
                    height:100%;
                    line-height: 25px;
                    vertical-align: top;
                    float: left;
                }
                .date {
                    display: inline-block;
                    height:100%;
                    line-height: 25px;
                    vertical-align: top;
                    float: right;
                }
            }
            .note{
                width:100%;
                height:40px;
                .left_icon{
                    display: inline-block;
                    width:14%;
                    height:100%;
                    text-align: center;
                    line-height: 10px;
                    vertical-align: top;
                }
                .right_note {
                    display: inline-block;
                    width:82%;
                    height:100%;
                    vertical-align: top;
                    font-size: 12px;
                    -webkit-line-clamp: 3;
                    line-clamp: 3;
                    line-height: 13px;
                    -webkit-box-orient: vertical;
                    -o-text-overflow: ellipsis;
                    text-overflow: ellipsis;
                    word-break: break-word;
                    overflow: hidden;
                }
            }
        }
        .box_no{
            border: 1px solid #e0aeb7!important;
            background: #fff1ea!important;
        }
    }
    .shenhe_note:last-child{
        border-left:1px dashed #d9d9d9!important;
    }
</style>
