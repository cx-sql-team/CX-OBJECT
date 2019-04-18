<template>
    <div class="sidebar">
        <div class="sidebar-content">
            <div class="sidebar-top">
                <el-input
                        style="float: left; margin-right: 10px"
                        :size="size"
                        v-show="searchShow"
                        placeholder="Please Input"
                        prefix-icon="el-icon-search"
                        v-model="searchText">
                </el-input>
                <div class="collapse-menu" @click="iscollapse">
                    <i :class="['el-icon-d-arrow-' + allow]"/>
                </div>
            </div>
            <el-scrollbar :style="{height:(cHeight - 150) + 'px', overflowX: 'hidden' }">
                <el-menu class="sidebar-el-menu"
                         :collapse="collapse"
                         background-color="#09254b"
                         text-color="#fff"
                         active-text-color="#409EFF"
                         unique-opened
                         @select="handleMenu"
                         @open="(index) => handleSubMenu(index, 1)"
                         @close="(index) => handleSubMenu(index, 0)"
                         :default-active="defoultTag"
                         :default-openeds="opends"
                >
                    <menu-item :selectedItem="selectedItem" :selected="selected" :filterData="searchText"
                               v-for="(item, index) in items" :data="item" :key="index"></menu-item>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="width-menu">

        </div>
    </div>
</template>


