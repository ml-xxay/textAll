<template>
    <div>
        <tableDrag v-bind="tableHeadConfig"></tableDrag>
    </div>
</template>
<script>
    import tableDrag from '../components/tabdrag/tableDrag'
export default {
    name: "PaymentList",
    components: {
        tableDrag
    },
    data() {
        return {
            tableHeadConfig:{
                tableHead: [
                {
                    label: "零零",
                    value: "v0",
                    width: 150,
                    check:false
                },
                {
                    label: "一一",
                    value: "v1",
                    width: 150,
                    check:true
                },
                {
                    label: "二二",
                    value: "v2",
                    width: 150,
                    check:true
                },
                {
                    label: "三三",
                    value: "v3",
                    width: 150,
                    check:false
                }
            ],
                showSelectColumn: true, //多选项显示
            
        }
        };
    },
   
   
};
</script>

<style>
   
</style>
