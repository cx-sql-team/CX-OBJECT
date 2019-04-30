<template>
    <div :class="['form-item']" v-show="!option.hidden"
         :style="{float: type !== 'tableEditor' && 'left', height: option.type === 'area' || option.type === 'checkbox' ? 'auto' : type === 'tableEditor' ? '40px' : type === 'search' ? size === 'medium'  ? '45px' : '39px' : (type === 'dialog' || type === 'skip') && size === 'medium' ? '58px'  :  '52px', clear: option.clearBoth && 'both', width: type === 'skip' &&  (totalWidth ? totalWidth : '50%'), paddingTop: '0px'}">
        <!--文本框-->
        <!--
        name：名称
        field：后台交互字段
        maxlength：最大长度 默认20
        disabled：是否可编辑
        width：输入框长度
        placeholder
        -->
        <template v-if="option.type === 'text'">
            <el-form-item :style="Object.assign({display: option.isHidden ? 'none' : 'inline-block'}, option.style)"
                          :label="type !== 'search' && type !== 'tableEditor' ? $t(option.name)+ ':' : ''"
                          :prop="option.field" :ref="option.ref" @keyup.enter.native="search">
                <el-input :clearable="!option.nolearable"
                          @change="(value) => option.change && option.change(value)"
                          :maxlength="option.maxlength ? option.maxlength : 30"
                          :size="size"
                          :disabled="option.disabled ? true : false"
                          v-model="form[option.field]"
                          :placeholder="type === 'search' ? $t(option.name) : ''"
                          :style="{width: type !== 'skip' && type !== 'tableEditor' ? option.width ? option.width + 'px' :  width+'px' : '100%'}"
                />
            </el-form-item>
        </template>
        <!--纯文字-->
        <!--
        name：名称
        content: 内容
        width：输入框长度
        bold：是否加粗
        color: 颜色
        -->
        <template v-if="option.type === 'span'">
            <el-form-item :style="{display: option.isHidden ? 'none' : 'inline-block'}" :prop="option.field"
                          :ref="option.ref" @keyup.enter.native="search">
                <span slot="label">
                    <el-checkbox style="margin-right: 5px" :size="size" :disabled="option.checkboxDisabled"
                                 v-if="option.checkbox && !option.checkbox.hidden" v-model="option.checkbox.default"
                                 @change="option.checkbox.change"></el-checkbox>
                    {{type !== 'search' && type !== 'tableEditor' ? $t(option.name)+ ' :' : ''}}
                </span>
                <div :style="{width: option.width ? option.width + 'px' : '100%', fontWeight: option.bold && 'bold', color: option.color && option.color, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}"
                     :title="form[option.field]">
                    {{option.dateFormatter ? dateFormatter(form[option.field],option.dateFormatter) :
                    option.numberFormatter ? numberFormatter(form[option.field], option.numberFormatter, option.field) :
                    form[option.field]}}
                </div>
            </el-form-item>
        </template>
        <!--标题-->
        <!--
        -->
        <template v-if="option.type === 'title'">
            <el-form-item :style="{display: option.isHidden ? 'none' : 'inline-block'}" :label="$t(option.name)"
                          :prop="option.field" :ref="option.ref" @keyup.enter.native="search">

            </el-form-item>
        </template>
        <!--数字-->
        <!--
        name：名称
        field：后台交互字段
        min：最小值 默认1
        max：最大值 默认99999999999
        precision：保留小数位 默认0
        afterText：数字框后显示文字 如%
        disabled：是否可编辑
        width：输入框长度
        -->
        <template v-if="option.type === 'number'">
            <el-form-item :label="type !== 'search' && type !== 'tableEditor' ? $t(option.name)+ ':' : ''"
                          :prop="!tableData ? option.field : (option.field + tableIndex)" :ref="option.ref"
                          @keyup.enter.native="search">
                <div :style="{width: type !== 'skip' && type !== 'tableEditor' ? option.width ? option.width + 'px' :  width+'px' : '100%'}">
                    <template v-if="!tableData">
                        <el-input-number v-model="form[option.field]"
                                         :size="size"
                                         controls-position="right"
                                         :style="{width: option.afterText ? 'calc(100% - 30px)' : '100%'}"
                                         :min="option.min ? option.min : 0"
                                         :controls="!option.noControlBtn"
                                         :disabled="option.disabled ? true : false"
                                         :max="option.max ? option.max : 99999999999"
                                         :precision="option.precision ? option.precision:option.price? 5 : 0"
                                         @change="(val) => option.change && option.change(val)"
                        >
                        </el-input-number>
                    </template>
                    <template v-else>
                        <el-input-number v-model="tableData[tableIndex][[option.field]]"
                                         :size="size"
                                         controls-position="right"
                                         :controls="!option.noControlBtn"
                                         :style="{width: option.afterText ? 'calc(100% - 30px)' : '100%'}"
                                         :min="option.min ? option.min : 0"
                                         :disabled="option.disabled ? true : false"
                                         :max="option.max ? option.max : 99999999999"
                                         :precision="option.precision ? option.precision:option.price? 5 : 0"
                                         @change="(val) => option.change && option.change(val, tableData[tableIndex])"
                        >
                        </el-input-number>
                    </template>
                    <template v-if="option.afterText">
                        <span style="margin-left: 10px">{{option.afterText}}</span>
                    </template>
                </div>
            </el-form-item>
        </template>
        <!--数据字典下拉框-->
        <!--
        name：名称
        field：后台交互字段
        disabled：是否可编辑
        width：输入框长度
        url：数据字典的值
        multiple：是否多选
        change: 选择时间val为选中值
        -->
        <template v-if="option.type === 'combo'">
            <el-form-item :label="$t(option.name)" :prop="option.field" :ref="option.ref" @keyup.enter.native="search">
                <el-select
                        clearable
                        :multiple="option.multiple && true"
                        :collapse-tags="option.multiple && true"

                        v-model="form[option.field]"
                        filterable :size="size"
                        :disabled="option.disabled ? true : false"
                        :style="{width: option.width ? option.width  + 'px' :  width+'px'}"
                        @change="(val) => comboChange(val, option)">
                    <el-option
                            v-for="item in comboData"
                            :key="item.value"
                            :label="item.valueDesc"
                            :value="item.value"
                            :disabled="item.disabled"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
        </template>
        <!--非数据字典下拉框-->
        <!--
        name：名称
        field：后台交互字段
        disabled：是否可编辑
        width：输入框长度
        url：数据字典的值
        multiple：是否多选
        filterable：是否搜索调用后台
        comboValue：下拉框值的字段
        comboText：下拉框显示字段
        placeholder
        requestItems: 联级查询 依赖上面的filed
        requestItemKeys: 联级查询 key值字段
        -->
        <template v-if="option.type === 'otherCombo'">
            <el-form-item :label="type !== 'search' && type !== 'tableEditor' ? $t(option.name)+ ':' : ''"
                          :prop="option.field" :ref="option.ref" @keyup.enter.native="search">
                <el-select
                        :clearable="option.noClearable ? false : true"
                        :multiple="option.multiple && true"
                        :collapse-tags="option.multiple && true"
                        :placeholder="type === 'search' ? $t(option.name) : ''"
                        :remote="option.filterable"
                        :remote-method="option.filterable && remoteMethod"
                        :loading="loading"
                        v-model="form[option.field]"
                        filterable
                        :size="size"
                        :disabled="option.disabled ? true : false"
                        :style="{width: type !== 'skip' && type !== 'tableEditor' ? option.width ? option.width + 'px' :  width+'px' : '100%'}"
                        @visible-change="VisibleChange"
                        @change="(val) => comboChange(val, option)">
                    <el-option
                            v-for="(item, i) in  comboData"
                            :key="i"
                            :label="option.twoText ? (item[option.comboValue] + '-' + item[option.comboText]) : option.showText ?  item[option.showText]   : item[option.comboText]"
                            :value="Array.isArray(option.comboValue) ? item[option.comboValue[0]] + ',' + item[option.comboValue[1]]  : item[option.comboValue]">
                        <template v-if="!option.twoText">
                            {{item[option.comboText]}}
                        </template>
                        <template v-else>
                            <span style="float: left; margin-right: 20px">{{ item[option.comboValue] }}</span>
                            <span style="float: right; margin-left: 20px; color: #8492a6; font-size: 13px">{{ item[option.comboText] }}</span>
                        </template>
                    </el-option>
                </el-select>
            </el-form-item>
        </template>
        <!--自动下拉框选择-->
        <!--
        name：名称
        field：后台交互字段
        disabled：是否可编辑
        width：输入框长度
        url：数据字典的值
        multiple：是否多选
        filterable：是否搜索调用后台
        comboValue：下拉框值的字段
        comboText：下拉框显示字段
        placeholder
        requestItems: 联级查询 依赖上面的filed
        requestItemKeys: 联级查询 key值字段
        -->
        <template v-if="option.type === 'autoCombo'">
            <el-form-item :label="type !== 'search' && type !== 'tableEditor' ? $t(option.name)+ ':' : ''"
                          :prop="option.field" :ref="option.ref" @keyup.enter.native="search">
                <el-autocomplete
                        popper-class="my-autocomplete"
                        v-model="form[option.field]"
                        :style="{width: option.width ? option.width  + 'px' : option.range ? (width*2 + 12 + (labelWidth ? labelWidth : 90))+ 'px' : width+'px'}"
                        :fetch-suggestions="querySearchAsync"
                        :size="size"
                        :placeholder="type === 'search' ? $t(option.name) : ''"
                >
                    <template slot-scope="{ item }">
                        <p class="name">{{ item.value }}</p>
                        <p class="addr">{{ item.text }}</p>
                    </template>
                </el-autocomplete>
            </el-form-item>
        </template>
        <!--年月日时分秒-->
        <!--
        name：名称
        field：后台交互字段
        disabled：是否可编辑
        width：输入框长度
        range：范围日期框
        limit：函数 判断日期是否可编辑 参数（time：日期值）
        hms:含时分秒
        -->
        <template v-if="option.type === 'datetime'">
            <el-form-item :label="$t(option.name)" :prop="option.field" :ref="option.ref">
                <el-date-picker
                        clearable
                        v-model="form[option.field]"
                        :size="size"
                        :style="{width: option.width ? option.width  + 'px' : option.range ? (width*2 + 12 + (labelWidth ? labelWidth : 90))+ 'px' : width+'px'}"
                        :type="option.range ?  'datetimerange' : 'datetime'"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        placeholder="选择日期"
                        :picker-options="pickerOptions2"
                >
                </el-date-picker>
            </el-form-item>
        </template>
        <!--年月日-->
        <!--
        name：名称
        field：后台交互字段
        disabled：是否可编辑
        width：输入框长度
        range：范围日期框
        limit：函数 判断日期是否可编辑 参数（time：日期值）
        hms:含时分秒
        -->
        <template v-if="option.type === 'date'">
            <el-form-item :label="type !== 'search' && type !== 'tableEditor' ? $t(option.name)+ ':' : ''"
                          :prop="option.field" :ref="option.ref">
                <el-date-picker
                        clearable
                        @change="(val) => option.onChange && option.onChange(val)"
                        v-model="form[option.field]"
                        :size="size"
                        :style="{width: type !== 'skip' && type !== 'tableEditor' ? option.width ? option.width + 'px' :  width+'px' : '100%'}"
                        :type="option.range ?  'daterange' : 'date'"
                        value-format="yyyy-MM-dd"
                        format="dd-MM-yyyy"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :placeholder="type === 'search' ? $t(option.name) : ''"
                        :picker-options="{
                          disabledDate(time) {
                            return option.limit ? option.limit(time.getTime()) : false;
                          }
                        }"
                >
                </el-date-picker>
            </el-form-item>
        </template>
        <!--时分秒-->
        <!--
        name：名称
        field：后台交互字段
        disabled：是否可编辑
        width：输入框长度
        range：范围日期框
        -->
        <template v-if="option.type === 'time'">
            <el-form-item :label="$t(option.name)" :prop="option.field" :ref="option.ref">
                <el-time-picker
                        clearable

                        v-model="form[option.field]"
                        :size="size"
                        :style="{width: option.width ? option.width  + 'px' : option.range ? (width*2 + 12 + 90)+ 'px' : width+'px'}"
                        :is-range="option.range"
                        value-format="HH:mm"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间">
                </el-time-picker>
            </el-form-item>
        </template>
        <!--复选框-->
        <!--
        name：名称
        field：后台交互字段
        disabled：是否可编辑
        width：输入框长度
        data：复选框数据 如[周一，周二，周三，周四，周五，周六]
        -->
        <template v-if="option.type === 'checkbox'">
            <el-form-item :label="$t(option.name)" :prop="!tableData ? option.field : option.field + tableIndex"
                          :ref="option.ref">
                <div :style="{width: type !== 'skip' && type !== 'tableEditor' ? option.width ? option.width + 'px' :  width+'px' : '100%'}">
                    <template v-if="!tableData">
                        <el-checkbox-group
                                v-model="form[option.field]"
                                :size="size"
                                @change="(val) => form[option.field] = val"
                        >
                            <el-checkbox :label="it" v-for="it in option.data" :key="it">{{it}}</el-checkbox>
                        </el-checkbox-group>
                    </template>
                    <template v-else>
                        <el-checkbox-group
                                v-model="tableData[tableIndex]"
                                :size="size"
                                @change="(val) => form[option.field] = val"
                        >
                            <el-checkbox :label="it" v-for="it in option.data" :key="it">{{it}}</el-checkbox>
                        </el-checkbox-group>
                    </template>
                </div>
            </el-form-item>
        </template>
        <!--滑块-->
        <!--
        name：名称
        field：后台交互字段
        disabled：是否可编辑
        width：输入框长度
        defaultValue: 默认值 默认为1
        -->
        <template v-if="option.type === 'switch'">
            <el-form-item :label="$t(option.name)" :prop="option.field" :ref="option.ref" @keyup.enter.native="search">
                <el-switch
                        :size="size"
                        :style="{width: option.width ? option.width :  width+'px'}"
                        v-model="form[option.field]"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        :active-value="1"
                        :inactive-value="0">
                </el-switch>
            </el-form-item>
        </template>
        <!--多行文本框-->
        <!--
        name：名称
        field：后台交互字段
        disabled：是否可编辑
        width：输入框长度
        maxlength：最大字数
        -->
        <template v-if="option.type === 'area'">
            <el-form-item :label="$t(option.name) + ':'" :prop="option.field" :ref="option.ref"
                          @keyup.enter.native="search">
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 4 }"
                        resize="none"
                        :disabled="option.disabled ? true : false"
                        :maxlength="option.maxlength ? option.maxlength : 2200"
                        :style="{width: type !== 'skip' && type !== 'tableEditor' ? option.width ? option.width + 'px' :  width+'px' : '100%'}"
                        v-model="form[option.field]">
                </el-input>
            </el-form-item>
        </template>
        <!--地址-->
        <!--
        name：名称
        field：后台交互字段
        disabled：是否可编辑
        width：输入框长度
        -->
        <template v-if="option.type === 'address'">
            <el-form-item :label="$t(option.name)" :prop="option.field" :ref="option.ref" @keyup.enter.native="search">
                <el-cascader
                        :size="size"
                        :style="{width: option.width ? option.width  + 'px' :  width+'px'}"
                        v-model="form[option.field]"
                        placeholder="可直接搜索"
                        :options="citys"
                        filterable
                ></el-cascader>
            </el-form-item>
        </template>
        <!--图标-->
        <!--
        name：名称
        field：后台交互字段
        disabled：是否可编辑
        width：输入框长度
        -->
        <template v-if="option.type === 'icon'">
            <el-form-item :label="$t(option.name)" :prop="option.field" :ref="option.ref">
                <el-select popper-class="icon-combo" clearable v-model="form[option.field]" filterable :size="size"
                           :style="{width: option.width ? option.width  + 'px' :  width-30+'px'}"
                           @keyup.enter.native="search">
                    <el-option
                            v-for="item in icons"
                            :key="item"
                            :label="item"
                            :value="item">
                        <span><i style="font-size: 18px;" :class="['icon', 'iconfont', item]"></i></span>
                    </el-option>
                </el-select>
                <i style="font-size: 18px; margin-left: 10px" :class="['icon', 'iconfont', form[option.field]]"></i>
            </el-form-item>
        </template>
        <!--上传图片-->
        <!--
        name：名称
        field：后台交互字段
        disabled：是否可编辑
        width：输入框长度
        picType：传入图片后台字段
        onSuccess：成功事件返回图片的值
        onpxove：删除图片事件
        如
        {type: 'pic', name:'人脸识别照片',picType: 'user', field:'faceImgUrl',onSuccess:(data, field) =>{
        this.mainDialog.formlist.faceImgUrl = data.data;
        }
        ,onpxove:() =>{
        this.mainDialog.formlist.faceImgUrl = '';
        }
        }
        -->
        <template v-if="option.type === 'pic'">
            <el-form-item :label="type !== 'search' && type !== 'tableEditor' ? $t(option.name)+ ':' : ''"
                          :prop="option.field" :ref="option.ref">
                <upload :opt="option" :form="form" :onlyPic="option.onlyPic"></upload>
            </el-form-item>
        </template>


        <template v-if="option.type === 'datatype'">
            <el-form-item :label="type !== 'search' ? $t(option.name)+ ':' : ''" :prop="option.field" :ref="option.ref">
                <el-date-picker
                        clearable
                        :disabled="option.disabled"
                        v-model="form[option.field]"
                        :size="size"
                        :style="{width: type !== 'skip' && type !== 'tableEditor' ? option.width ? option.width + 'px' :  width+'px' : '100%'}"
                        :type="option.dateType"
                        :placeholder="$t(option.name)"
                        :value-format="option.dateType === 'month' ? 'yyyyMM' : 'yyyy'"
                        @change="(val) => option.change && option.change(val)"
                >
                </el-date-picker>
            </el-form-item>
        </template>
    </div>
