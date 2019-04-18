<template>
    <el-form @submit.native.prevent :inline="true" :label-width="labelWidth + 'px'" :model="ruleForm"
             class="form-inline search-form" :rules="rules" :ref="ruleId">
        <template v-for="(item,i) in formData">
            <cx-condition type="search" :ref="item.field" :key="i" :option="item" :form="ruleForm"
                          @enter="onSubmit(ruleId)"></cx-condition>
        </template>
        <div :style="{float: 'right', 'margin-top': size === 'small' ? '1px' : size === 'mini' ? '3px' : '0px', lineHeight: '40px'}">
            <el-button class="blue-line onFocus" c v-if="!noSearchButton" :size="size" @click="onSubmit(ruleId)">
                <i class="iconfont el-icon-search"></i>
                {{$t('lang.common.query')}}
            </el-button>
            <el-button class="blue-line onFocus" v-if="!noSearchButton && !noResetButton" :size="size"
                       @click="onReset(ruleId)">
                <i class="icon iconfont icon-zhongzhi"></i>
                {{$t('lang.common.reset')}}
            </el-button>
            <el-button class="blue-line" v-if="!noSetButton" :size="size" icon="el-icon-setting"
                       @click="searchSet()"></el-button>
            <template v-for="(item,i) in otherButtons">
                <cx-button :size="size" :key="i" :option="item" @onClick="otherBtnClick(item)"/>
            </template>
        </div>
        <!--<ew-search-set v-if="searchSetV" :visible="searchSetV" :allData="searchAllData" :showData="searchShowData"-->
                       <!--@ok="searchSetOk" @close="searchSetV = false"></ew-search-set>-->
    </el-form>
</template>
<script lang="ts">
    import CxCondition from '../condition/condition.vue';
    import CxButton from '../button/button.vue';
    import {Component, Vue, Prop} from 'vue-property-decorator';
    import { Getter} from 'vuex-class';

    @Component({
        components: {
            CxCondition,
            CxButton,
        },
    })
    export default class CxSearch extends Vue {
        @Getter public size: any;
        @Prop() private ruleId!: any; // 验证id
        @Prop() private option!: object[]; // 查询项
        @Prop() private formlist!: any; // 查询项的值
        @Prop() private ruleslist!: any; // 验证
        @Prop() private otherButtons!: object[]; // 其他按钮
        @Prop() private name!: string; // 搜索框名称
        @Prop() private labelWidth!: number; // 每个查询项字体宽度
        @Prop({
            default: false,
        }) private noSetButton!: boolean; // 不显示设置按钮
        @Prop({
            default: false,
        }) private noSearchButton!: boolean; // 不显示查询清空按钮
        @Prop({
            default: false,
        }) private noResetButton!: boolean; // 不显示查询清空按钮


        private searchSetV: boolean = false; // 搜索框筛选显示
        private searchAllData: object[] = []; // 所有搜索条件
        private searchShowData: object[] = []; // 显示的搜索条件
        private ruleForm: any = {}; // 值
        private rules: any = {}; // 校验
        private formData: any = []; // 搜索参数项




        private created() {
            this.ruleForm = this.formlist;
            this.rules = this.ruleslist;
        }

        private mounted() {
            this.formData = this.option;
            // let session = JSON.parse(sessionStorage.getItem('search'))
            // let showSearch = session[this.name]
            // if(showSearch) {
            //   this.formData = showSearch.right
            // }
            // else {
            //   this.formData = this.option
            // }
        }
        // 查询设置
        private searchSet() {
            const session = JSON.parse(sessionStorage.getItem('search') as any);
            const AllData = JSON.parse(JSON.stringify(this.option));
            const showSearch = session[this.name];
            if (!showSearch) {
                this.searchShowData = AllData;
            } else {
                this.searchAllData = showSearch.left;
                this.searchShowData = showSearch.right;
            }
            this.searchSetV = true;
        }


        // 查询设置确定
        private searchSetOk(data1: object[], data: object[]) {
            const session = JSON.parse(sessionStorage.getItem('search') as any);
            session[this.name] = {left: data, right: data1};
            sessionStorage.setItem('search', JSON.stringify(session));
            this.formData = data1;
            this.searchSetV = false;
        }

        // 查询
        private onSubmit(formName: any) {
            (this.$refs[formName] as any).validate((valid: boolean) => {
                if (valid) {
                    this.$emit('goSearch');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }

        // 清空
        private onReset(formName: any) {
            (this.$refs[formName] as any).resetFields();
            this.$emit('goReset');
        }


        // 其他按钮点击
        private otherBtnClick(item: any) {
            if (item.rule) {
                const validateRes: any = this.$refs[this.ruleId];
                validateRes.validate((valid: boolean) => {
                    if (valid) {
                        item.onClick();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            } else {
                item.onClick();
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/css/rem";

    .search-form {
        .el-form-item__error {
            visibility: hidden;
        }
    }

    .form-inline {
        float: left;
        width: 100%;
        margin-bottom: 5px;
    }

    .blue-line {
        color: #409EFF !important;
        border-color: #409EFF !important;
    }

    .onFocus:focus {
        color: #409EFF !important;
        border-color: #409EFF !important;
        background-color: #fff !important;
    }

    .onFocus:hover {
        color: #409EFF !important;
        background-color: #c6e2ff !important;
        border-color: #c6e2ff !important;
    }
</style>
