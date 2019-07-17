<template>
    <el-row style="" class="kehuxinxiinfor"  v-loading="loading">
        <el-col :span="24">
                <el-col :lg="15" class="box_left" style="padding-right: 20px">
                    <!--基本信息横条-->
                    <el-col :span="24" style="height: 30px;line-height: 30px;border-bottom: 1px solid #e6e6e6;color: #222f3b;font-size: 12px;padding: 0">
                        <el-col :span="16" style="padding-left: 0">
                            <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                            客户基本信息
                        </el-col>
                        <el-col :span="8" style="text-align: right;padding: 0">
                            <el-button size="mini" type="primary" v-if="customer==true" @click="customer=false">编辑</el-button>
                            <el-button size="mini" type="primary" v-if="customer==false" @click="jiben">保存</el-button>
                            <el-button size="mini" v-if="customer==false" @click="customer=true">取消</el-button>
                        </el-col>
                    </el-col>
                    <el-col :span="24" style="margin-top: 10px;">
                        <el-col :span="24">
                            <el-col :span="24" class="cusmessage" style="color: #737373">
                               <span style="width: 100px;display: inline-block">
                                    {{ $t('titles.customer') }}:
                               </span>
                                    <span v-if="customer==true">{{account.advertiser}}</span>
                                    <el-input size="mini" style="width: 200px;display: inline-block" v-model="account1.advertiser" placeholder="请输入内容" v-if="customer==false"></el-input>
                            </el-col>
                            <el-col :span="24" class="cusmessage" style="color: #737373">
                                  <span style="width: 100px;display: inline-block">
                                {{ $t('titles.advertiser') }}:
                                  </span>
                                    <span v-if="customer==true">{{account.true_advertiser}}</span>

                                    <el-input  size="mini" style="width: 200px;display: inline-block" v-model="account1.true_advertiser" placeholder="请输入内容" v-if="customer==false"></el-input>

                            </el-col>
                            <el-col :span="24" class="cusmessage" style="color: #737373">
                                  <span style="width: 100px;display: inline-block">
                                简称:
                                  </span>
                                    <span v-if="customer==true">{{account.appname}}</span>
                                    <el-input  size="mini" style="width: 200px;display: inline-block" v-model="account1.appname" placeholder="请输入内容" v-if="customer==false"></el-input>

                            </el-col>

                            <el-col :span="24" class="cusmessage" style="color: #737373">
                                  <span style="width: 100px;display: inline-block">
                                公司官网:
                                  </span>
                                    <a :href="account.website" target="view_window" > <span v-if="customer==true" style="color:rgb(84, 173, 255);">{{account.website}}</span></a>

                                    <el-input  size="mini" style="width: 200px;display: inline-block" v-model="account1.website" placeholder="请输入内容" v-if="customer==false"></el-input>

                            </el-col>
                            <el-col :span="24" class="cusmessage" style="color: #737373">
                                  <span style="width: 100px;display: inline-block">
                                公司地址:
                                  </span>
                                    <span v-if="customer==true">{{account.site}}</span>
                                    <el-input  size="mini" style="width: 200px;display: inline-block" v-model="account1.site" placeholder="请输入内容" v-if="customer==false"></el-input>

                            </el-col>
                            <el-col :span="24" class="cusmessage" style="color: #737373">
                                  <span style="width: 100px;display: inline-block">
                                客户类型:
                                  </span>
                                    <span v-if="customer==true">{{account.type | filterFun}}</span>
                                    <el-select   style="width: 200px;display: inline-block" v-model="kehutype" size="mini" placeholder="请选择" v-if="customer==false">
                                        <el-option
                                                v-for="(item,index) in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>

                            </el-col>
                            <el-col :span="24" class="cusmessage" style="color: #737373">
                                  <span style="width: 100px;display: inline-block">
                                所属行业:
                                  </span>
                                    <span v-if="customer==true">{{account.industry}}</span>
                                    <el-input  size="mini" style="width: 200px;display: inline-block" v-model="account1.industry" placeholder="请输入内容" v-if="customer==false"></el-input>

                            </el-col>
                            <el-col :span="24" class="cusmessage" style="color: #737373">
                                  <span style="width: 100px;display: inline-block">
                                客户所属省份:
                                  </span>
                                    <span v-if="customer==true">{{account.city}}</span>
                                    <el-input  size="mini" style="width: 200px;display: inline-block" v-model="account1.city" placeholder="请输入内容" v-if="customer==false"></el-input>
                            </el-col>
                            <el-col :span="24" class="cusmessage" style="color: #737373;border-bottom: none">
                                  <span style="width: 100px;display: inline-block">
                                邮寄地址:
                                  </span>
                                    <span v-if="customer==true">{{account.post_site}}</span>
                                    <el-input  size="mini" style="width: 200px;display: inline-block" v-model="account1.post_site" placeholder="请输入内容" v-if="customer==false"></el-input>
                            </el-col>
                        </el-col>

                    </el-col>
                    <!--基本信息横条结束-->
                    <el-col :span="24" style="padding: 0" v-if="roles.indexOf('/api/contact/contact-list')>-1">
                        <!--联系人信息-->
                        <el-col :span="24" style="padding-right: 0">
                            <el-col :span="24" style="height: 30px;line-height: 30px;border-bottom: 1px solid #e6e6e6;color: #222f3b;font-size: 12px;padding: 0">
                                <el-col :span="14" style="padding-left: 0">
                                    <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                                    联系人信息
                                 <span  v-if="!linkman">
                                    （{{contact.length}}）
                                </span>
                                </el-col>
                                <el-col :span="10" v-if="!linkman"  style="text-align: right;padding: 0">
                                    <el-button size="mini" type="primary" v-if="setcontact==true" @click="setcontact=false" style="width: 81px;">编辑/添加</el-button>
                                    <el-button size="mini" type="primary" v-if="setcontact==false" @click="lianxiren">保存</el-button>
                                    <el-button size="mini" v-if="setcontact==false" @click="setcontact=true">取消</el-button>
                                </el-col>
                                <el-col :span="10" style="text-align: right" v-if="linkman" >
                                    <el-button size="mini" type="primary" @click="show_linkman" style="width: 81px;">点击查看</el-button>

                                </el-col>
                            </el-col>
                            <el-col :span="24" v-if="!linkman"  class="plin"     v-loading="loading_linkman">
                                <template v-for="(item,index) in contact">
                                    <message :setcontact="setcontact" :contact="index" @del="del" :key="index" :item="item" :item1="item" @newcontact="newcontact"></message>
                                </template>
                                <el-col :span="24" v-if="setcontact==false">
                                    <span style="display: inline-block;width: 50px;height: 30px;line-height: 30px;text-align: right"></span>
                                    <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                                      <el-button size="mini" type="primary"  style="cursor: pointer" @click="xinnew" plain>+新建联系人</el-button>
                                   </span>
                                </el-col>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-col>
                <el-col :lg="9" style="padding-left: 20px" class="box_right">
                    <!--开票信息-->
                    <el-col :span="24" style="padding-left: 0">
                        <el-col :span="24" style="height: 30px;line-height: 30px;border-bottom: 1px solid #e6e6e6;color: #222f3b;font-size: 12px;padding: 0">
                            <el-col :span="14" style="padding-left: 0">
                                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                                开票信息
                            </el-col>

                            <el-col :span="10" style="text-align: right;padding: 0">
                                <template v-if="account.shui ==''||  add_kp == false">


                                    <el-button size="mini" type="primary" v-if="Billing==true" @click="Billing=false" style="width: 81px;">编辑</el-button>
                                </template>
                                <el-button size="mini" type="primary" v-if="Billing==false" @click="kaipiao">保存</el-button>
                                <el-button size="mini" v-if="Billing==false" @click="Billing=true">取消</el-button>
                            </el-col>


                        </el-col>
                        <el-col :span="24" style="font-size: 12px;color: #737373">
                            <el-col :span="24">
                                <span style="display: inline-block;width: 100px;height: 30px;line-height: 30px;font-size: 12px;color: #737373">纳税人识别号</span>

                                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                                           <span v-if="Billing==true">{{account.tax_identification }}</span>
                                           <el-input size="mini" v-model="account1.tax_identification" placeholder="请输入内容" v-if="Billing==false"></el-input>
                                       </span>
                            </el-col>
                            <el-col :span="24">
                                <span style="display: inline-block;width: 100px;height: 30px;line-height: 30px;font-size: 12px;color: #737373">开票地址</span>
                                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                                           <span v-if="Billing==true">{{account.ticket_address }}</span>
                                           <el-input size="mini" v-model="account1.ticket_address" placeholder="请输入内容" v-if="Billing==false"></el-input>
                                       </span>
                            </el-col>
                            <el-col :span="24">
                                <span style="display: inline-block;width: 100px;height: 30px;line-height: 30px;font-size: 12px;color: #737373">开户行</span>
                                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                                           <span v-if="Billing==true">{{account.open_account }}</span>
                                           <el-input size="mini" v-model="account1.open_account" placeholder="请输入内容" v-if="Billing==false"></el-input>
                                       </span>
                            </el-col>
                            <el-col :span="24">
                                <span style="display: inline-block;width: 100px;height: 30px;line-height: 30px;font-size: 12px;color: #737373">账号</span>
                                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                                           <span v-if="Billing==true">{{account.account }}</span>
                                           <el-input size="mini" v-model="account1.account" placeholder="请输入内容" v-if="Billing==false"></el-input>
                                       </span>
                            </el-col>
                            <el-col :span="24">
                                <span style="display: inline-block;width: 100px;height: 30px;line-height: 30px;">电话</span>
                                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                                           <span v-if="Billing==true">{{account.kp_tel }}</span>
                                           <el-input size="mini" v-model="account1.kp_tel" placeholder="请输入内容" v-if="Billing==false"></el-input>
                                       </span>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-col>
        </el-col>
    </el-row>