</template>
<script lang="ts">
    import { dateFormat, priceFormat} from '../../../utils';
    import upload from './type/upload.vue';
    import cityData from '../../../assets/js/cityData.js';
    import iconData from '../../../assets/js/iconData.js';
    import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
    import {Getter} from 'vuex-class';

    @Component({
       // upload,
        components: {
            upload,
        },
    })
    export default class CxCondition extends Vue {
        @Prop() public totalWidth!: number; // 总长度
        @Prop() public form!: any; // 表单值
        @Prop() public option!: any; // 表单参数
        @Prop() public type!: string; // 类型
        @Prop() public labelWidth!: number; // 字的长度
        @Prop() public tableData!: any; // 表格总数据
        @Prop() public tableIndex!: number; // 数据所在表格的行号

        @Getter public size: any;

        private icons: any = iconData;
        private citys: any = cityData;
        private authorization: string = '';
        private width: number = 245;
        private comboData: any = [];
        private checkbox: any = [];
        private loading: boolean = false;
        private switchVal: number = 1;



        // combodatas
        get comboDatas() {
            return this.option.comboDatas ? this.option.comboDatas : [];
        }
        @Watch('comboDatas', { immediate: true, deep: true })
        private changeComboDatas(val: string): void {
            if (val.length > 0) {
                this.$set(this, 'comboData', val);
            }
        }

        // combodatas 刷新下拉数据
        get isRefesh() {
            return this.option.isRefesh ? this.option.isRefesh : '';
        }
        @Watch('isRefesh', { immediate: false, deep: false })
        private changeIsRefesh(val: string): void {
            const res: any = {};
            if (this.option.requestItems) {
                this.option.requestItems.forEach((it: any) => {
                    res[it] = this.form[it];
                });
            }
            this.$ajax({
                url: this.option.url,
                params: {
                    ...res,
                    ...this.option.requestData,
                    pageNo: 1,
                    pageSize: 0,
                },
                method: 'get',
            }).then((data: any) => {
                const comboDataRes = data ? Array.isArray(data) ? data : Array.isArray(data.list) ? data.list : [] : [];
                this.comboData = comboDataRes;
            });
        }


        // 联级查询
        get requestData() {
            return this.option.requestItems ? this.option.requestItems.map((it: any) => (this.form[it])).toString() : '';
        }
        @Watch('requestData', { immediate: false, deep: false })
        private changeRequestData(val: string): void {
            const res: any = {};
            this.form[this.option.field] = '';
            this.option.requestItems.forEach((it: any, index: number) => {
                if (this.option.requestItemKeys) {
                    res[this.option.requestItemKeys[index]] = this.form[it];
                } else {
                    res[it] = this.form[it];
                }
            });

            const resEnd =  {
                ...res,
                pageNo: 1,
                pageSize: 0,
            };

            this.$ajax({
                url: this.option.url,
                params: resEnd,
                method: 'get',
            }).then((data: any) => {
                const comboDataRes = data ? Array.isArray(data) ? data : Array.isArray(data.list) ? data.list : [] : [];
                this.comboData = comboDataRes;
            });
        }

        // 表单值
        get formData() {
            return this.form[this.option.field];
        }

        private created() {
            if (this.option.defaultValue) {
                this.form[this.option.field] = this.option.defaultValue;
            }

            this.checkbox = this.form[this.option.field];
            if (this.option.type === 'combo') {
                // this.$ajax({
                //     url: '/sysManager/systemCode/getSystemCodeByCodeType',
                //     params: {type: this.option.url}
                // }).then((data: any) => {
                //     if (this.option.disabledOptions) {
                //         const res = data.map((it: any) => {
                //             if (this.option.disabledOptions.includes(it.value)) {
                //                 it.disabled = true;
                //             }
                //             return it;
                //         });
                //         console.log(res);
                //         this.comboData = res;
                //     } else {
                //         this.comboData = data;
                //     }
                // });
            } else if (this.option.type === 'otherCombo' && this.option.url) {
                const res: any = {};
                if (this.option.requestItems) {
                    this.option.requestItems.forEach((it: any, index: number) => {
                        if (this.option.requestItemKeys) {
                            res[this.option.requestItemKeys[index]] = this.form[it];
                        } else {
                            res[it] = this.form[it];
                        }
                    });
                }

                this.$ajax({
                    url: this.option.url,
                    params: {
                        ...res,
                        ...this.option.requestData,
                        pageNo: 1,
                        pageSize: 0,
                    },
                    method: 'get',
                }).then((data: any) => {
                    const comboDataRes = data ? Array.isArray(data) ? data : Array.isArray(data.list) ? data.list : [] : [];
                    this.comboData = comboDataRes;
                    if (this.option.field === 'currencyCode' || this.option.field === 'currency') {
                        if (!this.form[this.option.field]) {
                            this.form[this.option.field] = 'USD';
                        }
                    }
                }).catch((err: any) => {
                    console.log(err);
                });
            } else if (this.option.type === 'otherCombo' && !this.option.url) {
                this.comboData = typeof this.option.comboDatas === 'string' ? this.$t(this.option.comboDatas) : this.option.comboDatas;
            }
        }


        private mounted() {
            this.width = this.size === 'small' || this.size === 'medium' ? 245 : 200;
            if (this.option.type === 'switch') {
                if (this.form[this.option.field] === '') {
                    this.switchVal = this.option.defaultValueNo ? 0 : 1;
                    this.form[this.option.field] = this.option.defaultValueNo ? 0 : 1;
                } else {
                    this.switchVal = parseInt(this.form[this.option.field].toString(), 10);
                }
            }
            this.authorization = sessionStorage.getItem('tenant') && JSON.parse((sessionStorage.getItem('tenant') as any)).token;
        }


        // 下拉框 动态搜索
        private querySearchAsync(queryString: string, cb: any) {
            if (queryString === '') {
                cb([]);
            } else {
                let obj: any = {kongRes: ''};
                if (this.option.searchName) {
                    obj[this.option.searchName] = queryString;
                } else {
                    obj.name = queryString;
                }
                if (this.option.requestItems) {
                    this.option.requestItems.forEach((it: any) => {
                        obj[it] = this.form[it];
                    });
                }
                if (this.option.requestData) {
                    obj = Object.assign({}, obj, this.option.requestData);
                }

                this.$ajax({
                    url: this.option.url,
                    params: obj,
                    method: 'get',
                }).then((data: any) => {
                    const res = data ? Array.isArray(data) ? data : Array.isArray(data.list) ? data.list : [] : [];
                    cb(res.length > 0 ? res.map((it: any) => ({
                        value: it[this.option.comboValue],
                        text: it[this.option.comboText],
                    })) : []);
                });
            }
        }
        // 下拉框事件
        private remoteMethod(val: string) {
            this.loading = true;
            let obj: any = {kongRes: ''};
            if (this.option.searchName) {
                obj[this.option.searchName] = val;
            } else {
                obj.name = val;
            }
            if (this.option.requestItems) {
                this.option.requestItems.forEach((it: any) => {
                    obj[it] = this.form[it];
                });
            }
            if (this.option.requestData) {
                obj = Object.assign({}, obj, this.option.requestData);
            }
            this.$ajax({
                url: this.option.url,
                params: obj,
                method: 'get',
            }).then((data: any) => {
                this.loading = false;
                const res = data ? Array.isArray(data) ? data : Array.isArray(data.list) ? data.list : [] : [];
                this.comboData = res;
                return res;
            });
        }
        private comboChange(val: string, option: any) {
            const isText = this.comboData.length > 0 ? this.comboData.find((it: any) => (it[option.comboValue] === val)) : '';
            const text = this.comboData.length > 0 ? isText ? isText[option.comboText] : '' : '';
            if (option.change) {
                option.change(val, text, isText);
            }
        }
        private search() {
            this.$emit('enter');
        }
        private VisibleChange(val?: boolean) {
            if (this.option.filterable && val === true) {
                this.remoteMethod('');
            }
        }
        private dateFormatter(val: number, formate: any) {
            if (!val && (val !== 0)) {
                return;
            }
            if (!formate) {
                return val;
            }
            if (formate === 'all') {
                return dateFormat('yyyy-MM-dd hh:mm:ss', val);
            }
            return dateFormat('dd-MM-yyyy', val);
        }
        private numberFormatter(val: string, type: any) {
            return priceFormat(val, type);
        }

    }
</script>

<style lang="scss">
    @import "../../../assets/css/rem";

    .pic-style {
        clear: both;
        height: 217px;

        .el-upload-list__item, .el-upload--picture-card {
            width: 168px;
            height: 168px;
            line-height: 168px;
        }

        .el-icon-upload-success {
            position: absolute;
            right: 11px;
        }
    }

    .icon-combo {
        width: 295px;

        .el-select-dropdown__item {
            float: left;
            width: 20%;
        }
    }

    .form-item {
        overflow: hidden;

        > div {
            width: 100%;

            .el-form-item__label {
                float: left;

            }

            .el-form-item__content {

                overflow: hidden;
                display: block;

                .el-form-item__error {
                    position: relative;
                    top: -2px;
                }

            }
        }

        .el-form-item__error {
            padding-top: 0px !important;
        }

        .el-checkbox {
            margin-left: 0px !important;
            margin-right: 20px;
        }
    }

    .my-autocomplete {
        li {
            line-height: normal !important;
            padding: 10px !important;

            .name {
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .addr {
                color: #b4b4b4;
                margin-top: 5px;
            }

            .highlighted .addr {
                color: #ddd;
            }
        }
    }

</style>

