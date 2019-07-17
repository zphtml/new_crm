<template>
    <el-col>
        <el-dialog title="审核备注" :visible.sync="addFormVisibleReceive1"  @close="addFormVisibleReceive1=false" class="media_shenhe" size="tiny" >
            <div style="margin-top: 20px;margin-bottom: 20px;">
                <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">审核备注</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                    <el-input
                            type="textarea"
                            autosize
                            placeholder="请输入内容"
                            v-model="textarea2">
                    </el-input>
                </span>
            </div>
            <div style="text-align: right;padding-bottom: 20px">
                <el-button type="primary" @click="tbn" :disabled="disabledPull" style="padding: 10px 15px;height: auto;width: auto">确定</el-button>
                <el-button @click="addFormVisibleReceive1=false" style="padding: 10px 15px;height: auto;width: auto">取消</el-button>
            </div>
        </el-dialog>
    </el-col>

</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                addFormVisibleReceive1:false,
                textarea2:'',
                shneheKey:0,
                disabledPull:false,
            }
        },
        methods:{
            pass_click(data,key){
                this.textarea2 = '';
                this.addFormVisibleReceive1 = true;
                this.shneheKey = key;
                this.disabledPull = false;
            },
            tbn(){
                this.disabledPull = true;
                this.addFormVisibleReceive1 = false;
                this.$emit('pass_infor', {shenheInfor: {
                        shenhe:this.shneheKey+1,
                        audit:1,
                        auditu:this.user.id,
                        note:this.textarea2,
                    }});
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
