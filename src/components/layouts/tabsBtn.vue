<template>
    <div class="el-tabs__new-tab">
        <el-dropdown trigger="click" @command="handleCommand">
            <i style="font-size: 22px; top: 0px; position: relative" class="icon iconfont icon-lanmu el-button--text"/>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :disabled="menu.length <= 1" command="a">{{$t('lang.common.closeAllTags')}}
                </el-dropdown-item>
                <el-dropdown-item :disabled="menu.length <= 1" command="b">{{$t('lang.common.closeOtherTags')}}
                </el-dropdown-item>
                <el-dropdown-item :disabled="menu.findIndex(it => (it.name === defoultTag.split(',')[0])) < 2"
                                  command="c">{{$t('lang.common.closeLeftTags')}}
                </el-dropdown-item>
                <el-dropdown-item
                        :disabled="menu.findIndex(it => (it.name === defoultTag.split(',')[0])) === (menu.length - 1)"
                        command="d">{{$t('lang.common.closeRightTags')}}
                </el-dropdown-item>
                <!--<el-dropdown-item command="f">{{$t('lang.common.fullScreen')}}</el-dropdown-item>-->
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import { Getter, Mutation } from 'vuex-class';

    @Component
    export default class TabBtn extends Vue {
        @Mutation public selectTag: any;
        @Mutation public pxoveTag: any;
        @Mutation public setMenu: any;

        public fullscreen: boolean = false;
        @Getter public menu: any;
        @Getter public defoultTag: any;

        // 设置defoultTag 计算属性
        get defoultTagRes() {
            return this.defoultTag;
        }

        set defoultTagRes(val: string) {
            console.log(val);
        }






        private handleCommand(val: string) {
            const daultTagsMes = this.defoultTagRes.split(',');
            const index = this.menu.findIndex((it: any) => (it.name === this.defoultTag.split(',')[0]));
            if (val === 'a') {
                this.$store.commit('setMenu', [{
                    title: 'Home',
                    icon: 'icon-shouye',
                    name: 'Home',
                    closable: false,
                }]);
                this.selectTag('Home,icon-shouye,Home');
                this.$router.push('/main/Home');
            } else if (val === 'b') {
                const res: any = [{
                    title: 'Home',
                    icon: 'icon-shouye',
                    name: 'Home',
                    closable: false,
                }];
                if (daultTagsMes[0] !== 'Home') {
                    res.push({
                        title: daultTagsMes[2],
                        icon: daultTagsMes[1],
                        name: daultTagsMes[0],
                        query: daultTagsMes.length > 3 ? daultTagsMes[3] : '',
                        closable: true,
                    });
                }
                this.setMenu(res);
            } else if (val === 'c') {
                const res: any[] = [];
                this.menu.forEach((it: any, itIndex: number) => {
                    if (itIndex === 0 || itIndex >= index) {
                        res.push(it);
                    }
                });
                this.$store.commit('setMenu', res);
            } else if (val === 'd') {
                const res: any[] = [];
                this.menu.forEach((it: any, itIndex: number) => {
                    if (itIndex <= index) {
                        res.push(it);
                    }
                });
                this.setMenu(res);
            }
            // else if(val === 'e') {
            //   let res1 = JSON.parse(JSON.stringify(this.menu));
            //   let res = JSON.parse(JSON.stringify(this.menu));
            //   res.splice(index, 1)
            //   this.$store.commit('setMenu',res);
            //   setTimeout(() => {
            //     this.$store.commit('setMenu', res1);
            //   }, 0)
            // }
            // else {
                // let element =  document.querySelector('.' + daultTagsMes[0]);
                // const element = document.body;

//          if (this.fullscreen) {
//            if (document.exitFullscreen) {
//              document.exitFullscreen();
//            } else if (document.webkitCancelFullScreen) {
//              document.webkitCancelFullScreen();
//            } else if (document.mozCancelFullScreen) {
//              document.mozCancelFullScreen();
//            } else if (document.msExitFullscreen) {
//              document.msExitFullscreen();
//            }
//          } else {
//                 if (element.requestFullscreen) {
//                     element.requestFullscreen();
//                 } else if (element.webkitRequestFullScreen) {
//                     element.webkitRequestFullScreen();
//                 } else if (element.mozRequestFullScreen) {
//                     element.mozRequestFullScreen();
//                 } else if (element.msRequestFullscreen) {
//                     // IE11
//                     element.msRequestFullscreen();
//                 }
//          }
//          this.fullscreen = !this.fullscreen;
            //  }
        }


        private mounted() {
            const list = document.querySelector('.tabs-nav > .el-tabs__header') as any;
            list.insertBefore(this.$el, list.childNodes[0]);
        }
    }
</script>

<style lang="scss">

</style>
