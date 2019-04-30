<!--<template>-->
    <!--<el-table-column-->
            <!--:prop="it.prop"-->
            <!--:label="$t(it.label)"-->
            <!--show-overflow-tooltip-->
            <!--:min-width="it.width">-->
        <!--<template slot-scope="scope">-->
            <!--<div class="cell-editor" v-if="typeof it.editor === 'function' ? it.editor(scope.row) : it.editor"-->
                 <!--:style="{lineHeight: size === 'medium' ? '56px' : size === 'small' ? '45px' : '40px'}">-->
                <!--<template-->
                        <!--v-if="editor && isEditor && cellEditorProp === it.prop && editorRowId === scope.row.id">-->
                    <!--<el-tooltip class="item" effect="dark" :content="$t('lang.common.save')"-->
                                <!--placement="top" :key="i">-->
                        <!--<el-button style="vertical-align: middle" type="success" size="mini" @click="save(scope.row)"-->
                                   <!--circle>-->
                            <!--<i class="icon iconfont icon-baocun"></i>-->
                        <!--</el-button>-->
                    <!--</el-tooltip>-->
                    <!--<el-tooltip v-if="!editorAddItem" class="item" effect="dark"-->
                                <!--:content="$t('lang.common.reset')" placement="top">-->
                        <!--<el-button type="primary" size="mini"-->
                                   <!--style="vertical-align: middle"-->
                                   <!--@click="reset(scope.row, dialog.option[dialog.option.findIndex(its => (its.tableField === it.prop || its.field === it.prop))])"-->
                                   <!--circle>-->
                            <!--<i class="icon iconfont icon-zhongzhi"></i>-->
                        <!--</el-button>-->
                    <!--</el-tooltip>-->
                <!--</template>-->
                <!--<template v-else>-->
                    <!--<el-tooltip effect="dark" :content="$t(editorBtn.name)"-->
                                <!--placement="top">-->
                        <!--<el-button style="display: inline-block; margin-left: 40px" type="primary" size="mini"-->
                                   <!--@click="buttonClick('update', scope.row, it.prop)" circle>-->
                            <!--<i :class="editorBtn.icon"></i>-->
                        <!--</el-button>-->
                    <!--</el-tooltip>-->
                <!--</template>-->
            <!--</div>-->
            <!--<template-->
                    <!--v-if="allEditor && dialog.option.findIndex(its => (its.tableField === it.prop || its.field === it.prop)) > -1">-->
                <!--<div class="condition-style"-->
                     <!--:style="{height:  size === 'medium' ? '56px' : size === 'small' ? '45px' : '40px'}">-->
                    <!--<cx-condition :tableData="data" :tableIndex="scope.$index"-->
                                  <!--:option="dialog.option[dialog.option.findIndex(its => (its.tableField === it.prop || its.field === it.prop))]"-->
                                  <!--:form="dialog.formlist" type="tableEditor"></cx-condition>-->
                <!--</div>-->
            <!--</template>-->
            <!--<template-->
                    <!--v-else-if="((!isEditor || editorRowId !== scope.row.id || !dialog.option.find(its => (its.tableField === it.prop || its.field === it.prop))) && !it.editor) && (scope.row.id !== editorAddItem)  && (it.prop === 'lastUpdateTime' || it.prop === 'createTime' || it.prop === 'effectiveTime' || it.prop === 'expiryTime' || it.prop ==='updateTime' || it.prop === 'validEndTime' || it.prop === 'validFromTime' || it.prop === 'ciDate' || it.prop === 'verifyDate' || it.prop === 'tradeTime' || it.prop === 'pklDate' || it.prop === 'loadDate'|| it.prop === 'etd' || it.prop === 'eat' || it.prop === 'atd' || it.prop === 'ata' || it.prop ==='actGrDate' || it.dateFormatter || it.numberFormatter) ">-->
                              <!--<span class="table-cell-span">-->
                                <!--<template v-if="it.numberFormatter">-->
                                    <!--{{priceFormatter(scope.row[it.prop], it.numberFormatter, it.prop)}}-->
                                <!--</template>-->
                                <!--<template v-else>-->
                                    <!--{{it.yyyyMMdd && dateFormatter(scope.row[it.prop]) ? dateFormatter(scope.row[it.prop], 'dd-MM-yyyy').substring(0, 10) : dateFormatter(scope.row[it.prop])}}-->
                                <!--</template>-->
                              <!--</span>-->
            <!--</template>-->
            <!--<template-->
                    <!--v-else-if="editor &&  isEditor && (cellEditorProp === 'all' || cellEditorProp === it.prop)  && dialog.option.findIndex(its => (its.tableField === it.prop || its.field === it.prop)) > -1 && editorRowId === scope.row.id">-->
                <!--<div class="condition-style"-->
                     <!--:style="{height:  size === 'medium' ? '56px' : size === 'small' ? '45px' : '40px'}">-->
                    <!--<cx-condition-->
                            <!--:option="dialog.option[dialog.option.findIndex(its => (its.tableField === it.prop || its.field === it.prop))]"-->
                            <!--:form="dialog.formlist" type="tableEditor"></cx-condition>-->
                <!--</div>-->
            <!--</template>-->
            <!--<template v-else-if="it.defined">-->
                <!--<slot :name="it.prop" :row="scope.row" :value="scope.row[it.prop]"-->
                      <!--:index="scope.$index" :data="data"></slot>-->
            <!--</template>-->
            <!--<template v-else-if="it.formatter">-->
                <!--{{it.formatter(scope.row[it.prop],scope.row)}}-->
            <!--</template>-->
            <!--<template-->
                    <!--v-else-if="filterable && filterInput && scope.row[it.prop].toString().indexOf(filterInput) !== -1">-->
                <!--{{scope.row[it.prop].toString().substring(0,scope.row[it.prop].toString().indexOf(filterInput))}}<strong-->
                    <!--class="el-button&#45;&#45;text">{{filterInput}}</strong>{{scope.row[it.prop].toString().substring(scope.row[it.prop].toString().indexOf(filterInput)+filterInput.length)}}-->
            <!--</template>-->
            <!--<template v-else>-->
                            <!--<span class="table-cell-span">-->
                                <!--{{scope.row[it.prop]}}-->
                            <!--</span>-->
            <!--</template>-->

        <!--</template>-->
    <!--</el-table-column>-->
