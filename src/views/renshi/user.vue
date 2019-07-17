<template>
       <el-row style="" class="userlist">
           <p class="crm_title">
               <i class="crm_line"></i>
                   用户列表
           </p>
           <el-col :span="24" style="margin-top:10px">
                   <el-col :span="10" style="padding: 5px">
                       <el-col :span="24" style="border: 1px solid #999;padding: 5px;height: 800px;">
                           <el-button type="primary" style="margin-bottom: 15px;padding: 0;" @click="xintian">新添部门</el-button>
                           <!--@click="xintian" -->
                           <el-tree
                                   :data="data2"
                                   class="user_tree"
                                   @node-click="handleNodeClick"
                                   :props="defaultProps"
                                   node-key="id"
                                   :expand-on-click-node="false"
                                   :render-content="renderContent"
                           >
                           </el-tree>
                       </el-col>
                   </el-col>
                   <el-col :span="14" style="padding: 5px">
                       <el-col :span="24" style="border: 1px solid #999;height: 800px;">
                           <el-col :span="24" style="padding: 5px;">
                               <el-col :span="8" style="font-size: 18px;color: #54adff">
                                   {{name}}：
                               </el-col>
                               <el-col :span="16" style="text-align: right;display: inline-block">
                                   <el-button type="primary" style="margin-left: 15px;" @click="addUsersToDep">分配用户</el-button>
                                   <el-button type="primary" style="margin-left: 15px;" @click="xinjian">新建用户</el-button>
                               </el-col>
                           </el-col>
                           <el-col :span="24" style="padding: 5px">
                           <el-input
                                   placeholder="请输入姓名/部门"
                                   icon="search"
                                   class="search_text"
                                   v-model="nameInput">
                           </el-input>
                           </el-col>
                           <el-col :span="24" style="margin-top: 15px;">
                               <el-table
                                       :has-action-col="false"
                                       v-loading="listLoading"
                                       :data="addDatatable"
                                       class="vue-table"
                                       border
                                       height="650"
                                       style="width: 100%">
                                   <el-table-column
                                           align="center"
                                           prop="name"
                                           label="姓名">
                                   </el-table-column>
                                   <el-table-column
                                           align="center"
                                           prop="username"
                                           label="用户名">
                                   </el-table-column>
                                   <el-table-column
                                           align="center"
                                           prop="bumen"
                                           label="部门">
                                   </el-table-column>
                                   <el-table-column
                                           align="center"
                                           label="职位">
                                       <template slot-scope="scope">
                                           <template v-if="scope.row.item_name">
                                               <span v-for="(item,index) in scope.row.roles" :key="index" style="margin: 0 5px">
                                                   {{item.item_name}}
                                               </span>
                                           </template>
                                           <template v-else>
                                               --
                                           </template>
                                       </template>
                                   </el-table-column>
                                   <el-table-column
                                           prop="nianjia"
                                           align="center"
                                           width="120"
                                           label="年假剩余天数">
                                   </el-table-column>
                                   <el-table-column
                                           label="操作"
                                           header-align="center"
                                           width="100"
                                           align="center">
                                       <template slot-scope="scope">
                                           <div style="text-align: center">
                                               <el-button type="text" @click="gai(scope.row)">修改</el-button>
                                               <el-button type="text" @click="del(scope.row)">删除</el-button>
                                           </div>
                                       </template>
                                   </el-table-column>
                               </el-table>
                               <div class="block">
                                   <el-pagination
                                           @size-change="handleSizeAccountChange"
                                           @current-change="handleCurrentAccountChange"
                                           :current-page="pageAccountIndex"
                                           :page-sizes="[ 20, 30,40]"
                                           :page-size="pageAccountSize"
                                           layout="total, sizes, prev, pager, next, jumper"
                                           :total="kehuTableAccountLength"
                                           style='text-align: right;'>
                                   </el-pagination>
                               </div>
                           </el-col>
                       </el-col>

                   </el-col>
           </el-col>
           <user-list :userDialogVisible = 'userDialogVisible' @userId="userId"></user-list>
           <el-dialog title="新增部门" :visible.sync="addFormVisible1" @close="close"  class="tanBox" :close-on-click-modal="false" >
               <el-form :model="form">
                   <el-form-item label="请输入部门" :label-width="formLabelWidth">
                       <el-input v-model="form.name" auto-complete="off"></el-input>
                   </el-form-item>
                   <el-form-item label="请选择角色" :label-width="formLabelWidth">

                       <el-select v-model="form.region"  placeholder="请选择">
                           <el-option
                                   v-for="(item,index) in userOptions"
                                   :key="item"
                                   :label="item"
                                   :value="item">
                           </el-option>
                       </el-select>
                   </el-form-item>
               </el-form>
               <div slot="footer" >
                   <el-button @click="dialogFormVisible = false">取 消</el-button>
                   <el-button type="primary" @click="pull_account">确 定</el-button>
               </div>
           </el-dialog>
           <!--操作-->
           <el-dialog title="操作" :visible.sync="userModify"  @close="close"  :close-on-click-modal="false" class="tan_Modify" >
               <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                   <el-form-item label="名称">
                       <el-input v-model="formLabelAlign.name" style="width: 200px;"></el-input>
                   </el-form-item>
                   <el-form-item label="角色">
                       <el-select
                               v-model="formLabelAlign.role"
                               multiple
                               filterable
                               allow-create
                               placeholder="选择角色">
                           <el-option
                                   v-for="(item,index) in roleOptions"
                                   :key="item.name"
                                   :label="item.name"
                                   :value="item.name">
                           </el-option>
                       </el-select>
                   </el-form-item>
                   <el-form-item label="部门">
                       <el-select v-model="formLabelAlign.bumen"  @change="bumen_change" filterable placeholder="请选择">
                           <el-option
                                   v-for="(item,index) in bumen_options"
                                   :key="item.name"
                                   :label="item.name"
                                   :value="item.id">
                           </el-option>
                       </el-select>
                   </el-form-item>
                   <el-form-item label="转正" v-if="show_Infor">
                       <el-select v-model="formLabelAlign.istrue"  @change="bumen_change" filterable placeholder="请选择">
                           <el-option
                                   v-for="(item,index) in istrue_options"
                                   :key="item.name"
                                   :label="item.name"
                                   :value="item.id">
                           </el-option>
                       </el-select>
                   </el-form-item>·
               </el-form>
               <span slot="footer" class="dialog-footer">
						<el-button type="primary"  @click="pull_yq" >确 定</el-button>
                        <el-button @click="userModify = false" >取 消</el-button>
			</span>
           </el-dialog>
       </el-row>
