<template>
    <transition name="sys">
        <div class="city">
            <template>
                <cx-search
                        name="home"
                        ruleId="ruleForm"
                        :option="searchOption.option"
                        @goSearch="goSearch"
                        @goReset="goSearchReset"
                        :formlist="searchOption.formlist"
                        :ruleslist="searchOption.ruleslist"
                        :labelWidth="142"
                        :noSetButton="true"
                />
            </template>
            <div class="one-table">
                <cx-table
                        ref="table"
                        :editor="editor"
                        name="city"
                        url="mdm-api/city/query"
                        :tableDataflag="mainTable.tableDataflag"
                        :requsetData="Object.assign(searchOption.formlist, {aa: 44})"
                        :colums="mainTable.colums"
                        :selected="mainTable.selected"
                        :buttons="mainTable.buttons"
                        :dialog="mainDialog"
                        axiosType="get"
                        @setSelected="(val) => this.mainTable.selected = val"
                        @checkSelect="mainCheckSelect"
                        @select="mainSelect"
                        @buttonClick="(id, row) => mainButtonClick(id, row)"
                />
            </div>
            <cx-dialog
                    v-if="mainDialog.mainDiologVisible && !editor"
                    :loading="mainDialog.loading"
                    :title="mainDialog.title"
                    :visible="true"
                    @closeDialog="closeMainDialog"
                    @ok="onOk"
                    width="470px"
            >
                <el-form
                        :inline="true"
                        label-width="142px"
                        :model="mainDialog.formlist"
                        class="form-inline"
                        :rules="mainDialog.ruleslist"
                        ref="mainDialog"
                >
                    <template v-for="(item,i) in mainDialog.option">
                        <cx-condition :key="i" :option="item" :form="mainDialog.formlist" type="dialog"></cx-condition>
                    </template>
                </el-form>
            </cx-dialog>
        </div>
    </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { pageOptions, pageBtnClick, dialogOk} from '@/mixins/index.js';




