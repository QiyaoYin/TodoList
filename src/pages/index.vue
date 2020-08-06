<template>   
    <div>
        <transition name='todo-content-ani'>
            <todo-content 
                :isMobile='isMobile' 
                v-if="isShowTodoContent" 
                @exit-todo-content="exitTodoContent" 
                @submit-todo="submitTodo"
            />

            <div id="show-todo-content" 
                @click.stop="isShowTodoContent = true" 
                v-if="!isShowTodoContent"
            >
                <svg t="1596622673094" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1989"><path d="M866.016 476h-318.016V165.984q0-15.008-10.496-25.504T512 129.984q-15.008 0-25.504 10.496t-10.496 25.504v310.016h-312q-14.016 0-24.992 10.496T128 512q0 15.008 11.008 25.504t24.992 10.496h312v312q0 14.016 10.496 24.992T512 896q15.008 0 25.504-11.008t10.496-24.992v-312h318.016q15.008 0 25.504-10.496t10.496-25.504q0-15.008-10.496-25.504t-25.504-10.496z" p-id="1990" fill="#fff"></path></svg>
            </div>
        </transition>
        <div id="main-content">
            <today/>
            <control 
                @finish-select="finishSelect" 
                @clear-all="clearAll"
            />
            <template v-for="item in todoList">
                <todo-item 
                    :todo='item' 
                    :key="item.id"
                    @change-select="changeSelect" 
                    @finish-item="finishItem"
                />
            </template>
        </div>
    </div>
</template>
<script>
import todoContent from '../components/TodoContent'
import todoItem from '../components/Todoitem'
import today from '../components/today'
import control from '../components/control'

export default {
    name: 'index',
    data() {
        return {
            screen:[document.body.clientWidth,document.body.clientHeight],
            isShowTodoContent: false,
            todoList:[],
        }
    },
    mounted(){
        this.watchResize();
        this.getTodo();
    },
    computed:{
        isMobile(){
            return (this.screen[0] <= 764);
        }
    },
    updated(){
        console.log('updated');
        console.log(this.isMobile);
    },
    methods:{
        //监听窗口大小变化
        watchResize(){
            let that = this;
            window.onresize = function(){
                that.screen = [document.body.clientWidth,document.body.clientHeight];
            }
        },
        //退出输入todo的内容框
        exitTodoContent(){
            this.isShowTodoContent = false;
        },
        //改变选中状态
        changeSelect(flag,id){
            flag = ((flag === undefined) ? true : !flag);
            this.todoList.forEach(element => element.selected = element.id === id ?  flag : element.selected);
        },
        //点击完成选中元素
        finishSelect(){
            this.todoList.forEach(element=>{
                if(element.selected){
                    this.axios.post('deleteTodo',{id: element.id}).then(res=>{
                        res = res.data;
                        if(res.status === 200){
                                this.todoList = res.message;
                            }else{
                                alert(res.message);
                                console.log(res.description);
                                return ;
                            }
                    }).catch(err=>{
                        alert(err.data.message);
                        console.log(err.data.description);
                        return ;
                    });
                }
            });
            this.todoList = this.todoList.filter(item=>!item.selected);
        },
        //清除全部
        clearAll(){
                this.todoList.forEach(element=>{
                    this.axios.post('deleteTodo',{id: element.id}).then(res=>{
                        res = res.data;
                        if(res.status === 200){
                            this.todoList = res.message;
                        }else{
                            alert(res.message);
                            console.log(res.description);
                            return ;
                        }
                    }).catch(err=>{
                        alert(err.data.message);
                        console.log(err.data.description);
                        return ;
                    });
                });
        },
        //删除特定项
        finishItem(id){
            this.axios.post('deleteTodo',{id}).then(res=>{
                res = res.data;
                if(res.status === 200){
                    this.todoList = res.message;
                }else{
                    alert(res.message);
                    console.log(res.description);
                }
            }).catch(err=>{
                alert(err.data.message);
                console.log(err.data.description);
            });
            this.todoList = this.todoList.filter(item=>item.id != id);
        },

        //提交todo
        submitTodo(deadline,title,description){
            this.axios.post('submit',{deadline,title,description}).then((res) => {
                res = res.data;
                if(res.status === 200){
                    this.todoList = res.message;
                    this.isShowTodoContent = false;
                }else{
                    alert(res.message);
                    console.log(res.description);
                }
            }).catch((err) => {
                alert(err.data.message);
                console.log(err.data.description);
            });
        },
        //获取todo
        getTodo(){
            this.axios.post('getList').then(res=>{
                res = res.data;
                if(res.status === 200){
                    this.todoList = res.message;
                }else{
                    alert(res.message);
                    console.log(res.description);
                }
            }).catch(err=>{
                alert(err.data.message);
                console.log(err.data.description);
            });
        }
    },
    components:{
        todoContent,
        todoItem,
        today,
        control
    }
}
</script>

<style lang="stylus">
    #show-todo-content{
        position absolute
        left 10px
        top 10px
        display flex
        align-items center
        justify-content center
        width 40px
        height 40px
        border none 
        border-radius 20px
        background-color $midGreen
        opacity .8
        cursor pointer
        transition opacity .2s linear,transform .2s linear,background-color .2s linear

        &:hover{
            opacity 1
            transform scale(1.1)
            background-color $strongGreen

        }

        @media screen and (max-width: 764px){
            left unset 
            top unset 
            bottom 10px
            right 10px
        }

        svg{
            width 80%
            height 80%
        }
    }

    #main-content{
        margin 0 auto

        @media screen  and (min-width: 764px){
            min-width 500px
            max-width 660px   
        }

        @media screen and (max-width: 764px){
            padding 0 10px
            box-sizing border-box
            width 100%;
        }
    }

    /** animation */
    .todo-content-ani-enter{
        transform translateX(-300px)

        @media screen and (max-width: 764px){
            transform translateY(100%)
        }
    }

    .todo-content-ani-enter-active{
        transition transform .3s cubic-bezier(1, 0.05, 1, 1.6)
    }

    .todo-content-ani-leave-active{
        transition transform .3s cubic-bezier(0.02,-0.28, 0.99, 0.04)
    }

    .todo-content-ani-leave-to{
        transform translateX(-300px);

        @media screen and (max-width: 764px){
            transform translateY(100%)
        }
    }

</style>