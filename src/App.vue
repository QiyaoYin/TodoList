<template>
    <router-view></router-view>
</template>

<script>
export default {
  name: 'app',
  beforeCreate(){
    this.axios.defaults.baseURL = this._URL;
  },
}
</script>

<style lang="stylus">
    html,body{
        width 100%
        height 100%
        -webkit-font-smoothing: antialiased
        font-family sans-serif
        margin 0
        padding 0
        -webkit-tap-highlight-color rgba(0, 0, 0, 0)
        overflow hidden
    }
    body{
      background-color rgba(157,200,200,.5)
    }
</style>