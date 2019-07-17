<template>
    <el-col :span="24" class="enclosure" v-if="showfj == 0">
        <el-col :span="24"
                style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0">
            <el-col class="box_fj" :span="24" style="padding: 0">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                附件信息（{{inforlength}}个）
            </el-col>
        </el-col>

            <el-col :span="24" style="margin-top: 10px;padding: 0" class="Listbox" v-if="all_name">
                <div v-for="(cur,key) in inforData" :key="key"  style="display: inline-block;vertical-align: top">
                    <div v-if="cur.suffix=='png' || cur.suffix=='jpg' || cur.suffix=='jpeg' "  style="display: inline-block">
                        <div class="list " v-for="(n, index) in imageList" :key="index" :data-index="index" style="position: relative">
                            <div @click="open($event,cur.file)"  style="width: 100%;height: 100%;position: absolute;left: 0;top: 0;z-index: 99"></div>
                            <img   :src=cur.file style="width: 100%;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto">
                        </div>
                        <span  v-if="Number(audit) != 2 && dataName != 'null'">
                        <span v-if="Number(audit_count)<3 " class="deleteText" @click="deleteImg(cur)" >
                            删除
                        </span>
                        <span v-if="Number(audit_count) ==3 &&  Number(audit) != 1" class="deleteText" @click="deleteImg(cur)">
                            删除
                        </span>
                    </span>
                    </div>
                    <div v-else-if="cur.suffix=='zip' || cur.suffix=='rar'" style="display: inline-block">
                        <div class="list" >
                            <a :href="cur.file">
                             <span style="display: inline-block;width: 52px;height: 44px;margin: 10px;border: 1px solid #9c9c9c;text-align: center;line-height: 44px;color: #9c9c9c">
                                <img src="./img/yasuobao.png"  style="width: 18px;margin-top: 5px;" alt="">
                            </span>
                                <span class="text" style="display: block">
                                   压缩包.{{cur.suffix}}
                            </span>
                            </a>
                        </div>
                        <span  v-if="Number(audit) != 2 && dataName != 'null'">
                        <span v-if="Number(audit_count)<3 " class="deleteText" @click="deleteImg(cur)" >
                            删除
                        </span>
                        <span v-if="Number(audit_count) ==3 &&  Number(audit) != 1" class="deleteText" @click="deleteImg(cur)">
                            删除
                        </span>
                    </span>
                    </div>
                    <div v-else style="display: inline-block">
                        <div class="list" >
                            <a :href="cur.file" target="_blank" style="display: inline-block">
                            <span style="display: inline-block;width: 52px;height: 44px;margin: 10px;border: 1px solid #9c9c9c;text-align: center;line-height: 44px;color: #9c9c9c">
                                   <img src="./img/word.png"  style="width: 18px;margin-top: 5px;" alt="">
                            </span>
                                <span class="text" style="display: block">
                                   文档.{{cur.suffix}}
                            </span>
                            </a>
                        </div>

                        <span  v-if="Number(audit) != 2 && dataName != 'null'">
                        <span v-if="Number(audit_count)<3 " class="deleteText" @click="deleteImg(cur)" >
                            删除
                        </span>
                        <span v-if="Number(audit_count) ==3 &&  Number(audit) != 1" class="deleteText" @click="deleteImg(cur)">
                            删除
                        </span>
                    </span>
                    </div>
                </div>
                <div style="display: inline-block"  v-if="Number(audit) != 2 && dataName != 'null'">
                    <div class="list cardImg" style="border: none" v-if="Number(audit_count)<3 ">
                        <el-upload
                                list-type="picture"
                                name="File[imageFiles][]"
                                action="/api/file/addfile"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :on-error="error"
                                :data="dataObj">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                    <div class="list cardImg" style="border: none" v-if="Number(audit_count) ==3 &&  Number(audit) != 1">
                        <el-upload
                                list-type="picture"
                                name="File[imageFiles][]"
                                action="/api/file/addfile"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :on-error="error"
                                :data="dataObj">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                </div>
            </el-col>
            <!--退款到客户-->
            <el-col :span="24" style="margin-top: 10px;padding: 0" class="Listbox" v-if="tui_name">
                <div v-for="(cur,key) in inforData" :key="key"  style="display: inline-block;vertical-align: top">
                    <div v-if="cur.suffix=='png' || cur.suffix=='jpg' || cur.suffix=='jpeg' "  style="display: inline-block">
                        <div class="list " v-for="(n, index) in imageList" :key="index" :data-index="index">
                            <div @click="open($event,cur.file)"  style="width: 100%;height: 100%;position: absolute;left: 0;top: 0;z-index: 99"></div>
                            <img  :src=cur.file style="width: 100%;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto">
                        </div>
                        <span  v-if="Number(audit) != 2 ">
                            <span v-if="Number(audit_count)<3 " class="deleteText" @click="deleteImg(cur)" >
                                删除
                            </span>
                            <span v-if="Number(audit_count) ==3 &&  Number(audit) != 1" class="deleteText" @click="deleteImg(cur)">
                                删除
                            </span>
                        </span>
                    </div>
                    <div v-else-if="cur.suffix=='zip' || cur.suffix=='rar'" style="display: inline-block">
                        <div class="list" >
                            <a :href="cur.file">
                             <span style="display: inline-block;width: 52px;height: 44px;margin: 10px;border: 1px solid #9c9c9c;text-align: center;line-height: 44px;color: #9c9c9c">
                                   <img src="./img/yasuobao.png"  style="width: 18px;margin-top: 5px;" alt="">
                            </span>
                                <span class="text" style="display: block">
                                   压缩包.{{cur.suffix}}
                            </span>
                            </a>
                        </div>
                        <span  v-if="Number(audit) != 2">
                        <span v-if="Number(audit_count)<2 " class="deleteText" @click="deleteImg(cur)" >
                            删除
                        </span>
                        <span v-if="Number(audit_count) ==2 &&  Number(audit) != 1" class="deleteText" @click="deleteImg(cur)">
                            删除
                        </span>
                    </span>
                    </div>
                    <div v-else style="display: inline-block">
                        <div class="list" >
                            <a :href="cur.file" target="_blank" style="display: inline-block">
                            <span style="display: inline-block;width: 52px;height: 44px;margin: 10px;border: 1px solid #9c9c9c;text-align: center;line-height: 44px;color: #9c9c9c">
                                <img src="./img/word.png"  style="width: 18px;margin-top: 5px;" alt="">
                            </span>
                                <span class="text" style="display: block">
                                   文档.{{cur.suffix}}
                            </span>
                            </a>
                        </div>

                        <span  v-if="Number(audit) != 2 ">
                        <span v-if="Number(audit_count)<2 " class="deleteText" @click="deleteImg(cur)" >
                            删除
                        </span>
                        <span v-if="Number(audit_count) ==2 &&  Number(audit) != 1" class="deleteText" @click="deleteImg(cur)">
                            删除
                        </span>
                    </span>
                    </div>
                </div>
                <div style="display: inline-block"  v-if="Number(audit) != 2 ">
                    <div class="list cardImg" style="border: none" v-if="Number(audit_count)<2 ">
                        <el-upload
                                list-type="picture"
                                name="File[imageFiles][]"
                                action="/api/file/addfile"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :on-error="error"
                                :data="dataObj">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                    <div class="list cardImg" style="border: none" v-if="Number(audit_count) ==2 &&  Number(audit) != 1">
                        <el-upload
                                list-type="picture"
                                name="File[imageFiles][]"
                                action="/api/file/addfile"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :on-error="error"
                                :data="dataObj">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                </div>
            </el-col>
    </el-col>
