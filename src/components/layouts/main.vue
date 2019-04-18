<template>
    <div class="main-bg">
        <el-tabs class="tabs-nav" v-model="defoultTagRes" type="card" @tab-click="tabSelect" @tab-remove="tabremove">
            <el-tab-pane
                    :key="item.name"
                    v-for="(item) in menu"
                    :name="item.name + ','+item.icon +','+item.title"
                    :icon="item.icon"
                    :closable="item.closable"
            >
                <span slot="label"><i v-if="item.icon" style="font-size: 18px; margin-left: 10px"
                                      :class="['icon', 'iconfont', item.icon]"></i> {{item.title}}</span>
                <div style="padding-right: 10px">

                </div>

            </el-tab-pane>
        </el-tabs>
        <el-scrollbar :style="{height: 'calc(100Vh - 8rem)', background: '#fff'}">
            <div class="content" style="height: 100%;padding-right: 20px">
                <transition name="page">
                    <keep-alive :include="menu.map(it => (it.name))">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </el-scrollbar>
        <!--<tabsBtn></tabsBtn>-->
    </div>
</template>

<script lang="ts">
    // import tabsBtn from './tabsBtn.vue'
    import {Component, Vue} from 'vue-property-decorator';
    import { Getter, Mutation } from 'vuex-class';


    @Component
    export default class CxMain extends Vue {
        @Getter public menu: any;
        @Getter public cHeight: any;
        @Getter public defoultTag: any;

        @Mutation public selectTag: any;
        @Mutation public pxoveTag: any;

        // 设置defoultTag 计算属性
        get defoultTagRes() {
            return this.defoultTag;
        }

        set defoultTagRes(val: string) {
            console.log(val);
        }





        private tabSelect(name: any) {
            const res = name.$el.getAttribute('id').substring(5);
            this.selectTag(res);
            // this.$router.push('/main/' + res.split(',')[0]);
        }


        private tabremove(name: any) {
            const res = name.split(',')[0];
            let num = 0;
            for (let i = 0; i < this.menu.length; i++) {
                if (this.menu[i].name === res) {
                    num = i;
                    break;
                }
            }
            if (res === this.defoultTagRes.split(',')[0]) {
                const seletTagRes = this.menu[num - 1];
                // this.$router.push('/main/' + seletTagRes.name);
            }
            this.pxoveTag(res);
        }

    }
</script>

<style lang="scss">
    @import "../../assets/css/rem";

    .main-bg {
        background-color: #fff;
        padding-top: 0px !important;
        padding-bottom: 0px !important;
        padding-right: 0px !important;
        overflow: hidden;
        padding-left: 20px;

        .el-tabs--card > .el-tabs__header .el-tabs__item {
            border-radius: 8px;
            border: 2px solid #e7e7e7;
            height: rem(32px);
            line-height: rem(26px);
            margin-left: rem(6px);
            background: #e7e7e7;
            padding: 0 10px 0 10px;

            i {
                margin-left: 0 !important;
            }
        }

        .el-tabs__item:hover {
            border: 2px solid #409EFF !important;
            color: #409EFF;
            background: #fff !important;
        }

        .el-tabs__item.is-active {
            border: 2px solid #409EFF !important;
            color: #409EFF;
            background: #fff !important;
            padding: 0 10px 0 10px !important;

            i {
                margin-left: 0 !important;
            }
        }

        .el-tabs--card > .el-tabs__header .el-tabs__nav {
            border: none;
            padding: rem(10px) 0;
        }

        .panel __native {
            margin-right: -17px !important;
        }

        .el-tabs__header {
            margin: 0 0 rem(7px) 0 !important;
        }

        .el-tabs__nav-next, .el-tabs__nav-prev {
            line-height: rem(55px) !important;
        }
    }
</style>
