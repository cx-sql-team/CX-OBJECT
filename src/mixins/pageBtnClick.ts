/**
 * 按钮点击事件方法
 * @param disabledIndexs   弹出框在修改按钮点击时不能编辑项的Index  如：[0,1]
 * @param multiSelectOptions  其他多选的按钮事件 [name: 按钮id， url， 按钮点击地址， tip：提示消息[动词，名词],type: 接口传值是否是{idList： res}]
 * 如：[{name: 'dele', url: '/basicDataManager/routeDetailManager/batchDetail', tip: ['删除','工艺路线']},{name: 'open', url: '/basicDataManager/routeManager/batchPublish', tip: ['发布','工艺路线']}]
 * @param addUpdateCallback   新增修改弹出框弹出后回调 含this
 * @param otherButtonClick    其他事件
 */

import {Component, Vue} from 'vue-property-decorator';
import {dateFormat} from '@/utils/index';


export default (disabledIndexs?: any, multiSelectOptions?: any, addUpdateCallback?: any, otherButtonClick?: any) => {
    @Component
    class PageBtnClick extends Vue {
        private mainDialog: any;
        // 主表按钮
        private mainButtonClick(id: string | number, selectValue: any, isEditor: boolean) {
            // @ts-ignore
            this.selected = selectValue;
            if (id === 'add' || id === 'update' || id === 'prev') {
                this.mainDialog.mainDiologVisible = true;
                this.mainDialog.option.forEach((it: any) => {
                    if (it.disabledAll) {
                        it.disabled = true;
                    } else {
                        it.disabled = false;
                    }
                });
                this.mainDialog.title = 'lang.common.addItem';
                this.mainDialog.formlist = getIntData(this.mainDialog.option);
                if (id === 'update' || id === 'prev') {
                    this.mainDialog.title = 'lang.common.editor';
                    this.mainDialog.option.forEach((it: any) => {
                        if (it.updateNotSet) {
                            console.log('updateNotSet');
                        } else if (it.range) {
                            this.mainDialog.formlist[it.field] = selectValue[it.defaultType[0]] ? [selectValue[it.defaultType[0]], selectValue[it.defaultType[1]]] : '';
                        } else if (it.type === 'date' && !it.range) {
                            this.mainDialog.formlist[it.field] = selectValue[it.field] ? dateFormat('yyyy-MM-dd hh:mm:ss', selectValue[it.field]) : '';
                        } else if (it.type === 'checkbox') {
                            this.mainDialog.formlist[it.field] = selectValue[it.field] ? selectValue[it.field].split(',') : [];
                        } else if (it.formatter) {
                            this.mainDialog.formlist[it.field] = it.formatter(selectValue[it.field], selectValue);
                        } else if (it.type === 'datatype') {
                            this.mainDialog.formlist[it.field] = selectValue[it.field] ? selectValue[it.field].toString() : '';
                        } else if (it.type === 'pic') {
                            this.mainDialog.formlist[it.field] = selectValue[it.field];
                            this.mainDialog.formlist[it.urlField] = selectValue[it.urlField];
                        } else {
                            this.mainDialog.formlist[it.field] = selectValue[it.field];
                        }
                    });
                    if (id === 'prev') {
                        this.mainDialog.title = 'lang.common.preview';
                        this.mainDialog.option.forEach((it: any) => {
                            it.disabled = true;
                        });
                    } else if (id === 'update') {
                        disabledIndexs.forEach((it: any) => {
                            this.mainDialog.option[it].disabled = true;
                        });
                    }
                }
                if (addUpdateCallback) {
                    addUpdateCallback(this, selectValue, id);
                }
            }
            multiSelectOptions.forEach((it: any) => {
                if (id === it.name) {
                    let msgTitle;
                    switch (id) {
                        case 'dele':
                            msgTitle = 'delMsg';
                            break;
                        case 'add':
                            msgTitle = 'addMsg';
                            break;
                        case 'update':
                            msgTitle = 'updateMsg';
                            break;
                    }

                    this.$confirm((it.message ? this.$t(it.message) : this.$t(`lang.common.${msgTitle}`) as any), (this.$t('lang.common.warning') as any), ({
                        confirmButtonText: (this.$t('lang.common.yes') as any),
                        cancelButtonText: this.$t('lang.common.no'),
                        type: 'warning',
                    }) as any).then((data: any) => {
                        console.log(it);
                        if (it.callback) {
                            it.callback(this, selectValue.id, selectValue);
                        } else {
                            this.$ajax({
                                url: it.url,
                                params: it.data ? it.data(selectValue, this) : selectValue.id,
                                method: 'delete',
                            }).then(() => {
                                // @ts-ignore
                                this.searchTable(0);
                                this.$message({
                                    type: 'success',
                                    // message: it.tip[0] + '成功!'
                                    message: it.successMesg ? it.successMesg(data, this) : this.$t('lang.common.success'),
                                });
                                if (it.afterCallBack) {
                                    it.afterCallBack(this, selectValue);
                                }
                            });
                        }
                    });
                }
            });
            if (otherButtonClick) {
                otherButtonClick(this, id);
            }
        }
    }
    return PageBtnClick;
};


/**
 * 初始化弹出框数据清空
 * @param options   弹出框的formList
 */
function getIntData(options: any) {
    const dialogRes: any = {};
    options.forEach((it: any) => {
        if (it.field) {
            if (it.field === 'id') {
                dialogRes[it.field] = 'null';
            } else if (it.field === 'ssq') {
                dialogRes[it.field] = [];
            } else {
                dialogRes[it.field] = undefined;
            }
        }
    });
    return dialogRes;
}
