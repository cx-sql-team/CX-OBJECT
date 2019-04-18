<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import {Mutation} from 'vuex-class';


@Component
export default class App extends Vue {
    @Mutation public changeSize: any;
    @Mutation public changeHeight: any;



    public mounted() {
        // if (!Number.prototype._toFixed) {
        //     Number.prototype._toFixed = Number.prototype.toFixed;
        // }
        // Number.prototype.toFixed = function(n) {
        //     return (this + 1e-14)._toFixed(n);
        // };
        this.change1();
        window.onresize = () => {
            this.change1();
        };
        window.addEventListener('beforeunload', () => {
            // sessionStorage.setItem('state', JSON.stringify(state))
            return ;
        });
    }
    public change1() {
        if (document.body.clientWidth > 1900) {
            this.changeSize('medium');
        } else if (document.body.clientWidth > 1400) {
            this.changeSize('small');
        } else {
            this.changeSize('mini');
        }
        this.changeHeight(document.body.clientHeight);
    }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