<!--</template>-->

<!--<script lang="ts">-->
    <!--import {dateFormat, priceFormat} from '@/utils/index';-->
    <!--import {Component, Vue, Prop, Watch} from 'vue-property-decorator';-->
    <!--import {Getter} from 'vuex-class';-->

    <!--@Component-->
    <!--export default class CxTable extends Vue {-->


        <!--@Prop() public it: any; // 默认表格一页条数-->

        <!--@Prop() public cellEditorProp: string; // 全有编辑 还是 单格编辑-->

        <!--@Prop() public editorRowId: string; // 编辑行的id-->


        <!--@Prop({-->
            <!--default: false,-->
        <!--}) public editor?: any; // 是否行内编辑-->

        <!--@Prop({-->
            <!--default: false,-->
        <!--}) public isEditor?: any; // 是否编辑中-->

        <!--@Prop() public dialog: any; // 行内编辑需要的参数-->




        <!--@Getter public size: any;-->


        <!--public addClick: boolean = false; // 是否是点击新增-->





        <!--// public data: any = []; // 表格数据-->
        <!--// public total: number = 0; // 数据总条数-->
        <!--// public check: any = []; // 选中的数据-->
        <!--// public selectedRow: any = {}; // 点击行的数据-->
        <!--// public filterInput: string = ''; // 筛选值-->
        <!--// public dataAll: any = []; // 查询出的所有数据-->
        <!--//-->
        <!--// public searchSetV: boolean = false; // 表格设置弹框 是否显示-->
        <!--// public searchAllData: any = []; // 表格设置所有数据-->
        <!--// public searchShowData: any = []; // 表格设置显示数据-->
        <!--//-->
        <!--// public columsTrue: any = []; // 真正的colums-->
        <!--public isEditor: boolean = false; // 是否编辑中-->
        <!--// public editorRowId: string = ''; // 编辑行的id-->
        <!--//-->
        <!--// public editorAddItem: any = ''; // 编辑新增的那行数据-->
        <!--//-->
        <!--// public editorBtn: any = {-->
        <!--//     id: 'update',-->
        <!--//     name: 'lang.common.editor',-->
        <!--//     disabled: false,-->
        <!--//     icon: 'el-icon-edit',-->
        <!--//     selectType: 'selectOne',-->
        <!--// }; // 编辑按钮的参数-->
        <!--// public cellEditorProp: string = ''; // 全有编辑 还是 单格编辑-->


        <!--// @checkSelect(selection) 点击复选框事件 selection所有选中的复选框-->
        <!--// @select(row) 点击行事件 row该行数据-->
        <!--// 插槽：<div slot="id"(字段自定义的field)  slot-scope="scope" @click.stop="() => goDetail(scope.row)" ></div>  row行数据 value格数据 index行号 data所有的数据 在colums需要加defined:true-->


        <!--// // 监听本地表格数据变化 给于赋值-->
        <!--// @Watch('datas', {immediate: true, deep: true})-->
        <!--// private changeDatas(val: any): void {-->
        <!--//     if (!this.url) {-->
        <!--//         this.$set(this, 'data', val);-->
        <!--//     }-->
        <!--// }-->
        <!--//-->
        <!--// // 监听 查询事件-->
        <!--// @Watch('tableDataflag', {immediate: false, deep: true})-->
        <!--// private changeTableDataflag(val: string): void {-->
        <!--//     if (val.split(',')[1] === '0') {-->
        <!--//         this.getTable();-->
        <!--//     } else {-->
        <!--//         this.getTable(parseInt(val.split(',')[1], 10));-->
        <!--//     }-->
        <!--// }-->
        <!--//-->
        <!--//-->
        <!--// // 监听 本地筛选-->
        <!--// @Watch('filterInput', {immediate: false, deep: true})-->
        <!--// private changeFilterInput(val: string): void {-->
        <!--//     let res: any[] = [];-->
        <!--//     if (this.filterItem && this.filterItem.length > 0) {-->
        <!--//         res = this.filterItem;-->
        <!--//     } else {-->
        <!--//         res = this.colums.map((it: any) => (it.prop));-->
        <!--//     }-->
        <!--//     const resDatas = this.dataAll.filter((it: any) => {-->
        <!--//         return res.filter((its: any) => (it[its].indexOf(val) > -1)).length > 0;-->
        <!--//     });-->
        <!--//     this.data = resDatas;-->
        <!--// }-->
        <!--//-->
        <!--//-->
        <!--// private mounted() {-->
        <!--//     // console.log(priceFormat(293849382.28))-->
        <!--//     if (this.pageSizeDefault) {-->
        <!--//         this.pageSize = this.pageSizeDefault;-->
        <!--//     }-->
        <!--//     setTimeout(() => {-->
        <!--//         const session = JSON.parse(localStorage.getItem('colums') as any);-->
        <!--//         if (session[this.name as string]) {-->
        <!--//             const showSearch = session[this.name as string];-->
        <!--//             if (showSearch.right.length < 7) {-->
        <!--//                 showSearch.right[showSearch.right.length - 1].width = false;-->
        <!--//             }-->
        <!--//             this.columsTrue = showSearch.right;-->
        <!--//         } else {-->
        <!--//             this.columsTrue = this.colums;-->
        <!--//         }-->
        <!--//     }, 0);-->
        <!--// }-->


        <!--// 格式化6位no 补0-->
        <!--private formatterItemNo(val: string | number): string {-->
            <!--let num = val + '';-->
            <!--const pushNum = 6 - num.length;-->
            <!--for (let i = 0; i < pushNum; i++) {-->
                <!--num = '0' + num;-->
            <!--}-->
            <!--return !this.addClick ? num : '';-->
        <!--}-->


        <!--// 格式化价格-->
        <!--private priceFormatter(val: number, type: 'number' | 'price' | 'CBM' | 'int') {-->
            <!--if (!val && val !== 0) {-->
                <!--return;-->
            <!--}-->
            <!--return priceFormat(val, type);-->
        <!--}-->

        <!--// 时间格式化-->
        <!--private dateFormatter(val: string | boolean, type: string) {-->
            <!--if (!val) {-->
                <!--return;-->
            <!--}-->
            <!--return dateFormat(type || 'yyyy-MM-dd hh:mm:ss', val);-->
        <!--}-->







        <!--// 行内编辑 新增 修改按钮点击-->
        <!--private editorClick(id: any, row: any) {-->
            <!--if (id === 'add') {-->
                <!--if (!this.editorAddItem) {-->
                    <!--this.addClick = true;-->
                    <!--const newTableId: any = new Date().getTime();-->
                    <!--this.data.unshift({id: newTableId});-->
                    <!--this.editorRowId = newTableId;-->
                    <!--this.editorAddItem = newTableId;-->
                    <!--this.isEditor = true;-->
                <!--}-->
            <!--} else if (id === 'update') {-->
                <!--if (this.editorAddItem) {-->
                    <!--this.data.shift();-->
                    <!--this.editorAddItem = '';-->
                <!--}-->
                <!--this.editorRowId = row.id;-->
                <!--setTimeout(() => {-->
                    <!--this.isEditor = true;-->
                <!--}, 0);-->
            <!--}-->
        <!--}-->

        <!--// 行内编辑保存-->
        <!--private save(row: any) {-->
            <!--if (this.url) {-->
                <!--(this.$parent as any).onOk();-->
            <!--} else {-->
                <!--(this.$refs.mainDialog as any).validate((valid: boolean) => {-->
                    <!--if (valid) {-->
                        <!--if (!this.beforeSave || this.beforeSave(this.dialog.formlist, this.data)) {-->
                            <!--if (this.dialog.title === 'lang.common.addItem') {-->
                                <!--this.data.shift();-->
                                <!--this.data.push({...this.dialog.formlist, id: new Date().getTime()});-->
                            <!--} else {-->
                                <!--const index = this.data.findIndex((it: any) => (this.editorRowId === it.id));-->
                                <!--this.data[index] = {-->
                                    <!--...this.data[index], ...this.dialog.formlist,-->
                                    <!--id: new Date().getTime(),-->
                                <!--};-->
                            <!--}-->
                            <!--if (this.editor) {-->
                                <!--this.editorAddItem = '';-->
                                <!--this.editorRowId = '';-->
                                <!--this.isEditor = false;-->
                            <!--}-->
                            <!--this.$emit('save', row);-->
                        <!--}-->
                    <!--} else {-->
                        <!--console.log('error submit!!');-->
                        <!--return false;-->
                    <!--}-->
                <!--});-->
            <!--}-->

        <!--}-->



        <!--// 行内新增删除-->
        <!--private addEditor() {-->
            <!--this.data.shift();-->
            <!--this.editorAddItem = '';-->
            <!--this.editorRowId = '';-->
            <!--this.isEditor = false;-->
            <!--this.addClick = false;-->
        <!--}-->










        <!--// 合并设置-->
        <!--private arraySpanMethod({row, column, rowIndex, columnIndex}: any) {-->
            <!--if (row.isFitS || row.isFitE) {-->
                <!--return [0, 2];-->
            <!--}-->
        <!--}-->

        <!--// 表格行样式设置-->
        <!--private tableRowStyle({row, rowIndex}: any) {-->
            <!--if (row.isFitS) {-->
                <!--return 'isFitS';-->
            <!--} else if (row.isFitE) {-->
                <!--return 'isFitE';-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->

<!--<style lang="scss">-->
    <!--.el-table__row .el-form-item__error {-->
        <!--display: none;-->
    <!--}-->

    <!--.pagination {-->
        <!--float: right;-->
    <!--}-->

    <!--.el-table__header th[colspan='4'] > div {-->
        <!--text-align: center;-->
    <!--}-->

    <!--.el-table__header th[colspan='3'] > div {-->
        <!--text-align: center;-->
    <!--}-->
<!--</style>-->
