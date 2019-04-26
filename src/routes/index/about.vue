<template>
    <div class="page">
        <p>个人邮箱：shawnwang05@gmail.com</p>
        <p>功能在持续完善中</p>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { State } from 'vuex-class'
    import { AppState } from '../../store/modules/app'

    @Component({})
    export default class AboutPage extends Vue {
        mounted () {
        }
    }
</script>

<style lang="scss" scoped>
    .page {
        background-color: #FFF;
        height: 100%;
        font-size: 0.32rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        line-height: 0.5rem;
    }
</style>