</template>
<script>
    import {mapGetters} from 'vuex';
    import { delete_file } from '@/api/contract';
    import fancyBox from 'vue-fancybox';
    export default {
        data() {
            return {
                input: "",
                dataObj:{
                    'File[yid]':0,
                    'File[type]':0,
                },
                audit_count:2,
                inforData:[],
                inforlength:0,
                audit:2,
                dataName:'null',
                all_name:true,
                tui_name:false,
                showfj:'0',
                imageList: [
                    { width: 80, height: 80, url: '' },
                ],
                delete_file(id){
                    delete_file({
                        id:id
                    }).then(response => {
                        if(response.code == 200){
                            this.$emit('newcontact');
                        }else{
                            this.$message.error('删除失败！');
                        }
                    }).catch(() => {

                    });
                },
            }
        },
        filters: {
            current: function (value) {
                if (value == '' || value == null) {
                    return '--'
                } else {
                    return value
                }
            }
        },
        watch: {
            item: function (val) {
                this.inforData = val[0].data;
                this.inforlength = val[0].data.length;
                this.dataObj['File[yid]']=val[0].yid;
                this.dataObj['File[type]']=val[0].type;
                this.audit_count = val[0].audit_count;
                this.audit = val[0].audit;
                let showTrue = 'false';
                if(this.$route.path  == '/customer/contractManagement/compactList/viewcontract'){
                    this.roles.filter(function(item){
                        if(item == "/api/contract-new/isshowcontractfile" ){
                            showTrue = "true"
                        }
                    });
                    if(showTrue == "true"){
                        this.showfj = '0';
                    }else{
                        this.showfj = '1';
                    }
                }
                if(val[0].name){
                    this.dataName = val[0].name;
                }
                if(val[0].tui_name){
                    if(val[0].tui_name == "退款到客户"){
                        this.tui_name = true;
                        this.all_name = false;
                    }
                }
            },
        },
        methods: {
            open (e,img) {
                this.imageList[0].url = img;
                fancyBox(e.target, this.imageList);
            },
            ad(val) {
                // 发送事件
                this.$emit('newcontact', val);

            },
            set(){
                this.$emit('newcontact', [this.item1, this.contact]);
            },
            del(val){
                this.$emit('del', [val, this.item1.id]);
            },
            deleteImg(val){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delete_file(val.id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            handleAvatarSuccess(file){
                if(file.code == 200){
                    this.$message({
                        message: '上传成功',
                        type: 'success'
                    });
                    this.$emit('newcontact');
                }else{
                    this.$message.error('上传失败，请重新上传');
                }
            },
            error(){

            },
        },
        computed: {
            ...mapGetters([
                'user',
                'roles'
            ])
        },
        created() {

        },
        mounted(){

        },
        props: ['item']
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .enclosure {
        .cusmessage {
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid #e6e6e6;
        }
        .Listbox {
            background: #f9f9f9;
            .list {
                width: 90px;
                height: 90px;
                background: white;
                position: relative;
                display: inline-block;
                vertical-align: top;
                margin:10px 5px ;
                border:1px solid #959898;
                cursor: pointer;
                text-align: center;
                overflow: hidden;
                .text {
                    font-size: 12px;
                }
            }
            .deleteText {
                display: block;
                font-size: 12px;
                text-align: center;
                cursor: pointer;
            }
            .deleteText:hover {
                color: red;
            }
            .cardImg {
                width:90px;
                height:90px;
                line-height: 93px;
                .el-upload{
                    width:100%;
                    height:100%;
                }
            }
        }
    }
    .fancy-box-image-wrapper div img{
        position: absolute;
        bottom: 0;
        top: 0;
        margin: auto;
    }
</style>
