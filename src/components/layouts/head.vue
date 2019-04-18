<template>
    <div class="head-bg">
        <div class="head-logo">

        </div>
        <div class="head-title">
            <span>{{$t('lang.common.systemName')}}</span>
        </div>

        <div class="head-user" style="float: right">
            <i style="font-size: 24px!important; margin-right: 18px" @click="goHome"
               class="icon iconfont icon-tubiaozhizuomoban_zhuxiao"></i>
        </div>
        <div class="head-user" style="width: auto">
            <!--<div class="user-avatar"></div>-->
            <span class="user-name">{{userMesg}}</span>
            <div class="language-international" v-show="true"  @click="langChange">{{selectValue}}</div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class CxHead extends Vue {
    public name: string = '';
    public selectValue: string = '';
    public userMesg: string = '';


    private goHome() {
        this.$confirm(this.$t('lang.common.isGoHome').toString(), this.$t('lang.common.warning').toString(), {
            confirmButtonText: this.$t('lang.common.yes').toString(),
            cancelButtonText: this.$t('lang.common.no').toString(),
            type: 'warning',
        }).then(() => {
            localStorage.removeItem('jwt');
            this.$router.push({path: ('/')});
        });
    }



    // 语言切换
    private langChange(e: any) {
        const lang = this.selectValue === 'cn' ? 'en' : 'cn';
        this.selectValue = lang;
        localStorage.setItem('lang', lang);
        this.$i18n.locale = lang;
    }

    private mounted() {
        this.userMesg = localStorage.getItem('name') ? `Hi, ${localStorage.getItem('name')} | ${localStorage.getItem('orgName')}` : '';
    }


    private created() {
        if (!localStorage.getItem('lang')) {
            localStorage.setItem('lang', 'en');
        }
        console.log(localStorage.lang);
        this.selectValue = localStorage.lang;
    }
}
</script>

<style lang="scss">
    @import "../../assets/css/rem";

    .head-bg {
        width: 100%;
        background: #1183fb linear-gradient(-90deg, #0a48d1 0, #1183fb 100%);
        /*background: #08fb98 linear-gradient(-90deg, #fb3e85 0%, #f8fb29 33%,#08fb98 66%,#1183fb 100%);*/
        border-top-color: #0c64eb;
        border-bottom-color: #e9f2fb;
        color: #333;
        text-align: center;
        height: rem(55px) !important;
        .head-logo {
            float: left;
            margin-top: rem(7.5px);
            vertical-align: middle;
            margin-left: 20px;

            img {
                height: rem(40px)
            }

            img:nth-of-type(1) {
                padding-right: rem(5px);
                border-right: 1px solid #fff;
            }
        }

        .head-title {
            float: left;
            color: #fff;
            margin-left: rem(20px);
            line-height: rem(55px);
            font-size: rem(28px);
            font-weight: bold;
            letter-spacing: 2px
        }

        .head-user {
            width: 55px;
            float: right;

            > div {
                font-size: rem(28px);
                color: #fff;
                line-height: rem(70px);
            }

            > i {
                float: right;
                color: #fff;
                line-height: rem(55px);
                font-size: rem(24px);
                cursor: pointer;
            }
            .language-international {
                cursor: pointer;
                float: right;
                line-height: 50px;
                margin-left: 20px;
            }
            .user-avatar {
                width: 35px;
                height: 35px;
                border-radius: 25px;
                border: 2px solid #fff;

                background-size: 35px 35px;
                float: left;
                margin-top: 15px;
            }

            .user-name {
                color: #fff;
                line-height: rem(55px);
                float: left;
                margin-left: 10px;
            }

            .user-return {
                margin-top: rem(31px);;
                font-size: rem(24px);
                cursor: pointer;
                color: #D36F73;
                float: right;
                padding-right: 18px;
            }
        }
    }

</style>
