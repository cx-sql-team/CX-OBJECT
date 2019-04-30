<template>
    <el-upload
            :headers="getHeader()"
            class="avatar-uploader"
            :action="url()"
            :disabled="loading"
            :on-error="error"
            :show-file-list="false"
            :on-change="(file, fileList) => onSuccess(file, fileList)"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :onlyPic="onlyPic">
        <div slot="trigger">
            <el-tooltip effect="dark" placement="top">
                <div slot="content">{{$t('lang.common.picUpload1')}}{{$t('lang.common.picUpload2')}}</div>
                <el-button :loading="loading" type="primary" size="mini" icon="el-icon-upload2" circle></el-button>
            </el-tooltip>
        </div>
        <div style="display: inline-block;width: 100px">
            <a target="_blank" :href="form[opt.field] && form[opt.urlField] + form[opt.field]">{{form[opt.field]}}</a>
        </div>
    </el-upload>
</template>


<script lang="ts">
    import {dateFormat, putDate} from '../../../../utils';
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component
    export default class UpLoad extends Vue {

        @Prop() public form: any; // form所有值
        @Prop() public opt: any; // 参数
        @Prop({
            default: true,
        }) public onlyPic?: boolean; // 是否只能传图片


        public loading: boolean = false; // loading



        private error(err: any) {
            this.loading = false;
            this.$alert(JSON.parse(err.message).errorMsg + ',Please do it later！', 'Warning', {
                type: 'error',
                confirmButtonText: 'Yes',
                // callback: (action: any) => {
                //     // window.location.href = "/platformLogin";
                // },
            });
        }


        private getHeader() {
            const header: any = {};
            const localDate = 'Local-Date';
            header[localDate] = putDate(dateFormat('yyyy-MM-dd hh:mm:ss'));
            header.Authorization = localStorage.getItem('jwt');
            return header;
        }


        private url() {
            return this.opt.url;
        }


        private onSuccess(file: any, fileList: any) {
            console.log('success');
        }


        private handleAvatarSuccess(res: any, file: any) {
            this.loading = false;
            if (res.success) {
                this.form[this.opt.field] = res.data.substring(res.data.lastIndexOf('/') + 1);
                this.$set(this.form, this.opt.urlField, res.data.substring(0, res.data.lastIndexOf('/') + 1));
            } else {
                this.$alert(res.errorMsg, 'Warning', {
                    type: 'error',
                    confirmButtonText: 'Yes',
                });
            }
        }


        private beforeAvatarUpload(file: any) {
            const isPic = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!this.onlyPic) {
                this.loading = true;
                return true;
            }
            if (!isPic) {
                this.$message.error('Image uploads only support JPEG or PNG formats!');
            }
            if (!isLt2M) {
                this.$message.error('Upload image size cannot exceed 2MB!');
            }
            if (isPic && isLt2M) {
                this.loading = true;
            }
            return isPic && isLt2M;
        }

    }
</script>

<style lang="scss">
    .avatar-uploader {

        overflow: hidden;
    }
</style>