</template>

<script>
    /*eslint-disable */
    import { bumenlist,bumenusers,delete_bumen,add_bumen,users_to_bumen,get_roles,usersinfo,upusersinfo,user_delete,up_bumen} from '@/api/renshi';
    import userList from './renshi/userList'
    import {mapGetters} from 'vuex';
    let name = [];
    export default {
      data() {
        return {
            basic_role:"",
        bumenInfor:[],
          //分页
        pageAccountIndex: 1,
        pageAccountSize:20,
        kehuTableAccountLength:'',
          input2: '',
          listLoading:false,
          name:'',
            nameInput:'',
          tableData3: [],
          data2: [],
          defaultProps: {
            children: 'child',
            label: 'name'
          },
            show_Infor:true,
            tableData:[],
          userDialogVisible: false,
          dialogTableVisible:false,
          users_to_bumen:function(data){
                users_to_bumen(data).then(response => {
                    if(response.code == 200){
                        this.$message({
                            showClose: true,
                            message: '分配成功',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: '提交失败！',
                            type: 'warning'
                        });
                    }
                }).catch(error => {

                });
            },
            bumenlist(){
                bumenlist().then(response => {
                    this.data2=response;
                    this.handleNodeClick(response[0]);
                    this.bumenInfor = {
                        role:response[0].basic_role,
                        bumen:response[0].id,
                        users:[]
                    };
                }).catch(error => {

                });
            },
          //新增部门
            options:[],
            userOptions:[],
            addFormVisible1: false,
            form: {
                name: '',
                region: '',
            },
            formLabelWidth: '120px',
            //操作修改
            user_id:'',
            bumen_id:'',
            userModify:false,
            labelPosition: 'right',
            roleOptions:'',
            bumen_options:[],
            istrue_options:[
                {
                    name:'是',
                    id:'1'
                },
                {
                    name:'否',
                    id:'0'
                }
            ],
            formLabelAlign: {
                name: '',
                role: [],
                bumen: '',
                istrue:'是'
            },
            user_delete:function(id){
                user_delete({
                    id:id,
                }).then(response => {
                    if(response.code == 200){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }else{
                        this.$message.error('删除失败');
                    }
                    this.handleNodeClick(this.tableData);
                }).catch(error => {

                });
            },
            usersinfo:function(id){
                usersinfo({
                    id:id,
                }).then(response => {
                    this.roleOptions = response.roles;
                    this.formLabelAlign.name = response.info.name;
                }).catch(error => {

                });
            },
            upusersinfo:function(id,search){
                upusersinfo({
                    id:id,
                    search:search
                }).then(response => {
                    if(response.code == 200){
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.userModify = false;
                        this.handleNodeClick(this.tableData);
                    }else{
                        this.$message.error('修改失败');
                    }

                }).catch(error => {

                });
            },
            user_If(data){
                for(let n =0;n<data.length;n++){
                    if(data[n].child){
                        name.push({
                         name:data[n].name,
                            id:data[n].id
                        });
                        this.user_If(data[n].child)
                    }else{
                        name.push({
                            name:data[n].name,
                            id:data[n].id
                        });
                    }
                }
                return name
            },
        }
      },
      computed: {
        ...mapGetters([
          'user',
          'roles'
        ]),
          addDatatable(){
              let tableData = [];
              let _this = this;
              tableData =    _this.tableData3.filter(function (item, i) {
                  if(!item.semname){
                      item.semname = " ";
                  }
                  if(item.name.indexOf(_this.nameInput)>=0  ){
                      return item
                  }
              });
              this.kehuTableAccountLength = tableData.length;
              return tableData.filter((o,i) => i >=(this.pageAccountIndex-1)*this.pageAccountSize&&i<=this.pageAccountIndex*this.pageAccountSize-1);
          }
      },
      methods: {
        del(val){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

            this.user_delete(val.id);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        gai(val){
            name = [];
            this.user_id = val.id;
            this.usersinfo(val.id);
            this.userModify = true;
            if( val.istrue == '1'){
                this.show_Infor = false;
            }else{
                this.show_Infor = true;
            };
            this.userDialogVisible = false;
            this.bumen_options = this.user_If(this.data2);
            this.bumen_id = val.bumenid;
            this.formLabelAlign.bumen = val.bumen;
            this.formLabelAlign.role = [];
            for(var i = 0;i<val.roles.length;i++){
                this.formLabelAlign.role.push(val.roles[i].item_name)
            }
        },
          close(){
            this.addFormVisible1 = false;
            this.userModify = false;
          },
          pull_yq(){
              this.$confirm('是否上传?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  let nameData = "";
                  if(this.formLabelAlign.istrue == "是"){
                      nameData = "1";
                  }else{
                      nameData = this.formLabelAlign.istrue;
                  }
                  let data = {
                      "name":this.formLabelAlign.name,
                      "bumen":this.bumen_id,
                      "role":this.formLabelAlign.role,
                       "istrue":nameData
                  };
                  this.userModify = false;
                  this.upusersinfo( this.user_id,data);

              }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消删除'
                  });
              });

          },
          bumen_change(index){
              this.bumen_id = index;
          },
        xintian(){
            this.get_roles();
            this.addFormVisible1 = true;
        },
        xinjian(){
            this.$router.push({ name: 'NewAccount', query: { bumen: this.bumenInfor.bumen,role:this.name,basic_role:this.basic_role} });
        },
          addUsersToDep(){
            this.userDialogVisible = !this.userDialogVisible;
          },
        append(store, data) {
          this.$prompt('请输入名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPlaceholder:'输入名称'
          }).then(({ value }) => {
            this.$message({
              type: 'info',
              message: '正在添加'
            });
            let lin={
              name:value,
              basic_role:data.basic_role,
              parent_id:data.id
            };
            add_bumen(lin).then(response => {
              if(response.code=='200'){
                store.append({ id: response.data.id, name: value, child: [],basic_role:data.basic_role, parent_id:data.id}, data);
                  this.$message({
                      message: '添加成功',
                      type: 'success'
                  });
              }else{
                this.$message.error('添加失败！');
              }


            }).catch(error => {

            });


          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消添加'
            });
          });

          event.stopPropagation();
          event.preventDefault();
        },
        handleNodeClick(data) {
            this.userDialogVisible = false;
            this.tableData = data;
              this.bumenInfor = {
                  role:data.basic_role,
                  bumen:data.id,
                  users:[]
              };
          this.listLoading=true;
          this.name=data.name;
          this.basic_role = data.basic_role;
          bumenusers(data.id).then(response => {
            this.tableData3=response;
            this.listLoading=false;
          }).catch(error => {

          });
        },
        remove(store, data) {

//            this.$message.error('人员不为空，不能删除');

            delete_bumen(data.id).then(response => {
              if(response.code==200){
                store.remove(data);
                this.$message({
                  type: 'info',
                  message: response.msg
                });
              }else{
                this.$message.error(response.msg);
              }

            }).catch(error => {

            });


          event.stopPropagation();
          event.preventDefault();
        },
        cname(store, data) {
          this.$prompt('请输入名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPlaceholder:'输入名称'
          }).then(({ value }) => {
              this.$message({
                  type: 'info',
                  message: '正在修改'
              });
            let lin={
              name:value,
            };
              up_bumen({
                  id:data.id,
                  data:lin,
              }).then(response => {
                  this.$message({
                      message: '修改成功',
                      type: 'success'
                  });
                  this.bumenlist();
            }).catch(error => {

            });


          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消修改'
            });
          });

          event.stopPropagation();
          event.preventDefault();
        },
        renderContent(h, { node, data, store }) {
          return (
            <span class='yilist' >
                <span>
                <span>{node.label}</span>
                </span>
                <span style="float: right;"  class='addel'>

                <el-button style='width:20px;height:20px;padding:0;margin-left:20px'  on-click={ () => this.append(store, data) }>+</el-button>
                <el-button style='width:20px;height:20px;padding:0;' on-click={ () => this.remove(store, data)}>-</el-button>
                <el-button type="text" on-click={ () => this.cname(store, data)}>修改名称</el-button>
                </span>
            </span>);

        },
        show: function(ev) {
        },
 //分页
          handleSizeAccountChange(val) {
              this.pageAccountSize = val;
          },
          handleCurrentAccountChange(val) {
              this.pageAccountIndex = val;
          },
