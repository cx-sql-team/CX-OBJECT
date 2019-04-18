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


<script>
    import {getServerUrl, dateFormat, putDate} from '~/assets/js/common';

    export default {
        // props: {
        //     form: {
        //         type: Object, // formList数据
        //     },
        //     opt: {
        //         type: Object, // formList数据
        //     },
        //     onlyPic: {
        //         type: Boolean,
        //         default: true,
        //     }
        // },
        // data() {
        //     return {
        //         imageUrl: '',
        //         show: false,
        //         dialogVisible: false,
        //         loading: false,
        //     };
        // },
        // methods: {
        //     error(err) {
        //         this.loading = false;
        //         this.$alert(JSON.parse(err.message).errorMsg + ',Please do it later！', 'Warning', {
        //             type: 'error',
        //             confirmButtonText: 'Yes',
        //             callback: action => {
        //                 // window.location.href = "/platformLogin";
        //             },
        //         });
        //     },
        //     getHeader() {
        //         const header = {};
        //         header['Local-Date'] = putDate(dateFormat('yyyy-MM-dd hh:mm:ss'));
        //         header['Authorization'] = localStorage.getItem('jwt');
        //         return header;
        //     },
        //     url() {
        //         return getServerUrl + this.opt.url;
        //     },
        //     onSuccess(file, fileList) {
        //         consle.log('success');
        //     },
        //     handleAvatarSuccess(res, file) {
        //         this.loading = false;
        //         if (res.success) {
        //             this.form[this.opt.field] = res.data.substring(res.data.lastIndexOf('/') + 1);
        //             this.$set(this.form, this.opt.urlField, res.data.substring(0, res.data.lastIndexOf('/') + 1));
        //         } else {
        //             this.$alert(response.errorMsg, 'Warning', {
        //                 type: 'error',
        //                 confirmButtonText: 'Yes',
        //             });
        //         }
        //     },
        //     beforeAvatarUpload(file) {
        //         const isPic = file.type === 'image/jpeg' || file.type === 'image/png';
        //         const isLt2M = file.size / 1024 / 1024 < 2;
        //         if (!this.onlyPic) {
        //             this.loading = true;
        //             return true;
        //         }
        //         if (!isPic) {
        //             this.$message.error('Image uploads only support JPEG or PNG formats!');
        //         }
        //         if (!isLt2M) {
        //             this.$message.error('Upload image size cannot exceed 2MB!');
        //         }
        //         if (isPic && isLt2M) {
        //             this.loading = true;
        //         }
        //         return isPic && isLt2M;
        //     },
        // },
    };
</script>

<style lang="scss">
    .avatar-uploader {

        overflow: hidden;
    }
</style>
