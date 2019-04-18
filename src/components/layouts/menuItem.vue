<template>
    <el-submenu v-show="data.show || data.show === undefined" v-if="data.children"
                :index="data.url+','+data.resourceIco+','+data.name">
        <template slot="title">
            <i style="font-size: 18px"
               :class="['icon', 'iconfont', selected === data.name ? data.resourceIco : data.resourceIco + '-xianxing']"></i>
            <!-- <el-badge :is-dot="warningInfoList.indexOf(data.name) > -1" class="item" /> -->
            <div class="text-overflow" style="width: 90%" slot="title" :title="data.name">
                <template v-if="data.name.toLowerCase().indexOf(filterData.toLowerCase()) !== -1">
                    <span class="menu-span">{{data.name.substring(0,data.name.toLowerCase().indexOf(filterData.toLowerCase()))}}<strong
                            style="vertical-align: baseline; color: #fff300">{{data.name.substr(data.name.toLowerCase().indexOf(filterData.toLowerCase()),filterData.length)}}</strong>{{data.name.substring(data.name.toLowerCase().indexOf(filterData.toLowerCase())+filterData.length)}}</span>
                </template>
                <template v-else>
                    {{data.name}}
                </template>
            </div>
        </template>
        <menu-item :filterData="filterData" v-for="(items, indexs) in data.children" :data="items"
                   :key="indexs"></menu-item>
    </el-submenu>
    <el-menu-item v-show="data.show || data.show === undefined" v-else
                  :index="data.url+','+data.resourceIco+','+data.name">
        <i style="font-size: 18px"
           :class="['icon', 'iconfont', selectedItem === data.name ? data.resourceIco : data.resourceIco + '-xianxing']"></i>
        <!-- <el-badge :is-dot="warningInfoList.indexOf(data.name) > -1" class="item" /> -->
        <div class="text-overflow" slot="title" :title="data.name">
            <template v-if="data.name.toLowerCase().indexOf(filterData.toLowerCase()) !== -1">
                <span class="menu-span">{{data.name.substring(0,data.name.toLowerCase().indexOf(filterData.toLowerCase()))}}<strong
                        style="vertical-align: baseline; color: #fff300">{{data.name.substr(data.name.toLowerCase().indexOf(filterData.toLowerCase()),filterData.length)}}</strong>{{data.name.substring(data.name.toLowerCase().indexOf(filterData.toLowerCase())+filterData.length)}}</span>
            </template>
            <template v-else>
                {{data.name}}
            </template>
        </div>
    </el-menu-item>
</template>


<script lang="ts">
    import { Component, Vue, Prop} from 'vue-property-decorator';

    @Component
    export default class MenuItem extends Vue {
        @Prop() private data!: object; // 菜单数据

        @Prop() private filterData!: string; // 筛选参数

        @Prop() private selected!: string; // 选中菜单name

        @Prop() private selectedItem!: string; // 选中菜单object



        // computed: {
        //     warningInfoList() {
        //         return this.$store.state.warningInfoList
        //     }
        //
    }
</script>

<style lang="scss">
    .text-overflow {
        overflow: hidden;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        line-height: 2.8125rem !important;
    }

    .el-submenu__title {
        padding-right: 40px;
        position: relative;
    }

    .el-submenu__icon-arrow {
        margin-top: -4px !important;
        font-size: 14px !important;
        right: 10px !important;
        vertical-align: middle !important;
    }

    .menu-span {
        padding-top: 5px
    }
</style>