@Component({
    mixins: [
        pageOptions(
            // 搜索数据
            (that: any) => {
                return [
                    {
                        type: 'text',
                        name: 'lang.city.cityCode',
                        field: 'code',
                    },
                    {
                        type: 'otherCombo',
                        name: 'lang.city.regionCode',
                        field: 'regionCode',
                        url: 'mdm-api/region/',
                        comboValue: 'code',
                        comboText: 'name',
                        twoText: true,
                        filterable: true,
                        searchName: 'name',
                    },
                    {
                        type: 'otherCombo',
                        name: 'lang.city.countryCode',
                        field: 'countryCode',
                        url: 'mdm-api/city/country/',
                        comboValue: 'code',
                        comboText: 'name',
                        requestItems: ['regionCode'],
                    },
                    {
                        type: 'otherCombo',
                        name: 'lang.city.countryCode',
                        field: 'countryCode',
                        comboDatas: [{
                            code: 11,
                            name: 'demo1',
                        }, {
                            code: 22,
                            name: 'demo2',
                        }],
                        comboValue: 'code',
                        comboText: 'name',
                    },
                    {
                        type: 'date',
                        name: 'lang.city.cityCode',
                        field: 'from',
                        limit: (time: any) => {
                            return new Date(that.searchOption.formlist.to) < time;
                        },
                    },
                    {
                        type: 'date',
                        name: 'lang.city.cityCode',
                        field: 'to',
                        limit: (time: any) => {
                            return new Date(that.searchOption.formlist.from) > time;
                        },
                    },

                ];
            },
            // 按钮数据
            (that: any) => [
                {
                    id: 'add',
                    name: 'lang.common.addItem',
                    disabled: false,
                    selectType: 'all',
                },
                {
                    id: 'prev',
                    name: 'lang.common.preview',
                    disabled: false,
                    icon: 'icon-yulan',
                    selectType: 'selectOne',
                },
                {
                    id: 'update',
                    name: 'lang.common.editor',
                    disabled: false,
                    icon: 'el-icon-edit',
                    selectType: 'selectOne',
                },
                {
                    id: 'dele',
                    name: 'lang.common.delete',
                    disabled: false,
                    icon: 'el-icon-delete',
                    selectType: 'selectOne',
                },
                {
                    id: 'downLoad',
                    name: 'lang.common.upload',
                    disabled: false,
                    icon: 'el-icon-upload2',
                    selectType: 'right',
                    url: 'name666',
                    requstName: 'name666',
                },
                {
                    id: 'downLoad',
                    name: 'lang.common.qiehuan',
                    disabled: false,
                    icon: 'el-icon-sort',
                    selectType: 'right',
                    onClick: () => {
                        that.btnClick();
                    },
                },
            ],
            // 表格数据
            [
                {
                    prop: 'code',
                    label: 'lang.city.cityCode',
                    width: '300',
                },
                {
                    prop: 'name',
                    label: 'lang.city.cityName',
                    width: '300',
                    editor: true,
                },
                {
                    prop: 'regionName',
                    label: 'lang.city.regionName',
                    width: '140',
                },
                {
                    prop: 'countryName',
                    label: 'lang.city.countryName',
                    width: '200',
                },
                {
                    prop: 'createBy',
                    label: 'lang.city.createBy',
                    width: '200',
                },
                {
                    prop: 'createTime',
                    label: 'lang.city.createTime',
                    width: '200',
                },
                {
                    prop: 'lastUpdateBy',
                    label: 'lang.city.lastUpdateBy',
                    width: '200',
                },
                {
                    prop: 'lastUpdateTime',
                    label: 'lang.city.lastUpdateTime',
                    width: '200',
                },
            ],
            // 弹出框数据
            (that: any) => [
                // {
                //     type: 'date',
                //     name: 'lang.city.table1',
                //     field: 'createTime',
                //     afterTime: 'start',
                //     limit: (time: any) => {
                //         return new Date(that.mainDialog.formlist.validEndTime) < time;
                //     },
                //     required: true,
                // },
                {
                    type: 'text',
                    name: 'lang.city.cityCode',
                    field: 'code1',
                    maxlength: 32,
                    required: true,
                },
                {
                    type: 'pic',
                    name: 'lang.city.cityCode',
                    url: '/pic',
                    field: 'code',
                    maxlength: 32,
                    required: true,
                },
                {
                    type: 'number',
                    name: 'lang.city.cityName',
                    field: 'name',
                    maxlength: 50,
                    required: true,
                },
                {
                    type: 'otherCombo',
                    name: 'lang.city.regionName',
                    field: 'regionCode',
                    url: 'mdm-api/region/',
                    comboValue: 'code',
                    comboText: 'name',
                    required: true,
                    // disabledAll: true,
                    tableField: 'regionName',
                },
                {
                    type: 'otherCombo',
                    name: 'lang.city.countryName',
                    field: 'countryCode',
                    url: 'mdm-api/city/country/',
                    comboValue: 'code',
                    comboText: 'name',
                    required: true,
                    tableField: 'countryName',
                    requestItems: ['regionCode'],
                },
                { type: 'text', name: 'id', field: 'id', hidden: true },
            ],
        ),
        // 按钮点击事件
        pageBtnClick(
            // 修改弹出框不能修改的项的Index
            [],
            // 多选事件 name按钮id url服务地址 tip提示[动词，名词]
            [
                {
                    name: 'dele',
                    url: 'mdm-api/city/',
                },
            ],
        ),
        // 弹出框确定按钮事件
        dialogOk(
            // res 发送后台的数据 formList弹出框数据 title弹出框名字
            (formlist: any) => {
                console.log(formlist.code.split('  ')[0].split('\n'));
                return formlist;
            },
            'mdm-api/city/',
            // 新增接口
        ),

    ],
})
export default class Home extends Vue {
    private editor: boolean = false;

    // 切换
    private btnClick() {
        this.editor = !this.editor;
    }
}
</script>
