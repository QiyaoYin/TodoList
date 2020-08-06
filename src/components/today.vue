<template>
    <div class="timer-content">
        <h1 class="timer-title">My Day</h1>
        <h3 class="timer-content">{{ todaytime }}</h3>
    </div>
</template>

<script>
export default {
    name: 'today',
    data() {
        return {
            todaytime: new Date().toLocaleString(),
        }
    },
    mounted(){
        this.timer();
    },
    methods:{
        timer(){
            setInterval(()=>this.todaytime = new Date().toLocaleString(),1000);
        }
    },
}
</script>

<style lang="stylus" scoped>
    .timer-content{
        display flex
        justify-content flex-end

        .timer-title{
            min-width 120px
            text-align center
            padding 0
            margin 0
            background-color rgba(230,230,230,.2);
        }

        .timer-content{
            min-width 200px
            text-align center
            padding 0
            margin 0
            background-color rgba(230,230,230,.2);
        }
    }
</style>