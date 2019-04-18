/**
 * 弹出框确定点击事件（验证）
 * @param res   需要传递后台的数据 回调函数（formlist为弹出框的formList， title为弹出框标题）(resFormList, this.mainDialog.title, this)
 * @param addUrl  新增的url {type: 'post', url: '/aa'}
 * @param changeUrl  修改的url 如果没有 新增和修改一样url
 * @param onSucessCallback    成功事件 (data, this)
 * @param afterCallBack    成功关闭弹出框后事件 (resFormList, this.mainDialog.title, this, data)
 */


import {Component, Vue} from 'vue-property-decorator';
import {putDate} from '@/utils';

export default (res?: any, addUrlRes?: any, changeUrlRes?: any, onSucessCallback?: any, afterCallBack?: any) => {
    @Component
    class DialogOk extends Vue {
        private mainDialog: any;

        // 确定
        private onOk(importantUrl: any) {
            const mainDialogStr = 'mainDialog';
            const addUpdateValidate: any = this.$refs[mainDialogStr] || (this.$refs.table as any).$refs[mainDialogStr];
            addUpdateValidate.validate((valid: boolean) => {
                if (valid) {
                    const addUrl = typeof addUrlRes === 'object' ? addUrlRes.url : addUrlRes;
                    const changeUrl = typeof changeUrlRes === 'object' ? changeUrlRes.url : changeUrlRes;
                    this.mainDialog.loading = true;
                    const url = this.mainDialog.title === 'lang.common.addItem' ? addUrl : changeUrl ? changeUrl : addUrl;
                    let type = '';

                    if (this.mainDialog.title === 'lang.common.addItem') {
                        type = typeof addUrlRes === 'object' && addUrlRes.type ? addUrlRes.type : 'post';

                    } else {
                        if (changeUrlRes) {
                            type = typeof changeUrlRes === 'object' && changeUrlRes.type ? changeUrlRes.type : 'put';
                        } else {
                            type = typeof addUrlRes === 'object' && addUrlRes.type ? addUrlRes.type : 'put';
                        }
                    }

                    const resFormList = JSON.parse(JSON.stringify(this.mainDialog.formlist));
                    this.mainDialog.option.forEach((it: any) => {
                        if (it.type === 'date' && it.afterTime) {
                            const afterTime = it.afterTime === 'start' ? ' 00:00:00' : it.afterTime === 'end' ? ' 23:59:59' : it.afterTime;
                            const dateValue = this.mainDialog.formlist[it.field];
                            resFormList[it.field] = dateValue.indexOf(':') > -1 ? putDate(dateValue) : putDate(dateValue + afterTime);
                        }
                    });

                    if (res(resFormList, this.mainDialog.title, this) !== false) {
                        const axiosData = {
                            ...res(resFormList, this.mainDialog.title, this),
                            createBy: 'ceshi',
                            lastUpdateBy: 'ceshi',
                        };
                        this.$ajax({
                            url: importantUrl && typeof importantUrl === 'string' ? importantUrl : url,
                            params: axiosData,
                            method: type,
                        }).then((data: any) => {
                            if (onSucessCallback && data) {
                                onSucessCallback(data, this);
                            } else {
                                if (this.mainDialog.title === 'lang.common.addItem') {
                                    this.$message({
                                        message: addUrlRes && typeof addUrlRes === 'object' && addUrlRes.message ? addUrlRes.message(data, this) : this.$t('lang.common.success'),
                                        type: 'success',
                                    });
                                    // @ts-ignore
                                    this.searchTable(0, false);
                                } else {
                                    this.$message({
                                        message: changeUrlRes && typeof changeUrlRes === 'object' && changeUrlRes.message ? changeUrlRes.message(data, this) : this.$t('lang.common.success'),
                                        type: 'success',
                                    });
                                    // @ts-ignore
                                    this.searchTable(0);
                                }
                                this.mainDialog.loading = false;
                                this.mainDialog.mainDiologVisible = false;
                                if (afterCallBack) {
                                    afterCallBack(resFormList, this.mainDialog.title, this, data);
                                }
                            }
                        }).catch(() => {
                            this.mainDialog.loading = false;
                        });
                    } else {
                        this.mainDialog.loading = false;
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }

    }
    return DialogOk;
};
