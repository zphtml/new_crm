<template>
    <span style="display: inline-block;width: 80px;vertical-align: middle;margin-left:10px;margin-right: 20px;">
           <span class="zhi" v-if="customer_type== 1"  style="vertical-align: middle;">直</span>
           <span class="zhi" v-if="customer_type == 2" style="vertical-align: middle;  color: #FF8754;border-color: #FF8754 ">渠</span>
     </span>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                customer_type:'',
            }
        },
        computed: {
            ...mapGetters([
                'user',
                'audit_action'
            ])
        },
        mounted(){
            if(this.customer_Data_type){

                this.customer_type = this.customer_Data_type.customer_type;
            }

      },
        watch:{
            customer_Data_type:function (val) {
                this.customer_type = val.customer_type;
            }
        },
        props: ['customer_Data_type']
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .zhi{
        display: inline-block;width: 20px;height: 20px;font-size: 12px;text-align: center;line-height: 20px;border-radius: 100%;
        color: #54adff;
        border: 1px solid #54adff;
    }
</style>