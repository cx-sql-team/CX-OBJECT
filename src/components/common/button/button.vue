<template>
    <div :style="Object.assign({}, {display: 'inline-block'}, otherStyle ? otherStyle : {})">
        <template v-if="option.url">
            <el-upload
                    :disabled="option.loading"
                    :on-change="changeLoading"
                    :headers="getHeader()"
                    class="upload-demo"
                    :action="getUrl()"
                    :name="option.requstName"
                    :on-success="success"
                    :data="option.data && getData(option.data)"
                    :on-error="error"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
            >
                <el-button :size="option.size || size" :loading="option.loading"
                           :type="option.type ? option.type : 'primary'" :disabled="option.disabled">
                    <i v-if="option.icon || option.id === 'add'"
                       :class="option.icon.indexOf('el') > 0 ? [option.icon] : ['icon', 'iconfont', option.icon]"></i>
                    {{option.name.indexOf('lang.') > -1 ? $t(option.name) : option.name}}
                </el-button>
            </el-upload>
        </template>
        <template v-else>
            <el-button :size="option.size || size" :loading="option.loading"
                       :type="option.type ? option.type : 'primary'" @click="onClick" :disabled="option.disabled">
                <i v-if="option.icon || option.id === 'add'"
                   :class="option.id === 'add' ? ['iconfont', 'el-icon-plus'] : option.icon.indexOf('el') > 0 ? [option.icon] : ['icon', 'iconfont', option.icon]"></i>
                {{option.name.indexOf('lang.') > -1 ? $t(option.name) : option.name}}
            </el-button>
        </template>
    </div>
</template>
<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';
    import {Getter} from 'vuex-class';


    @Component
    export default class CxButton extends Vue {
        @Prop() public option: any; // 按钮参数{ loading： 加载中，type：类型（默认primary），disabled：是否可点击，name：按钮名称}
        @Prop() public otherStyle: any; // 按钮样式

        @Getter public size: any;

        public fileName: string = '';


        // 获取data
        private getData(val: any) {
            if (typeof val === 'function') {
                return val();
            } else {
                return val;
            }
        }

        // 图片上传之前
        private beforeAvatarUpload(file: any) {
            this.fileName = file.name;
            const isPic = file.type.indexOf('sheet') > 0 || file.type.indexOf('excel') > 0;
            const isLt2M = file.size / 1024 / 1024 < 10;

            if (!isPic) {
                this.$message.error('Image uploads only support xlsx or xls formats!');
            }
            if (!isLt2M) {
                this.$message.error('Upload image size cannot exceed 10MB!');
            }
            if (isLt2M && isPic) {
                this.$set(this.option, 'loading', true);
            }
            if (isLt2M && isPic && this.option.beforeSuccess) {
                this.option.beforeSuccess();
            }
            return isLt2M && isPic;
        }

        // 改变图片钩子
        private changeLoading() {
            console.log('change');
        }


        // 设置请求头
        private getHeader() {
            const header: any = {};
            const localDate = 'Local-Date';
            const authorization = 'Authorization';
            header[localDate] = '';
            header[authorization] = localStorage.getItem('jwt');
            return header;
        }

        // 按钮点击事件
        private onClick() {
            if (!this.option.url) {
                this.$emit('onClick'); // 按钮点击事件
            }
        }

        // 成功钩子
        private success(response: any) {
            this.$set(this.option, 'loading', false);
            if (response.success) {
                if (!this.option.noMsg) {
                    this.$message({
                        message: `Template ${this.fileName} has been successfully uploaded!`,
                        type: 'success',
                    });
                }
                if (this.option.onSuccess) {
                    this.option.onSuccess(response.data);
                }
            } else {
                if (response.errorMsg.indexOf('[') > -1) {
                    let res = '';
                    JSON.parse(response.errorMsg).forEach((it: any) => {
                        res += '<p style="clear: both">' + it + '</p>';
                    });
                    this.$alert(res, 'Warning', {
                        dangerouslyUseHTMLString: true,
                        type: 'error',
                        confirmButtonText: 'Yes',
                    });
                } else {
                    this.$alert(response.errorMsg, 'Error', {
                        type: 'error',
                        confirmButtonText: 'Yes',
                    });
                }
                if (this.option.errCallback) {
                    this.option.errCallback();
                }
            }
        }

        // 获取地址
        private getUrl() {
            const getServerUrl = '6666666';
            if (this.option.dataAfter) {
                const res = this.option.dataAfter;
                return getServerUrl + this.option.url + res;
            } else {
                return getServerUrl + this.option.url;
            }
        }

        // 错误钩子
        private error(error: any) {
            this.$set(this.option, 'loading', false);
            const data = JSON.parse(error.toString().replace(/^Error:/, ''));
            this.$alert(data.errorMsg, 'Error', {
                type: 'error',
                confirmButtonText: 'Yes',
            });
            if (this.option.errCallback) {
                this.option.errCallback();
            }
        }

    }
</script>

