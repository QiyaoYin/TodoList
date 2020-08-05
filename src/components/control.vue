<template>
    <div class="control-content">
        <button class="control-button finish-button" type="button" @click="finishSelect">Finished Selected</button>
        <button class="control-button clear-all-button" type="button" @click="clearAll">Clear All</button>
    </div>
</template>

<script>
export default {
    name: 'control',
    methods:{
        finishSelect(){
            this.$emit('finish-select');
        },
        clearAll(){
            this.$emit('clear-all');
        }
    }
}
</script>

<style lang="stylus" scoped>
    .control-content{
        display flex
        justify-content flex-end
        width 100%
        box-sizing border-box

        .control-button{
            background-color transparent 
            border none 
            outline none 
            padding 10px
            margin 0 10px
            cursor pointer

            &:hover{
                color $strongGreen
            }
        }
    }
</style>