//组件
          userId(val){
             this.bumenInfor.users = val.userId;
             this.users_to_bumen(this.bumenInfor);
             this.handleNodeClick(this.tableData);
            this.userDialogVisible = false;
          },
 //新增部门
          get_roles(){
              get_roles().then(response => {
                this.userOptions = response;
              }).catch(error => {

              });
          },
          pull_account(){
              let lin={
                  name:this.form.name,
                  basic_role:this.form.region,
                  parent_id:0
              };

              add_bumen(lin).then(response => {
              if(response.code=='200'){
                  this.addFormVisible1 = false;
                   this.bumenlist()

              }else{
                  this.addFormVisible1 = true;
                this.$message.error('添加失败！');
              }
            }).catch(error => {

            });
          },
      },
      watch: {

      },
      mounted(){
        this.bumenlist();

      },
      created() {
        let component = this;
        document.onkeydown = function(e){
          if(e.which == '13'){
            component.show();
          }
        }
      }
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    .userlist {
        .vue-table {
            border: 1px solid #fff !important;
        }

        .el-tree-node__content:hover .addel{
            z-index: 9;
        }
        .yilist {
            position: relative;
            right: 0;
        }
        .user_tree {
            border: none;
            .el-tree-node__content {
                line-height: 36px;
            }
        }
        .addel{
            position: absolute;
            padding: 0px;
            margin: 0px;
            top: 0px;
            right: -160px;
            z-index: -1;
        }
        .el-date-editor.el-input {
            width: 120px;
            .el-input__icon {
                left:-5px;
            }
            .el-input__inner {
                padding: 0px 0px 0 30px;
            }
        }
        .el-select .el-input {
            width: 200px;
        }

        .el-input-group {
            width: 200px;
        }

        .search_text {
            width:150px;
            height:30px;
            input{
                height: 29px !important;
                line-height: 30px!important;
            }
        }

        .el-button--primary {
            /*margin-left: 14px;*/
            font-size: 12px;
            width: 80px;
            height: 30px;
            line-height: 7px;
            color: #fff;
            background-color: #20a0ff;
            border-color: #20a0ff;
        }
        .vue-table{
            .el-button--text{
                font-size: 14px;
                width: 20px;
                height: 20px;
                border-radius: 100%;
                padding: 0;
                color:#54adff;
                text-decoration: underline;
            }
        }
        .el-button--text {
            margin-left: 8px;
            border: none;
            color: #000;
            background: 0 0;
            font-size: 12px;
            padding-left: 0;
            padding-right: 0;
        }
        .tan_Modify {
            .el-dialog {
                width:400px;
                .el-form-item {
                    margin: 10px 0;
                }
            }

        }
    }

</style>
