/**
 * 初始化事件
 * @param searchResData   搜索栏数据
 * @param mainTableButtonsData 按钮数据
 * @param colums   表格数据
 * @param dialogData 弹出框数据 为一个函数 dialogData（this）为了达到时间框不能获取this的问题
 * @param callback   回调函数
 */


import { Component, Vue } from 'vue-property-decorator';

export default (searchResData?: any, mainTableButtonsData?: any, colums?: any, dialogData?: any, callback?: any) => {
    @Component
    class PageOptions extends Vue {
        public searchShow: boolean = false;
        public searchOption: any = {
            option: [],
            // 查询条件值
            formlist: {},
            // 查询验证
            ruleslist: {},
        };
        public mainTable: any = {
            tableDataflag: '0,0',
            loading: false,
            buttons: [],
            colums: [],
            selected: {},
            checkSelecteds: [],
            defaultSearch: true,
        };
        public mainDialog: any = {
            mainDiologVisible: false,
            loading: false,
            title: '',
            option: [],
            // 弹出框项
            formlist: {},
            // 查询验证
            ruleslist: {},
        };




        public mounted() {
            const searchRes = typeof searchResData === 'function' ? searchResData(this) : searchResData;
            if (searchRes && searchRes.length > 0) {
                // 查询条件
                searchRes.forEach((it: any) => {
                    this.$set(this.searchOption.formlist, it.field, it.type === 'checkbox' ? [] : ''); // 强行双行绑定
                    this.searchOption.option.push(it);
                    // 必填
                    if (it.required) {
                        if (it.type === 'checkbox') {
                            this.searchOption.ruleslist[it.field] = [{
                                type: 'array',
                                required: true,
                                message: this.$t('lang.common.requireTxt') + ' ' + this.$t(it.name),
                                trigger: 'blur',
                            }];
                        } else if (it.type === 'pic') {
                            this.searchOption.ruleslist[it.field] = [{
                                required: true,
                                message: this.$t('lang.common.requireUpload'),
                                trigger: 'blur',
                            }];
                        } else {
                            this.searchOption.ruleslist[it.field] = [{
                                required: true,
                                message: this.$t('lang.common.requireTxt') + ' ' + this.$t(it.name),
                                trigger: 'blur',
                            }];
                        }
                    }
                    // rules自定义验证
                    if (it.rules && it.rules.length > 0) {
                        this.searchOption.ruleslist[it.field] = this.searchOption.ruleslist[it.field].concat(it.rules);
                    }
                });
            }


            // 按钮权限
            const mainTableButtons = typeof mainTableButtonsData === 'function' ? mainTableButtonsData(this) : mainTableButtonsData ? mainTableButtonsData : [];
            const ltres = ['add', 'update', 'dele', 'copy', 'open', 'shut', 'routerMatch', 'start', 'prev', 'downLoad', 'pay', 'upload', 'template', 'submit'];
            const mainTableButtonsList = mainTableButtons.filter((it: any) => {
                return ltres.includes(it.id);
            });
            mainTableButtonsList.forEach((it: any) => {
                this.mainTable.buttons.push(it);
            });
            this.mainTable.colums = colums;
            if (this.mainTable.defaultSearch) {
                this.searchTable(1, true);
            }

            // 弹出框
            const dialogRes: any = {};
            const dialogParam = !dialogData ? [] : dialogData(this);
            dialogParam.forEach((it: any) => {
                this.mainDialog.option.push(it);
                if (it.field) {
                    if (it.field === 'id') {
                        dialogRes[it.field] = 'null';
                    } else {
                        dialogRes[it.field] = '';
                    }
                    // 必填
                    if (it.required) {
                        if (it.type === 'checkbox') {
                            this.mainDialog.ruleslist[it.field] = [{
                                type: 'array',
                                required: true,
                                message: this.$t('lang.common.requireTxt') + ' ' + this.$t(it.name),
                                trigger: 'blur',
                            }];
                        } else if (it.type === 'pic') {
                            this.mainDialog.ruleslist[it.field] = [{
                                required: true,
                                message: this.$t('lang.common.requireUpload'),
                                trigger: 'blur',
                            }];
                        } else {
                            this.mainDialog.ruleslist[it.field] = [{
                                required: true,
                                message: this.$t('lang.common.requireTxt') + ' ' + this.$t(it.name),
                                trigger: 'blur',
                            }];
                        }
                    }
                    // rules自定义验证
                    if (it.rules && it.rules.length > 0) {
                        this.mainDialog.ruleslist[it.field] = this.mainDialog.ruleslist[it.field].concat(it.rules);
                    }
                }
            });
            this.mainDialog.formlist = dialogRes;
            this.searchShow = true;

            if (callback) {
                callback(this);
            }
        }


        // 查询表格
        public searchTable(val: any, buttonReset: boolean = true) {
            this.mainTable.checkSelecteds = [];
            if (buttonReset) {
                this.mainTable.selected = {};
                // this.mainTable.buttons.forEach((it) => {if(it.selectType!== 'all'){it.disabled = true}})
            }
            this.mainTable.tableDataflag = new Date().getTime() + ',' + val;
        }

        // 点击查询
        public goSearch() {
            this.searchTable(1);
        }

        // 清空查询
        public goSearchReset() {
            this.searchTable(1);
        }

        // 主表check选中
        public mainCheckSelect(selection: any) {
            this.mainTable.checkSelecteds = selection;
        }

        // 主表点击选中
        public mainSelect(row: any) {
            this.mainTable.selected = row;
        }

        // 弹出框
        // 关闭
        public closeMainDialog() {
            // this.$refs['mainDialog'].resetFields();
            this.mainDialog.mainDiologVisible = false;
        }

    }
    return PageOptions;
};
