<template>
    <div class='submit-pan'>
        <div class="exit-submit-pan" @click.stop="exitSubmitPan">
            <svg class="exit icon" t="1596628042314" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2958"><path d="M559.786667 512l314.026666-314.026667c13.653333-13.653333 13.653333-34.133333 0-47.786666-13.653333-13.653333-34.133333-13.653333-47.786666 0L512 464.213333 197.973333 150.186667c-13.653333-13.653333-34.133333-13.653333-47.786666 0-13.653333 13.653333-13.653333 34.133333 0 47.786666l314.026666 314.026667-314.026666 314.026667c-13.653333 13.653333-13.653333 34.133333 0 47.786666 13.653333 13.653333 34.133333 13.653333 47.786666 0l314.026667-314.026666 314.026667 314.026666c13.653333 13.653333 34.133333 13.653333 47.786666 0 13.653333-13.653333 13.653333-34.133333 0-47.786666L559.786667 512z" p-id="2959" fill='#999'></path></svg>
        </div>
        <div class="todo-input-content date-input-content">
            <input :class="['date-input','todo-input',isMobile ? 'unactive' : '']" v-model="todoDate" type="date">
            <input :class="['date-input-mobile','todo-input',isMobile ? 'active' : '']" type="text" :value="todoDate" readonly placeholder="请选择时间">
        </div>
        <div class="todo-input-content title-input-content">
            <input class="todo-input title-input" v-model="todoTitle" type="text" placeholder="title">
        </div>
        <div class="todo-input-content description-input-content">
            <textarea v-model="todoDescription" class="todo-input description-input" cols="30" rows="10" placeholder="description"></textarea>
        </div>
        <button class="submit-todo" type="button" @click="submitTodo">ADD TO DO</button>
    </div>
</template>


<script>
export default {
    name: 'submitpan',
    props:{
        isMobile:{
            type:Boolean,
            required:true
        }
    },
    data() {
        return {
            todoDate: '',
            todoTitle: '',
            todoDescription: '',
        }
    },
    methods:{
        //退出todolist输入框
        exitSubmitPan(){
            this.$emit('exit-submit-pan');
        },
        //提交
        submitTodo(){
            if(this.todoDate && this.todoTitle) this.$emit('submit-todo',this.todoDate,this.todoTitle,this.todoDescription);
        }
    }
}
</script>

<style lang="stylus" scoped>
    .submit-pan{
        position absolute
        top 0
        bottom 0
        display flex
        flex-direction column
        border-radius 0 7px 7px 0
        padding 0 10px
        box-shadow 1px 0 10px rgba(150,150,150,.4);
        background-color #ffffff
        z-index 1001
        
        @media screen and (max-width: 764px){
            width 100%
            box-sizing border-box
            border-radius 7px 7px 0 0
            top 70px
        }
        .exit-submit-pan{
            display flex
            justify-content flex-end
            width 100%
            padding 5px

            .exit{
                display block
                height 20px
                width auto
                cursor pointer
                transition transform .3s linear

                &:hover{
                    transform rotate(90deg) scale(1.1)

                    path{
                        fill $strongGreen
                    }
                }
            }
        }
        .date-input-content{
            position relative
        }

        .todo-input-content{
            width 100%;
            min-height 55px
            box-sizing border-box
            padding 10px

            .todo-input{
                width 100%
                border 1px solid #999
                border-radius 5px
                outline none
                padding 5px 10px
                box-sizing border-box
            }

            .date-input,.date-input-mobile,.title-input,.submit-todo{
                height 35px   
            }

            .date-input.unactive{
                opacity 0
            }

            .date-input,.date-input-mobile{
                width calc(100% - 20px);
                position absolute
                left 10px
                top 10px
            }
            .date-input{
                z-index 100
            }
            .date-input-mobile{
                z-index 1
            }
        }

        .submit-todo{
            box-sizing content-box
            padding 10px
            border none 
            border-radius 5px
            outline none 
            color #fff
            background-color $lightGreen
            cursor pointer

            &:hover{
                background-color $strongGreen
            }
        }
    }
</style>