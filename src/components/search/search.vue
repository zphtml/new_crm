<template>
    <div>
        <div class="searchInput">
            <input type="text" class="search" :placeholder="'请输入公司名/' + $t('titles.nick')" v-model='inputText' @change='input'>
            <svg class="icon iconSearch" aria-hidden="true" style="width: 18px;height: 18px;">
                <use xlink:href="#icon-11"></use>
            </svg>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {

        data() {
            return {
// 搜索时间
                inputText:'',
            }
        },
        created(){
            let component = this;
            document.onkeydown = function(e){
                if(e.which == '13'){
                    component.show();
                }
            }
        },
        methods:{
            input:function(){
                if(this.inputText == ''){
                    this.$emit('search',this.inputText);
                }
            },
            show: function(ev) {
                this.$emit('search', this.inputText);
            },
        },
        computed: {
            ...mapGetters([
                'user',
            ])
        },
        watch:{
            screen:function(newValue){
                this.inputText = newValue[0].data;
            },
        },
        props: ['screen']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/search.scss";
</style>