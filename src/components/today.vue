<template>
    <div class="timer-content">
        <h1>My Day</h1>
        <h3>{{ todaytime }}</h3>
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
    
</style>