</template>

<script>
    /*eslint-disable */
    import { changecustomers ,apicustomers,contacts,addcontacts,custmobercontact,contact_list} from '@/api/kehu';
    import message from '@/components/cusmessage/message';
    import shenheInfor from '@/components/shenhe/index';
    import {mapGetters} from 'vuex';
    let all=[];
    export default {
        components: {
          message,
          shenheInfor,
        },
        data() {
            return {
                loading:true,
                options: [{
                    value: '1',
                    label: '直接客户'
                }, {
                    value: '2',
                    label: '渠道客户'
                }, {
                    value: '3',
                    label: '媒介客户'
                }],
                linkman:true,
                kehutype: '',
                star:3,
                id: '',
                data:{},
                account:{},
                account1:{},
                input:'',
                Billing:true,
                add_kp:true,
                setcontact:true,
                contact:[],
                customer:true,
                apicustomers(){
                    this.loading = true;
                    apicustomers(this.accounts.id).then(response => {
                        this.loading = false;
                        this.account=response;
                        this.account1=response;
                        response.tax_identification = response.tax_identification.replace(/(^\s*)|(\s*$)/g, "");
                        if(/^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(response.tax_identification)){
                            this.account.shui = "true";
                        }else{
                            this.account.shui = "";
                        }
                        this.kehutype=this.account1.type.toString();

                        this.data=response;
                        this.id=response;

                    }).catch(error => {

                    });
                },
            // 后期联系人
                loading_linkman:true,
                contact_list(){
                    this.loading_linkman = true;
                    contact_list({
                        id:this.accounts.id
                    }).then(response => {
                        this.contact=response.data;
                        this.loading_linkman = false;
                    }).catch(error => {

                    });
                },
            }
        },
        computed: {
            ...mapGetters([
                'user',
                'accounts',
                'roles'
            ])
        },
        filters: {
            filterFun: function (value) {
                if(value==1){
                    return '直接客户'
                }else if(value==2){
                    return '渠道客户'
                }else if(value==3){
                    return '媒介客户'
                }
            },

            filfun(val){
                if(val == ''){
                    return '--'
                }else{
                    return val
                }
            },
            filfunName(val){
                if(val ){
                    return val.name
                }else{
                    return '--'
                }
            },
            fenpeiData(val){
                if(val){
                    return val
                }else{
                    return '暂无建议'
                }
            },
        },
        methods: {
            kehuClick(){
                let _this = this;
                this.roles.filter(function(item){
                    if(item == "/api/customer/upcustomerinfo"){
                        _this.Billing = true;
                        _this.add_kp = false;
                    }
                })
                this.apicustomers();
            },
          //  显示联系人
            show_linkman(){
                this.linkman = false;
                this.contact_list();
            },
          creattel(){
            this.setcontact=true
            all=[];
            let that=this;
            for(let i=0;i<this.contact.length;i++){
              var a = new Promise(function (resolve, reject) {
                if(that.contact[i].id){
                  contacts({id:that.contact[i].id}).then(response => {
                    resolve(response);
                  }).catch(error => {
                    reject();
                  });
                }
                that.contact[i].customer_id=that.accounts.id;
                addcontacts(that.contact[i]).then(response => {
                  resolve(response);
                }).catch(error => {
                  reject();
                });
              });
              all.push(a);
            }
            var p = Promise.all(all);
            p.then(function (val) {
                that.$message({
                    type: 'success',
                    message: '创建成功'
                });
                that.contact_list()
            });
          },
            //创建联系人
            lianxiren(val){
                let a=0;
                let that=this;
                  for(let i=0;i<this.contact.length;i++){
                    if(this.contact[i].name==''){
                      this.$message({
                        type: 'info',
                        message: '联系人不准为空'
                      });
                      a=1;
                      break;
                    }else if(this.contact[i].email==''){
                      this.$message({
                        type: 'info',
                        message: '邮箱不准为空'
                      });
                      a=1;
                      break;
                    }else if(this.contact[i].position==''){
                      this.$message({
                        type: 'info',
                        message: '职位不准为空'
                      });
                      a=1;
                      break;
                    }else if(this.contact[i].qq==''){
                      this.$message({
                        type: 'info',
                        message: 'QQ不准为空'
                      });
                      a=1;
                      break;
                    }else if(this.contact[i].tel==''){
                      this.$message({
                        type: 'info',
                        message: '电话不准为空'
                      });
                      a=1;
                      break;
                    }else if(this.contact[i].weixin==''){
                      this.$message({
                        type: 'info',
                        message: '微信不准为空'
                      });
                      a=1;
                      break;
                    }
                  }
                    if(a==0){
                      this.creattel()
                    }

            },
            newcontact(val){
                this.contact[val[1]]=val[0]
            },
            //更改基本信息
            jiben(){
                this.customer=true;
                this.account1.type=parseInt(this.kehutype);
                changecustomers(this.accounts.id,this.account1).then(response => {
                    this.apicustomers();
                }).catch(error => {

                });
            },
            //更改开票信息
            kaipiao(){
                this.Billing=true
                changecustomers(this.accounts.id,this.account1).then(response => {
                    this.apicustomers();
                }).catch(error => {

                });
            },
            //跳转分配商务销售
            fenpei(handleCommand){

                this.$router.push({ name: 'fenpeishangwu' , query: { id: handleCommand}});
            },

            //删除联系人
            del(val){
                this.contact.splice(val[0], 1);
                if(val[1]){
                    contacts({id:val[1]}).then(response => {

                    }).catch(error => {

                    });
                }


            },
            /*新建联系人*/
            xinnew(){
                this.contact.push({
                    email:'',
                    name:'',
                    position:'',
                    qq:'',
                    tel:'',
                    weixin:'',
                })
            }
        },


    }
</script>

<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    .kehuxinxiinfor {
        .cusmessage {
            height: 35px;
            font-size: 12px;
            line-height: 35px;
            padding-left: 17px;
        }
    }

</style>
