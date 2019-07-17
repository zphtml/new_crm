<template>
    <div>
        <el-table
                highlight-current-row v-loading="listLoading"  border
                :data="customerTable"
                class="vue-table"
                height="740"
                border
                @row-click="clickTr($event)"
                style="width: 100%">
            <el-table-column
                    width="240"
                    :label="$t('titles.customer')">
                <template slot-scope="scope">
                    <div @click="jumpConsole(scope.row)">
                        {{scope.row.advertiser}}
                        <span class="appInfor qu" v-if="scope.row.customer_type == 2">
                                    渠
                                </span>
                        <span class="appInfor zhi" v-if="scope.row.customer_type == 1">
                                    直
                                </span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                    label="简称">
                <template slot-scope="scope">
                    {{scope.row.appname}}
                </template>
            </el-table-column>
            <el-table-column
                    label="创建时间">
                <template slot-scope="scope">
                    {{scope.row.ctime | ctimeData}}
                </template>
            </el-table-column>
            <el-table-column
                    label="提交人">
                <template slot-scope="scope">
                    {{scope.row.submituser0 | fileFun}}
                </template>
            </el-table-column>
            <el-table-column
                    label="充值总额(币)">
                <template slot-scope="scope">
                    {{scope.row.submituser0 | fileFun}}
                </template>
            </el-table-column>
            <el-table-column
                    label="消耗总额(币)">
                <template slot-scope="scope">
                    {{scope.row.submituser0 | fileFun}}
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>
<script>

</script>
