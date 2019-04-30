<template>
    <div class="sys-bg container" style="height: 100%;"  @dragover.stop="(ev) => dragover(ev)">
        <cx-head />
        <div class="container">
            <cx-side />
            <cx-main />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import CxHead from './head.vue';
import CxSide from './side.vue';
import CxMain from './main.vue';

@Component({
    components: {
        CxHead,
        CxSide,
        CxMain,
    },
})
export default class Login extends Vue {
    private mounted() {
        if (!localStorage.getItem('colums')) {
            localStorage.setItem('colums', JSON.stringify({}));
        }
    }
}
</script>

<style scoped>
    .container {
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
</style>
