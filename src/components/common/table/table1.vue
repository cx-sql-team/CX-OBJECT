<!--<template>-->
    <!--<div>-->
        <!--<span style="font-size: 14px" :class="btnText ? [btnClass] : []">{{btnText ? $t(btnText) + ':' : ''}}</span>-->
        <!--<div :class="tableClass" class="button-bg" v-if="buttons && buttons.length > 0"-->
             <!--style="overflow: hidden; margin-bottom: 10px;">-->
            <!--<template v-for="(it,i) in buttons">-->
                <!--<div v-if="it.selectType === 'all'" style="float: left; margin-right: 5px">-->
                    <!--<cx-button :key="i" :option="it"-->
                               <!--@onClick="it.onClick ? it.onClick() : buttonClick(it.id, false, 'all', it)"></cx-button>-->
                <!--</div>-->
                <!--<div v-else-if="it.selectType === 'right'" style="float: right; margin-left: 5px">-->
                    <!--<cx-button :key="i" :option="it" @onClick="it.onClick && it.onClick()"></cx-button>-->
                <!--</div>-->
            <!--</template>-->
            <!--<el-button v-if="!noSetBtn" :size="size" type="primary" @click="searchSet()">-->
                <!--<i class="iconfont el-icon-setting"></i>-->
            <!--</el-button>-->
            <!--<template v-if="filterable">-->
                <!--<el-input-->
                        <!--style="float: right; width: 210px"-->
                        <!--:size="size"-->
                        <!--v-model="filterInput"-->
                        <!--:placeholder="getInputName()"-->
                        <!--suffix-icon="el-icon-search"-->
                <!--&gt;</el-input>-->
            <!--</template>-->
        <!--</div>-->
        <!--<el-form-->
                <!--:inline="true"-->
                <!--label-width="142px"-->
                <!--:model="dialog && dialog.formlist"-->
                <!--class="form-inline"-->
                <!--:rules="dialog && dialog.ruleslist"-->
                <!--ref="mainDialog"-->
        <!--&gt;-->
            <!--&lt;!&ndash;:data="[{isFitS: true}].concat(data).concat([{isFitE: true}])"&ndash;&gt;-->
            <!--<el-table-->
                    <!--:span-method="arraySpanMethod"-->
                    <!--:ref="tableRef"-->
                    <!--:row-class-name="tableRowStyle"-->
                    <!--:size="sizeType ? sizeType : size"-->
                    <!--:data="data"-->
                    <!--:class="tableClass"-->
                    <!--style="width: 100%"-->
                    <!--border-->
                    <!--stripe-->
                    <!--:max-height="pageSizeDefault ? (cHeight-120) : size === 'mini' ? (437 + tableHeadHeight*42) : size === 'small' ? (500  + tableHeadHeight*45) : (640  + tableHeadHeight*48)"-->
                    <!--tooltip-effect="dark"-->
                    <!--@current-change="handleCurrentChange"-->
                    <!--:highlight-current-row="!noSelect"-->
                    <!--@selection-change="selectChange"-->
                    <!--@row-click="rowClick"-->
            <!--&gt;-->
                <!--<template v-if="noCheckbox">-->
                    <!--<el-table-column-->
                            <!--fixed-->
                            <!--type="selection"-->
                            <!--width="40"-->
                            <!--:selectable="selectable">-->
                    <!--</el-table-column>-->
                <!--</template>-->
                <!--<el-table-column v-if="isSr" label="SR" width="50" align="center">-->
                    <!--<template slot-scope="scope"><span>{{scope.$index+(pageNo - 1) * pageSize + 1}} </span></template>-->
                <!--</el-table-column>-->
                <!--<template v-for="(it,i) in columsTrue">-->
                    <!--<template v-if="it.children">-->
                        <!--<template v-for="(its, index) in columsTrue">-->
                            <!--<table-column-->
                                    <!--:it="its"-->
                                    <!--:dialog="dialog"-->
                                    <!--:editor="editor"-->
                                    <!--:isEditor="isEditor"-->
                                    <!--:cellEditorProp="cellEditorProp"-->
                                    <!--:key="index"-->
                                    <!--:editorRowId="editorRowId"-->
                            <!--/>-->
                        <!--</template>-->
                    <!--</template>-->
                    <!--<template v-else>-->
                        <!--<table-column :it="it" :dialog="dialog" :key="i"/>-->
                    <!--</template>-->
                <!--</template>-->
                <!--<el-table-column-->
                        <!--fixed="right"-->
                        <!--label="action"-->
                        <!--v-if="!noAction"-->
                        <!--:width="(buttons.filter(it => (it.selectType === 'selectOne')).length + (editor || buttons.filter(it => (it.selectType === 'selectOne')).length === 1 ? 1 : 0)) * 50">-->
                    <!--<template slot-scope="scope">-->
                        <!--<template v-for="(it,i) in buttons">-->
                            <!--<template v-if="it.selectType === 'selectOne' && (it.show ? it.show(scope.row) : true)">-->
                                <!--<template-->
                                        <!--v-if="editor && isEditor && cellEditorProp === 'all' && editorRowId === scope.row.id && it.id === 'update'">-->
                                    <!--<el-tooltip class="item" effect="dark" :content="$t('lang.common.save')"-->
                                                <!--placement="top" :key="i">-->
                                        <!--<el-button :disabled="dialog.loading" type="success" size="mini"-->
                                                   <!--@click="save(scope.row)" circle>-->
                                            <!--<i :class="['icon', 'iconfont', dialog.loading ? 'el-icon-loading' : 'icon-baocun']"></i>-->
                                        <!--</el-button>-->
                                    <!--</el-tooltip>-->
                                    <!--<el-tooltip v-if="!editorAddItem" class="item" effect="dark"-->
                                                <!--:content="$t('lang.common.reset')" placement="top">-->
                                        <!--<el-button type="primary" size="mini" @click="reset(scope.row)" circle>-->
                                            <!--<i class="icon iconfont icon-zhongzhi"></i>-->
                                        <!--</el-button>-->
                                    <!--</el-tooltip>-->
                                <!--</template>-->
                                <!--<template v-else>-->
                                    <!--<el-tooltip class="item" effect="dark" :content="$t(it.name)" placement="top"-->
                                                <!--:key="i">-->
                                        <!--<el-button :type="it.id === 'dele' ? 'danger' : 'primary'" size="mini"-->
                                                   <!--@click="it.id === 'dele' && editorAddItem === scope.row.id ? addEditor() : it.onClick ? it.onClick(scope.row) :buttonClick(it.id, scope.row, 'all', it)"-->
                                                   <!--circle>-->
                                            <!--<i :class="it.icon.indexOf('el') > 0 ? [it.icon] : ['icon', 'iconfont', it.icon]"></i>-->
                                        <!--</el-button>-->
                                    <!--</el-tooltip>-->
                                <!--</template>-->
                            <!--</template>-->
                        <!--</template>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            <!--</el-table>-->
        <!--</el-form>-->
        <!--<div class="pagination" v-show="!noPagination">-->
            <!--<el-pagination layout="total, sizes, prev, pager, next"-->
                           <!--:small="size === 'mini' ? true : false"-->
                           <!--background-->
                           <!--@size-change="handleSizeChange"-->
                           <!--@current-change="handleCurrentChangeP"-->
                           <!--:total="parseInt(total,10)"-->
                           <!--:current-page="pageNo"-->
                           <!--:pager-count="5"-->
                           <!--:page-sizes="[10,50,100]"-->
                           <!--:page-size="pageSize">-->
            <!--</el-pagination>-->
        <!--</div>-->
        <!--&lt;!&ndash;<cx-search-set v-if="searchSetV" :visible="searchSetV" :allData="searchAllData" :showData="searchShowData"&ndash;&gt;-->
                       <!--&lt;!&ndash;@ok="searchSetOk" @close="searchSetV = false"></cx-search-set>&ndash;&gt;-->
    <!--</div>-->
