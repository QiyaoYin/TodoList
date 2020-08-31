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

</style>