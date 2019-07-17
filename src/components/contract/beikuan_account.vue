<template>
    <el-col :span="24" v-if="TableData.length>0">
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;font-weight:bold;;"  >
            <el-col :span="14" style="padding-left: 0;font-weight: bold">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                备款账户
            </el-col>
        </el-col>
        <el-col :span="24"  >
             <el-table
                            highlight-current-row
                            border
                            :data="TableData"
                            class="table"
                            style="width: 100%">
                        <el-table-column
                                label="备款账户">
                            <template slot-scope="scope">
                                <div>
                                    {{ scope.row.a_users  }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="备款账户金额">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.fk_money }}
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
        </el-col>
    </el-col>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { beikuan_use_info,tuikuan_to_beikuan_info} from '@/api/kehu';
    export default {
        data() {
            return {
                inforId:'',
                TableData:[],
                beikuan_use_info(){
                    if(this.$route.meta.title == '充值详情'  && this.roles.indexOf('/api/beikuan/beikuan-use-info')>-1){

                        beikuan_use_info({
                            id:this.inforId
                        }).then(response => {
                            this.TableData = response.data;
                        }).catch(error => {

                        });
                    }else  if(this.$route.meta.title == '退款列表' && this.roles.indexOf('/api/beikuan/tuikuan-to-beikuan-info')>-1){
                        tuikuan_to_beikuan_info({
                            id:this.inforId
                        }).then(response => {
                            this.TableData = response.data;
                        }).catch(error => {

                        });
                    }

                },
            }
        },
        computed: {
            ...mapGetters([
                'roles',
            ]),
        },
        methods: {
            beikuan_account_click(){
                this.inforId = this.$route.query.id;
                this.beikuan_use_info();
            },
        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">

</style>