<script lang="ts">
    import { Getter } from 'vuex-class';
    import { Component, Vue, Watch} from 'vue-property-decorator';
    import menuItem from './menuItem.vue';



    interface MenuItem {
        icon: string;
        resourceIco: string;
        url: string;
        uri: string;
        show: boolean;
        name: string;
        menuName: string;
        childList: MenuItem[];
        children: MenuItem[];
    }


    @Component({
        components: {
            menuItem,
        },
    })
    export default class CxSide extends Vue {
        @Getter public defoultTag: any;
        @Getter public cHeight: any;
        @Getter public size: any;


        public allow: 'left' | 'right' = 'left';
        public searchShow: boolean = true;
        public searchText: string = '';
        public collapse: boolean = false;
        public opends: string[] = [];
        public items: string[] = [];
        public data: string[] = [];
        public selected: string = '';
        public selectedItem: string = '';


        @Watch('searchText', { immediate: true, deep: true })
        private changeSearchText(val: string): void {
            this.opends = [];
            if (val === '') {
                this.items = this.data;
            } else {
                const data = JSON.parse(JSON.stringify(this.data));
                const filterFun = (items: MenuItem[]) => {
                    items.forEach((it: MenuItem) => {
                        it.show = it.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
                        if (it.show === true) {
                            this.opends.push(it.url + ',' + it.resourceIco + ',' + it.name);
                        }
                        if (it.children && it.children.length > 0) {
                            filterFun(it.children);
                        }
                        if (it.show === false && it.children && it.children.length) {
                            let allHidden = false;

                            it.children.forEach((child: MenuItem) => {
                                if (child.show) {
                                    allHidden = false;
                                } else {
                                    allHidden = true;
                                }
                            });
                            it.show = (allHidden === false);
                            if (it.show === true) {
                                this.opends.push(it.url + ',' + it.resourceIco + ',' + it.name);
                            }
                        }
                    });

                };
                filterFun(data);
                this.items = data;
            }
        }

        private iscollapse() {
            this.collapse = !this.collapse;
            if (!this.searchShow) {
                setTimeout(() => {
                    this.searchShow = !this.searchShow;
                    this.allow = 'left';
                }, 500);
            } else {
                this.searchShow = !this.searchShow;
                this.allow = 'right';
            }
        }
        private handleMenu(index: string) {
            this.selectedItem = index.split(',')[2];
            if (index.split(',')[0]) {
                console.log(index);
                this.$store.commit('changeMenu', index);
            }
            // this.$router.push('/dcs/main/' + index.split(',')[0]);
        }
        private handleSubMenu(index: string, type: string) {
            const name = index.split(',')[2];
            if (type) {
                this.selected = name;
            } else if (this.selected === name) {
                this.selected = '';
            }
        }
        private createMenu(menu: MenuItem[]) {
            menu.forEach((item: MenuItem) => {
                item.resourceIco = item.icon;
                item.url = item.uri;
                item.show = true;
                item.name = item.menuName;
                if (item.childList && item.childList.length !== 0) {
                    item.children = item.childList;
                    this.createMenu(item.children);
                }
            });
        }

        private mounted() {
            this.getMenu();
            // goSysAxios('am-api/common/menuTree', {time: new Date().getTime(), kong: -1}, 'get').then((data) => {
            //     this.createMenu(data)
            //     this.items = data
            //     this.data = data
            // })
        }

        private async getMenu() {
            try {
                const res = await this.$ajax({url: 'am-api/common/menuTree', params: {}, method: 'get'});
                this.createMenu(res);
                this.items = res;
                this.data = res;
            } catch (err) {
                console.log(err, 666);
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/css/rem";

    .sidebar {
        float: left;
        position: relative;
        background: #09254b !important;
        height: calc(100Vh - 3.4375rem);

        .sidebar-content {
            position: relative;
            width: 100%;
            height: 100%;

            .sidebar-top {
                height: rem(40px);
                padding: rem(10px) 0 0px 20px;

                .el-input {
                    width: rem(235px)
                }

                .el-input__inner {
                    float: left;
                    height: rem(30px);
                    line-height: rem(30px);
                    font-weight: bold;
                    color: #666;
                    width: rem(235px)
                }

                .el-input__icon {
                    line-height: rem(30px);
                }
            }

            .sidebar-center {
                overflow: auto;
            }

            .sidebar-bottom {
                height: rem(100px);
                padding: 30px 50px;
                bottom: 0;

                .el-badge:first-child {
                    i {
                        font-size: 25px;
                    }
                }

                i {
                    font-size: 30px;
                    cursor: pointer;
                    color: #fff;
                }

                .r-icon {
                    float: right;
                }

                .l-icon {
                    float: left;
                }
            }

            .sidebar-bottom-small {
                height: 100px;
                padding: 10px;
                padding-left: 20px;
                width: 60px;

                i {
                    font-size: 25px;
                    cursor: pointer;
                    color: #fff;
                }

                i:first-child {
                    font-size: 22px;
                }

                .r-icon {
                    float: left;
                    clear: both;
                    margin-top: 20px;
                }

                .l-icon {
                    float: left;
                }
            }

            .el-scrollbar__wrap {
                overflow-x: hidden;
            }

            .sidebar::-webkit-scrollbar {
                width: 0;
            }

            .sidebar-el-menu:not(.el-menu--collapse) {
                .el-menu-item, .el-submenu {
                    width: rem(300px)
                }

                width: rem(300px);
            }

            .el-submenu__title .el-submenu__icon-arrow {
                color: #fff
            }

            .sidebar > ul {
                height: 100%;
            }

            .sidebar-el-menu {
                float: left
            }
        }

        .width-menu {
            position: absolute;
            width: 1px;
            height: 100%;
            color: #4daab4;
            top: 0;
            right: 0px;
        }

        .collapse-menu {
            float: left;
            overflow: hidden;
            vertical-align: middle;
            height: rem(30px);

            i {
                line-height: rem(30px);
                font-size: rem(20px);
                color: #fff;
            }

            cursor: pointer;
        }
    }

    .el-menu-item:hover, .el-submenu .el-submenu__title:hover {
        background: #617692 !important;
        opacity: 1;
    }

    .el-menu-item {
        background: #09254b !important;
        height: rem(45px) !important;
        line-height: rem(45px) !important;
    }

    .el-submenu__title {
        background: #09254b !important;
        height: rem(45px) !important;
        line-height: rem(45px) !important;
    }

    .el-menu-item.is-active {
        /*background: #617692 !important;*/
    }

    .el-menu .is-opened > div > i {
        color: #fff
    }

    /*.el-submenu__title > span{*/
    /*vertical-align: baseline!important;*/
    /*}*/
</style>