<!--</template>-->

<!--<script lang="ts">-->
    <!--import {dateFormat, priceFormat} from '@/utils/index';-->
    <!--import {Component, Vue, Prop, Watch} from 'vue-property-decorator';-->
    <!--import {Getter} from 'vuex-class';-->
    <!--import tableColumn from './tableColumn.vue';-->

    <!--@Component({-->
        <!--components: {-->
            <!--tableColumn,-->
        <!--}-->
    <!--})-->
    <!--export default class CxTable extends Vue {-->
        <!--@Prop() public pageSizeDefault?: number; // 默认表格一页条数-->
        <!--@Prop() public addUpdateUrl: any; // 行内编辑 新增修改的 url-->
        <!--@Prop() public btnText?: string; // 表格按钮前的文字-->
        <!--@Prop({-->
            <!--default: 'table',-->
        <!--}) public tableRef: any; // 表格的ref 默认table-->

        <!--// 表格列选项 如 [{prop:"orderResourceStr",label:"订单来源", width:"200"}] 字段&#45;&#45;名称&#45;&#45;宽度  defined：true为自定义单元格定义 配合插槽使用-->
        <!--@Prop() public colums: any;-->
        <!--@Prop() public height?: number; // 表格高度-->
        <!--@Prop({-->
            <!--default: false,-->
        <!--}) public editor?: any; // 是否行内编辑-->
        <!--@Prop({-->
           <!--default: false,-->
        <!--}) public noSetBtn?: boolean; // 表格设置按钮是否显示-->
        <!--@Prop({-->
            <!--default: false,-->
        <!--}) public noPagination?: boolean; // 是否显示分页 默认显示-->
        <!--@Prop({-->
            <!--default: false,-->
        <!--}) public noCheckbox: any; // 是否显示checkbox-->
        <!--@Prop({-->
            <!--default: false,-->
        <!--}) public noAction: any; // 是否显示 右边操作按钮一栏 默认显示-->
        <!--@Prop() public requsetData: any; // 表格查询 条件参数-->
        <!--@Prop() public tableDataflag?: string; // 监听其变化 去刷新表格数据-->
        <!--@Prop() public url?: string; // 接口地址-->

        <!--@Prop() public selected: any; // 被点击的一行数据-->
        <!--@Prop({-->
            <!--default: false,-->
        <!--}) public isSr?: boolean; // 是否显示序号 默认不显示-->

        <!--// 按钮显示 如[{id: 'add',name: '新增',disabled: false,selectType: 'all'}] selectType：all所有时候都能点击 selectMinOne表格多选复选框时候能点击 selectOne表格被点击时能点击-->
        <!--@Prop() public buttons: any;-->


        <!--@Prop({-->
            <!--default: false,-->
        <!--}) public filterable?: boolean; // 是否显示表格前端搜索功能-->

        <!--@Prop() public filterItem: any; // filterable 时搜索哪些字段-->

        <!--@Prop({-->
            <!--default: false,-->
        <!--}) public noSelect?: boolean; // 选中不高亮-->

        <!--@Prop() public datas: any; // 不走ajax 直接获取的数据-->

        <!--@Prop() public sizeType?: string; // 尺寸大小 否则默认size-->

        <!--@Prop() public name?: string; // 查询设置标识-->

        <!--@Prop() public beforeSave: any; // 保存之前 本地保存-->

        <!--@Prop() public btnClass?: string; // 按钮前 文字样式class-->
        <!--@Prop() public tableClass?: string; // table的class-->
        <!--@Prop() public axiosType?: string; // 查询的 ajax类型-->

        <!--@Prop() public dialog: any; // 行内编辑需要的参数-->
        <!--@Prop() public tableDataFormat: any; // 表格数据格式化 参数 datas-->
        <!--@Prop() public selectable: any; // checkbox 是否禁用-->

        <!--@Prop({-->
            <!--default: false,-->
        <!--}) public allEditor: any; // 全部编辑设置-->
        <!--@Prop({-->
            <!--default: 0,-->
        <!--}) public tableHeadHeight?: number; // 表格高度-->



        <!--@Getter public size: any;-->
        <!--@Getter public cHeight: any;-->




        <!--public addClick: boolean = false; // 是否是点击新增-->
        <!--public scrollIndex: number = 0; // 滚动的位置-->
        <!--public scrollTop: any = 0; // 滚动离顶部距离-->

        <!--public currentRow: any = null; // 高亮行的数据-->
        <!--public pageNo: number = 1; // 分页数-->
        <!--public pageSize: number = 10; // 分条数-->
        <!--public data: any = []; // 表格数据-->
        <!--public total: number = 0; // 数据总条数-->
        <!--public check: any = []; // 选中的数据-->
        <!--public selectedRow: any = {}; // 点击行的数据-->
        <!--public filterInput: string = ''; // 筛选值-->
        <!--public dataAll: any = []; // 查询出的所有数据-->

        <!--public searchSetV: boolean = false; // 表格设置弹框 是否显示-->
        <!--public searchAllData: any = []; // 表格设置所有数据-->
        <!--public searchShowData: any = []; // 表格设置显示数据-->

        <!--public columsTrue: any = []; // 真正的colums-->
        <!--public isEditor: boolean = false; // 是否编辑中-->
        <!--public editorRowId: string = ''; // 编辑行的id-->

        <!--public editorAddItem: any = ''; // 编辑新增的那行数据-->

        <!--public editorBtn: any = {-->
            <!--id: 'update',-->
            <!--name: 'lang.common.editor',-->
            <!--disabled: false,-->
            <!--icon: 'el-icon-edit',-->
            <!--selectType: 'selectOne',-->
        <!--}; // 编辑按钮的参数-->
        <!--public cellEditorProp: string = ''; // 全有编辑 还是 单格编辑-->






        <!--// @checkSelect(selection) 点击复选框事件 selection所有选中的复选框-->
        <!--// @select(row) 点击行事件 row该行数据-->
        <!--// 插槽：<div slot="id"(字段自定义的field)  slot-scope="scope" @click.stop="() => goDetail(scope.row)" ></div>  row行数据 value格数据 index行号 data所有的数据 在colums需要加defined:true-->


        <!--// 监听本地表格数据变化 给于赋值-->
        <!--@Watch('datas', { immediate: true, deep: true })-->
        <!--private changeDatas(val: any): void {-->
            <!--if (!this.url) {-->
                <!--this.$set(this, 'data', val);-->
            <!--}-->
        <!--}-->

        <!--// 监听 查询事件-->
        <!--@Watch('tableDataflag', { immediate: false, deep: true })-->
        <!--private changeTableDataflag(val: string): void {-->
            <!--if (val.split(',')[1] === '0') {-->
                <!--this.getTable();-->
            <!--} else {-->
                <!--this.getTable(parseInt(val.split(',')[1], 10));-->
            <!--}-->
        <!--}-->


        <!--// 监听 本地筛选-->
        <!--@Watch('filterInput', { immediate: false, deep: true })-->
        <!--private changeFilterInput(val: string): void {-->
            <!--let res: any[] = [];-->
            <!--if (this.filterItem && this.filterItem.length > 0) {-->
                <!--res = this.filterItem;-->
            <!--} else {-->
                <!--res = this.colums.map((it: any) => (it.prop));-->
            <!--}-->
            <!--const resDatas = this.dataAll.filter((it: any) => {-->
                <!--return res.filter((its: any) => (it[its].indexOf(val) > -1)).length > 0;-->
            <!--});-->
            <!--this.data = resDatas;-->
        <!--}-->




        <!--private mounted() {-->
            <!--// console.log(priceFormat(293849382.28))-->
            <!--if (this.pageSizeDefault) {-->
                <!--this.pageSize = this.pageSizeDefault;-->
            <!--}-->
            <!--setTimeout(() => {-->
                <!--const session = JSON.parse(localStorage.getItem('colums') as any);-->
                <!--if (session[this.name as string]) {-->
                    <!--const showSearch = session[this.name as string];-->
                    <!--if (showSearch.right.length < 7) {-->
                        <!--showSearch.right[showSearch.right.length - 1].width = false;-->
                    <!--}-->
                    <!--this.columsTrue = showSearch.right;-->
                <!--} else {-->
                    <!--this.columsTrue = this.colums;-->
                <!--}-->
            <!--}, 0);-->
        <!--}-->


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


        <!--// 查询设置-->
        <!--private searchSet() {-->
            <!--const session: any = JSON.parse(localStorage.getItem('colums') as any);-->
            <!--const AllData = JSON.parse(JSON.stringify(this.colums));-->
            <!--const showSearch = session[this.name as string];-->
            <!--if (!showSearch) {-->
                <!--this.searchShowData = AllData;-->
            <!--} else {-->
                <!--this.searchAllData = showSearch.left;-->
                <!--this.searchShowData = showSearch.right;-->
            <!--}-->
            <!--this.searchSetV = true;-->
        <!--}-->

        <!--// 查询设置确定-->
        <!--private searchSetOk(data1: any, data: any) {-->
            <!--const res = data.map((it: any) => ({field: it.field, name: it.name}));-->
            <!--const session: any = JSON.parse(localStorage.getItem('colums') as any);-->
            <!--session[this.name as string] = {left: data, right: data1};-->
            <!--localStorage.setItem('colums', JSON.stringify(session));-->
            <!--if (data1.length < 7) {-->
                <!--data1[data1.length - 1].width = false;-->
            <!--}-->
            <!--this.columsTrue = data1;-->
            <!--this.searchSetV = false;-->
        <!--}-->

        <!--// 获取筛选框-->
        <!--private getInputName() {-->
            <!--if (this.columsTrue) {-->
                <!--if (this.filterItem && this.filterItem.length > 0) {-->
                    <!--let res = '';-->
                    <!--this.filterItem.forEach((it: any) => {-->
                        <!--const index = this.columsTrue.findIndex((its: any) => (its.prop === it));-->
                        <!--res += res !== '' ? `或${this.columsTrue[index].label}` : this.columsTrue[index].label;-->
                    <!--});-->
                    <!--return `请输入${res}`;-->
                <!--} else {-->
                    <!--return `请输入搜索内容`;-->
                <!--}-->
            <!--}-->
        <!--}-->

        <!--// 按钮点击-->
        <!--private buttonClick(id: any, row: any, prop: any, it: any) {-->
            <!--this.cellEditorProp = prop || 'all';-->
            <!--if (id === 'update') {-->
                <!--this.$emit('select', row); // 点击行事件 row该行数据-->
            <!--}-->
            <!--if (this.editor) {-->
                <!--this.editorClick(id, row);-->
            <!--}-->
            <!--if (it && it.onClick) {-->
                <!--it.onClick(row);-->
            <!--} else {-->
                <!--this.$emit('buttonClick', id, row);-->
            <!--}-->
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

        <!--// 重置表格-->
        <!--private reset(row: any, option: any) {-->
            <!--console.log(option);-->
            <!--if (option && option.resetCallback) {-->
                <!--option.resetCallback(row, option, this);-->
                <!--this.addClick = false;-->
            <!--} else {-->
                <!--this.isEditor = false;-->
                <!--this.addClick = false;-->
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

        <!--// 获取表格-->
        <!--private getTable(pageNo: number = this.pageNo, pageSize: number = this.pageSize, requsetData: any = this.requsetData) {-->
            <!--if (!this.datas) {-->
                <!--this.pageNo = pageNo;-->
                <!--this.pageSize = pageSize;-->
                <!--const pageShow = this.noPagination ? {} : {pageNo, pageSize};-->
                <!--const kongRes: any = {};-->
                <!--for (const i in requsetData) {-->
                    <!--if (requsetData[i] !== '') {-->
                        <!--kongRes[i] = requsetData[i];-->
                    <!--}-->
                <!--}-->
                <!--this.getAxios(this.url, kongRes, pageShow).then((dataRes: any) => {-->
                    <!--// 清空行内编辑-->
                    <!--if (this.editor) {-->
                        <!--this.editorAddItem = '';-->
                        <!--this.editorRowId = '';-->
                        <!--this.isEditor = false;-->
                        <!--this.addClick = false;-->
                    <!--}-->
                    <!--let data = dataRes;-->

                    <!--if (this.tableDataFormat) {-->
                        <!--data = this.tableDataFormat(dataRes);-->
                    <!--}-->
                    <!--const dataList = data && Array.isArray(data) ? data : data && data.list && Array.isArray(data.list) ? data.list : [];-->
                    <!--this.dataAll = dataList;-->
                    <!--if (dataList.length > 100000) {-->
                        <!--console.log(dataList.slice(0, 200));-->
                        <!--this.scrollTop = 0;-->
                        <!--this.$set(this, 'data', dataList.slice(0, 200));-->
                        <!--this.data = dataList.slice(0, 200);-->
                        <!--const boxHeight = (document.querySelector('.el-table__row&#45;&#45;striped') as any).offsetHeight;-->
                        <!--setTimeout(() => {-->
                            <!--(document.querySelector('.el-table__fixed-body-wrapper .isFitE') as any).style.height = ((dataList.length - 200) * boxHeight) + 'px';-->
                            <!--(document.querySelector('.el-table__body-wrapper .isFitE') as any).style.height = ((dataList.length - 200) * boxHeight) + 'px';-->
                        <!--}, 0);-->


                        <!--(document.querySelector('.el-table__body-wrapper') as any).addEventListener('scroll', this.onScroll.bind(this, dataList));-->
                    <!--} else {-->
                        <!--// document.querySelector('.el-table__body-wrapper').removeEventListener('scroll', this.onScroll.bind(this, dataList));-->
                        <!--this.data = dataList;-->
                    <!--}-->
                    <!--// this.dataAll = dataList-->
                    <!--// this.data = dataList-->

                    <!--this.total = data.total || 0;-->
                    <!--if (this.selected && this.selected.id) {-->
                        <!--let num = -1;-->
                        <!--dataList.forEach((it: any, index: number) => {-->
                            <!--if (it.id === this.selected.id) {-->
                                <!--num = index;-->
                            <!--}-->
                        <!--})-->
                        <!--(this.$refs[this.tableRef] as any).setCurrentRow(dataList[num]);-->
                        <!--this.$emit('setSelected', dataList[num]);-->
                    <!--}-->
                    <!--if (this.buttons && this.buttons.length > 0) {-->
                        <!--this.buttons.forEach((it: any) => {-->
                            <!--if (it.name === 'lang.common.download' && it.selectType === 'right') {-->
                                <!--it.disabled = this.data.length === 0;-->
                            <!--} else if (it.minCheckOne) {-->
                                <!--it.disabled = true;-->
                            <!--}-->
                        <!--});-->
                    <!--}-->
                    <!--this.$emit('onSuccessLoad', this.data);-->
                <!--});-->
            <!--}-->
        <!--}-->

        <!--// 滚动时 事件-->
        <!--private onScroll(dataList: any) {-->
            <!--const box: any = document.querySelector('.el-table__body-wrapper');-->
            <!--const fixFitStartHeight = (document.querySelector('.el-table__fixed-body-wrapper .isFitS') as any).style.height;-->
            <!--const fixFitEndHeight = (document.querySelector('.el-table__fixed-body-wrapper .isFitE') as any).style.height;-->
            <!--const boxHeight = (document.querySelector('.el-table__row&#45;&#45;striped') as any).offsetHeight;-->
            <!--const index = Math.floor(box.scrollTop / (boxHeight * 100));-->
            <!--if (index !== this.scrollIndex) {-->
                <!--this.scrollIndex = index;-->

                <!--setTimeout(() => {-->
                    <!--(document.querySelector('.el-table__fixed-body-wrapper .isFitS') as any).style.height = index * boxHeight * 50 + 'px';-->
                    <!--(document.querySelector('.el-table__body-wrapper .isFitS') as any).style.height = index * boxHeight * 50 + 'px';-->
                    <!--(document.querySelector('.el-table__fixed-body-wrapper .isFitE') as any).style.height = (dataList.length - 200 - 50 * index) * boxHeight + 'px';-->
                    <!--(document.querySelector('.el-table__body-wrapper .isFitE') as any).style.height = (dataList.length - 200 - 50 * index) * boxHeight + 'px';-->
                <!--}, 0);-->

                <!--this.$set(this, 'data', dataList.slice(50 * index, 200));-->

            <!--}-->
            <!--this.scrollTop = box.scrollTop;-->
        <!--}-->


        <!--// axios重置-->
        <!--private getAxios(url: string | undefined, kongRes: any, pageShow: any) {-->
            <!--if (this.axiosType === 'get') {-->
                <!--return this.$ajax({-->
                    <!--url: this.url,-->
                    <!--params: {...kongRes, ...pageShow},-->
                    <!--method: 'get',-->
                <!--});-->
            <!--} else if (this.axiosType === 'post') {-->
                <!--return this.$ajax({-->
                    <!--url: this.url,-->
                    <!--params: {...kongRes, page: {-->
                            <!--pageNum: pageShow.pageNo,-->
                            <!--pageSize: pageShow.pageSize,-->
                        <!--}},-->
                    <!--method: 'post',-->
                <!--});-->
            <!--} else if (this.axiosType === 'get1') {-->
                <!--return this.$ajax({-->
                    <!--url: this.url,-->
                    <!--params: {...kongRes, ...pageShow, pageNum: pageShow.pageNo, pageSize: pageShow.pageSize},-->
                    <!--method: 'get',-->
                <!--});-->
            <!--} else if (this.axiosType === 'post1') {-->
                <!--return this.$ajax({-->
                    <!--url: this.url,-->
                    <!--params: {...kongRes, pageNum: pageShow.pageNo, pageSize: pageShow.pageSize},-->
                    <!--method: 'post',-->
                <!--});-->
            <!--}-->
        <!--}-->

        <!--// 高亮设置-->
        <!--private handleCurrentChange(val: any) {-->
            <!--this.currentRow = val;-->
        <!--}-->

        <!--// 分页点击-->
        <!--private handleSizeChange(val: any) {-->
            <!--this.pageSize = val;-->
            <!--this.getTable(undefined, val);-->
            <!--// this.buttons.forEach(it => {-->
            <!--//   if(it.selectType !== 'all') {-->
            <!--//     it.disabled = true-->
            <!--//   }-->
            <!--// })-->
        <!--}-->
        <!--private handleCurrentChangeP(val: any) {-->
            <!--this.pageNo = val;-->
            <!--this.getTable(val);-->
            <!--// this.buttons.forEach(it => {-->
            <!--//   if(it.selectType !== 'all') {-->
            <!--//     it.disabled = true-->
            <!--//   }-->
            <!--// })-->
        <!--}-->


        <!--// 点击复选框事件-->
        <!--private selectChange(selection: any) {-->
            <!--if (this.buttons && this.buttons.length > 0) {-->
                <!--this.buttons.forEach((it: any) => {-->
                    <!--if (it.minCheckOne) {-->
                        <!--it.disabled = selection.length === 0;-->
                    <!--}-->
                <!--});-->
            <!--}-->
            <!--this.$emit('checkSelect', selection); // 点击复选框事件 selection所有选中的复选框-->
        <!--}-->

        <!--// 点击行事件-->
        <!--private rowClick(row: any) {-->
            <!--this.selectedRow = row;-->
            <!--if (this.buttons && this.buttons.length > 0) {-->
                <!--this.buttons.forEach((it: any) => {-->
                    <!--if (it.selectType === 'selectOne') {-->
                        <!--it.disabled = (row === undefined);-->
                    <!--}-->
                <!--});-->
            <!--}-->
            <!--this.$emit('select', row); // 点击行事件 row该行数据-->
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
    <!--.cell-editor {-->
        <!--float: right;-->
        <!--width: 80px;-->
        <!--padding-left: 10px;-->
    <!--}-->
    <!--.condition-style {-->
        <!--display: table-cell;-->
        <!--vertical-align: middle;-->
        <!--width: calc(100% - 100px);-->
    <!--}-->
<!--</style>-->
