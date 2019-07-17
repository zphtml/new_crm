<template>
    <el-col>
        <el-dialog title="审核备注" :visible.sync="addFormVisibleReceive2"  @close="addFormVisibleReceive2=false" class="media_shenhe" size="tiny" >
            <div style="margin-bottom: 20px;">
                <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">审核备注</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                    <el-input
                            type="textarea"
                            autosize
                            placeholder="请输入内容"
                            v-model="textarea">
                    </el-input>
                </span>
            </div>
            <div style="text-align: right;padding-bottom: 20px">
                <el-button type="primary" @click="tbn1"  :disabled="disabledPull" style="padding: 10px 15px;height: auto;width: auto">确定</el-button>
                <el-button @click="addFormVisibleReceive2=false" style="padding: 10px 15px;height: auto;width: auto">取消</el-button>
            </div>
        </el-dialog>
    </el-col>



</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                addFormVisibleReceive2:false,
                textarea:'',
                shneheKey:0,
                disabledPull:false,
            }
        },
        methods:{
            noPass_click(key){

                this.disabledPull = false;
                this.textarea = '';
                this.shneheKey = key;
                this.addFormVisibleReceive2 = true;
            },
            tbn1(){
                if(this.textarea === ""){
                    this.$message({
                        message: "备注必填",
                        type: 'warning'
                    });
                }else{
                    this.$emit('noPass_infor', {shenheInfor: {
                            shenhe:this.shneheKey+1,
                            audit:2,
                            auditu:this.user.id,
                            note:this.textarea,
                        }});
                    this.disabledPull = true;
                    this.addFormVisibleReceive2 = false;
                }

            },
        },
        computed: {
            ...mapGetters([
                'user',
                'roles',
                'audit_action'
            ])
        },
    }
</script>

<style rel="stylesheet/scss"  lang="scss">
</style>
