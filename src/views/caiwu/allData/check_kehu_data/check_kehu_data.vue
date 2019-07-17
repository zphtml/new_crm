<template>
    <div >
        <el-col :span="24" class="screen" style="margin:5px 0">
            <div class="searchInput">
                <input type="text" class="search" placeholder="请输入关键字" v-model='inputText' >
                <svg class="icon iconSearch" aria-hidden="true" style="width: 18px;height: 18px;">
                    <use xlink:href="#icon-11"></use>
                </svg>
            </div>
        </el-col>
        <el-col :span="24" class="check_kehu_data_table">
            <div>
                <el-table
                        highlight-current-row v-loading="listLoading"  border
                        :data="check_table"
                        class="vue-table"
                        height="700"
                        :default-sort = "{prop: 'date', order: 'descending'}"
                        style="width: 100%">
                    <el-table-column
                            width="200"
                            height="10px"
                            label="id">
                        <template slot-scope="scope">
                            {{scope.row.id}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            height="10px"
                            label="名称">
                        <template slot-scope="scope">
                            {{scope.row.company}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            height="10px"
                            label="差额">
                        <template slot-scope="scope">
                            {{scope.row.gap| currency('')}}
                        </template>
                    </el-table-column>

                    <el-table-column
                            height="10px"
                            label="说明">
                        <template slot-scope="scope">
                            {{scope.row.note }}
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="pageIndex"
                            :page-sizes="[ 20, 30,40]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="kehuTableLength"
                            style='text-align: right;'>
                    </el-pagination>
                </div>
            </div>
        </el-col>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapActions,mapGetters} from 'vuex';
    import { check_kehu_data } from '@/api/money';
    import state from '@/components/shenhe/sh_state';
    import moment from "moment"
    export default {
        data() {
            return {
//
                dataInfor: {
                    search: {},
                },
                inputText: '',
                dataInput: [],
                start_date: '',
                end_date: '',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                screen: [],
                //------------------------
                addFormVisible: false,
                listLoading: true,
                check_kehu_data_table:[],
                check_kehu_data: function () {
                    this.listLoading = true;
                    check_kehu_data({
                    }).then(response => {
                        this.check_kehu_data_table = response.data;
                        this.kehuTableLength = response.data.length;
                        this.listLoading = false;
                    }).catch(err => {
                        this.$message.error('获取失败');
                    });
                },
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:0,
            }
        },
        components: {
            state
        },
        methods: {
            ...mapActions([
                'Account',
                'searchData',
            ]),
            check_kehu_click(){
                this.check_kehu_data();
            },

            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if(j == 'last_time'){
                        v[j] = moment( v[j]).format('YYYY-MM-DD')
                    }
                    return v[j]
                }))
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
            },
            handleCurrentChange(val) {
                this.num = val;
                this.pageIndex = val;
            },

        },

        computed: {
            ...mapGetters([
                'user',
                'audit_action',
                'search_list'
            ]),
            check_table(){
                let check_kehu_table = [];
                let _this = this;
                check_kehu_table = this.check_kehu_data_table.filter(function(item){
                    if(item.company.indexOf(_this.inputText)>=0){
                        return item
                    }
                })
                this.kehuTableLength =  check_kehu_table.length;
                return  check_kehu_table.filter((o,i) => i >=(this.pageIndex-1)*this.pageSize&&i<=this.pageIndex*this.pageSize-1);
            },
        },
    }
</script>

