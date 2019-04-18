<template>
    <div class="main-Content">
        <div class="logo">
            <div class="logo-Info logo-saic"></div>
            <div class="colLine"></div>
            <div class="logo-Info logo-mg"></div>
            <div class="logo-Info logo-A"></div>
        </div>
        <div class="main-Wrap">
            <div class="loginArea">
                <div class="login-title saic">SAIC MOTOR</div>
                <div class="login-title intel">INTERNATIONAL</div>
                <div class="iptArea">
                    <div class="ipt">
                        <input
                                type="text"
                                placeholder="Account"
                                v-model="account"
                                v-on:keyup.enter="loginIt"
                        />
                        <i class="actIcon"></i>
                    </div>
                    <span class="wrongInfo" v-if="wrongNum">{{wrongInfo}}</span>
                </div>

                <div class="iptArea">
                    <div class="ipt">
                        <input
                                type="password"
                                placeholder="Password"
                                v-model="passNum"
                                v-on:keyup.enter="loginIt"
                        >
                        <i class="pswIcon"></i>
                        <span class="wrongInfo" v-if="wrongNum">{{wrongInfo}}</span>
                    </div>
                </div>
                <div class="loginButton" @click="toLogin">LOGIN</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

interface User {
    userName: string;
    passWord: string;
    appCode: string;
}


@Component({})
export default class Login extends Vue {
    // data
    public account: string = '';
    public passNum: string = '';
    public wrongNum: boolean = false; // 错误信息提示
    public wrongInfo: string = 'Incorrect username or password'; // 错误提示内容
    // medths
    private toLogin() {
        const params = {userName: '', passWord: '', appCode: ''};
        params.userName = this.account;
        params.passWord = this.passNum;
        params.appCode = 'DCS';
        this.goLogin(params);
    }
    private async goLogin(params: User) {
        try {
            const res = await this.$ajax({url: 'auth/login', params, method: 'post'});
            localStorage.setItem('jwt', res.jwt);
            localStorage.setItem('name', res.uName);
            localStorage.setItem('orgName', res.orgName);
            localStorage.setItem('orgCode', res.orgCode);
            localStorage.setItem('code', res.uCode);
            // this.message('Login success','success');
            // setTimeout(function () {
            // this.$store.commit('formatterRouter');
            this.$router.push('/main');
        } catch (err) {
            console.log(err, 666);
        }
    }
    private message(message: string = '', type: string = 'warning'): void {
        this.$message({
            type: type === 'warning' ? 'warning' : 'success',
            message,
        });
    }
    private loginIt(): void {
        this.toLogin();
    }

}
</script>

<style scoped lang="scss">
    .main-Content {
        width: 100%;
        height: 100%;
        min-width: 1366px;
        background:#000000 url("./assets/image/backgroup.jpg") no-repeat center center;
        background-size: cover;
        overflow: hidden;
    }
    .main-Wrap {
        width:100%;
        height: 100%;
        margin: 0 auto;
        position: relative;
    }
    .logo {
        width: 650px;
        overflow: hidden;
        padding-top: 68px;
        .logo-Info {
            float: left;
        }
        .colLine {
            width: 2px;
            height: 112px;
            background-color: #ffffff;
            float: left;
            margin-right: 30px;
        }
        .logo-saic {
            height: 112px;
            width: 114px;
            background: url("./assets/image/logo-1.png") no-repeat center center;
            background-size: cover;
            margin-left: 66px;
            margin-right: 30px;
        }
        .logo-A {
            height: 100px;
            width: 161px;
            background: url("./assets/image/logo-2.png") no-repeat center center;
            background-size: cover;
            margin-top: 7px;
        }
        .logo-mg {
            width: 113px;
            height: 113px;
            background: url("./assets/image/logo-3.png") no-repeat center center;
            background-size: cover;
            margin-right: 24px;
        }
    }
    .loginArea {
        height: 370px;
        width: 350px;
        position: absolute;
        right: 16vw;
        bottom: 45vh;
        .login-title {
            color: #ffffff;
            text-align: center;
        }
        .saic {
            font-size: 51px;
            font-family: "Arial MT";

        }
        .intel {
            font-family: "Arial MT";
            font-size: 24px;
            letter-spacing: 11px;
            text-indent: 16px;
            margin-top: 8px;
            margin-bottom: 94px;
        }
        .iptArea {
            position: relative;
            margin: 0 auto;
            width: 300px;
            .ipt {
                width: 300px;
                height: 45px;
                position: relative;
                margin-top: 35px;
            }
            input {
                width: 272px;
                height: 17px;
                background-color: rgba(0,0,0,.3);
                border: 1px solid transparent;
                border-image: linear-gradient(to bottom, #FD8BE5, #517DC8);
                border-image-slice: 10;
                border-radius: 5px!important;
                color: #92bcf7;
                font-size: 22px;
                padding: 14px;
            }
            i {
                display: inline-block;
                position: absolute;
                right: 24px;
                top: 6px;
                height: 32px;
            }
            .actIcon {
                width: 28px;
                background: url("./assets/image/user.png") no-repeat center;
                background-size: cover;
            }
            .pswIcon {
                width: 22px;
                background: url("./assets/image/pw.png") no-repeat center;
                background-size: cover;
            }
            .wrongInfo {
                position: absolute;
                top: 55px;
                left: 5px;
                color: #ff0000;
                font-size: 16px;
            }
        }
        .loginArea-Title {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-align: center;
        }
        .loginButton {
            width: 300px;
            height: 45px;
            line-height: 45px;
            background-color: #517dc8;
            color: #ffffff;
            font-size: 22px;
            font-family: 'Microsoft YaHei';
            border-radius: 5px;
            text-align: center;
            cursor: pointer;
            margin: 35px auto;
        }

    }
</style>
