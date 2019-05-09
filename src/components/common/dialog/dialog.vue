<template>
    <el-dialog :title="(titleBefore ? titleBefore : '') + (title.indexOf('lang.') > -1 ? $t(title) : title)" :visible="visible" @close="closeDialog"
               :width="width" style="margin-bottom: 20px" :append-to-body="innder" :close-on-click-modal="false">
        <template v-if="!isScroll">
            <slot></slot>
        </template>
        <template v-else>
            <vue-scroll :style="{height:(cHeight - 330) + 'px'}">
                <slot></slot>
            </vue-scroll>
        </template>
        <div slot="footer" class="dialog-footer">
            <el-button icon="el-icon-close" style="float: right; margin-left: 10px" :size="size" @click="closeDialog">
                {{$t('lang.common.close')}}
            </el-button>
            <template v-if="otherButtons && otherButtons.length > 0">
                <ew-button :otherStyle="{marginLeft: '10px'}" v-for="(it,index) in otherButtons" :key="index"
                           :option="it" @onClick="() => otherButtonsClick(it.id)"></ew-button>
            </template>
            <template v-else>
                <template v-if="title !== 'lang.common.preview' && notPreview">
                    <template v-if="okBtnOption">
                        <el-button :size="size" :loading="loading"
                                   :type="okBtnOption.type ? okBtnOption.type : 'primary'" @click="onOk">
                            <i :class="okBtnOption.icon.indexOf('el') > 0 ? [okBtnOption.icon] : ['icon', 'iconfont', okBtnOption.icon]"></i>
                            {{okBtnOption.name.indexOf('lang.') > -1 ? $t(okBtnOption.name) : okBtnOption.name}}
                        </el-button>
                    </template>
                    <template v-else>
                        <el-button :size="size" :loading="loading" type="primary" @click="onOk">
                            <i class="icon iconfont icon-baocun"></i>
                            {{$t('lang.common.save')}}
                        </el-button>
                    </template>
                </template>
                <template v-else>
                    &nbsp;
                </template>
            </template>
        </div>
    </el-dialog>
</template>
<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';
    import {Getter} from 'vuex-class';


    @Component
    export default class CxDialog extends Vue {
        @Prop({
            default: false,
        }) public visible?: boolean; // 是否显示弹框
        @Prop() public okBtnOption: any; // 点击确定按钮配置
        @Prop() public title: any; // 弹出框标题
        @Prop({
            default: '600px',
        }) public width: any; // 弹出框宽度
        @Prop() public loading?: boolean; // loading是否显示
        @Prop({
            default: false,
        }) public innder?: boolean; // 是否是表中表
        @Prop() public otherButtons: any; // 其他按钮配置
        @Prop() public otherButtonsClick: any; // 其他按钮点击事件
        @Prop({
            default: false,
        }) public isScroll: any; // 是否滚动条模式
        @Prop() public titleBefore?: string; // 标题前带的文字
        @Prop({
            default: true,
        }) public notPreview?: boolean; // 没有确定按钮


        @Getter public size: any;
        @Getter public cHeight: any;



        private closeDialog() {
            this.$emit('closeDialog'); // 关闭弹出框事件
        }


        private onOk() {
            this.$emit('ok'); // 点击弹出框按钮事件
        }
    }
</script>

