import { productline} from '@/api/kehu';
const criteria = {
    shenheData:[
        {
            label:'全部审核',
            value:'',
        },
        {
            label:'未审核',
            value:'0',
        },
        {
            label:'已通过',
            value:'1',
        },
        {
            label:'未通过',
            value:'2',
        }
    ],
    backMoneyData:[
        {
            label:'全部回款',
            value:'',
        },
        {
            label:'已回款',
            value:1,
        },
        {
            label:'未回款',
            value:0,
        },
    ],
    options_type:[
        {
        name:'创建时间',
        id:1,
    },{
        name:'完成时间',
        id:2
    }],
    guidangData:[
        {
            label:'全部归档',
            value:'',
        },
        {
            label:'已归档',
            value:'1',
        },
        {
            label:'未归档',
            value:'0',
        },
    ],
    options_chengdan:[
        {
            label:'全部',
            value:'',
        },
        {
            label:'已成单',
            value:'1',
        },
        {
            label:'未成单',
            value:'0',
        }
    ],
    tuikuan_dataeData:[
        {
            label:'全部',
            value:'',
        },{
            label:'已退款',
            value:'1',
        },{
            label:'进行中',
            value:'2',
        },{
            label:'未退款',
            value:'3',
        }],
    livenessOption:[
        {
            label:'全部活跃度',
            id:'',
        },
        {
            label:'1天内未操作账户',
            id:5,
        },
        {
            label:'7天内未操作账户',
            id:4,
        },
        {
            label:'30天内未操作账户',
            id:3,
        },
        {
            label:'90天内未操作账户',
            id:2,
        },
        {
            label:'一年内未操作账户',
            id:1,
        },
        {
            label:'未充值客户',
            id:0,
        },
    ],
    accountTypeData:[
        {
            label:'全部',
            value:'',
        },
        {
            label:'临时状态',
            value:'1',
        },
        {
            label:'正式状态',
            value:'0',
        }
    ],
    renlingData:[
        {
            label:'全部',
            value:'',
        },
        {
            label:'可认领',
            value:'1',
        },
        {
            label:'不可认领',
            value:'0',
        }
    ],
    productline(){
        return new Promise((resolve) => {
            productline({
            }).then(response => {
                let pr_id = {
                    name:'产品线',
                    data:[]
                };
                response.unshift({
                    name:'全部产品线',
                    zi:[{
                        id:'',
                        name:'全部产品线',
                    }]
                });
                resolve(response);
            }). catch(err => {this.$message.error('获取失败');});
        });


    },
    is_useData:[
        {
            label:'全部',
            value:'',
        },
        {
            label:'使用中',
            value:'1',
        }
    ],
}
export default criteria
