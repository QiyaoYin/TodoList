<template>
    <div class="todo-pan" v-if="!isEmpty">
        <h5 class="pan-title">{{ title }}</h5>
        <todo-item v-for="item in lists"
            :key='item.id'
            :todo='item'
            @change-select="changeSelect"
            @finish-item="finishItem"
        />
    </div>
</template>

<script>
import todoItem from './Todoitem'
export default {
    name: 'todopan',
    props: {
        title: {
            type: String,
            required: true
        },
        lists: {
            type: Array,
            required: true
        }
    },
    computed:{
        isEmpty(){
            return this.lists.length > 0 ? false : true;
        }
    },
    methods:{
        changeSelect(flag,id){
            this.$emit('change-select',flag,id);
        },
        finishItem(id){
            this.$emit('finish-item',id);
        },
    },
    components:{
        todoItem
    }
}
</script>

<style lang="stylus" scoped>
    .todo-pan{
        border-radius 10px 10px 0 0

        .pan-title{
            margin 0
            padding 20px 10px 
        }
    }
</style>