<template>
    <div class="todo-item-content" @click="isShowAll = !isShowAll">
        <div class="select-content">
            <div :class="['select-icon',selected ? 'selected' : '']" @click.stop="changeSelect">
                <transition name="item-select-ani">
                    <svg v-if="selected" t="1596647425832" :class="['icon',selected ? 'active' : '']" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4625"><path d="M512 65.945945c-246.361991 0-446.060195 199.698205-446.060195 446.060195s199.698205 446.048939 446.060195 446.048939c246.360967 0 446.059172-199.686948 446.059172-446.048939S758.361991 65.945945 512 65.945945L512 65.945945zM756.604974 385.847835 456.943057 685.480077c-6.520507 6.563486-15.195074 9.780761-23.813359 9.739828-8.56098 0.040932-17.293875-3.176342-23.813359-9.739828L267.394003 543.558763c-13.039991-13.011338-13.039991-34.302247 0-47.313585 13.041014-13.014408 34.305317-13.014408 47.346331 0l118.389364 118.430296 276.129968-276.129968c13.041014-13.011338 34.305317-13.011338 47.346331 0C769.588683 351.545588 769.588683 372.836497 756.604974 385.847835L756.604974 385.847835z" p-id="4626" fill="#519D9E"></path></svg>
                </transition>
            </div>
        </div>
        <div class="detail-content">
            <div class="title-deadline-content">
                <h5 class="item-title">{{ todo.title }}</h5>
                <p class="item-deadline">{{ deadline }}</p>
            </div>
            <transition name="description-ani">
                <p v-if="isShowAll" class="item-descripton">{{ todo.description }}</p>
            </transition>
        </div>

        <div class="delete-item" type="button" @click.stop="finishItem">
            <svg t="1596722300777" class="trashbin icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1805"><path d="M1000.727273 93.090909h-311.854546L619.054545 23.272727c-4.654545-4.654545-9.309091-4.654545-13.963636-4.654545-4.654545-13.963636-13.963636-18.618182-23.272727-18.618182h-139.636364c-9.309091 0-18.618182 9.309091-23.272727 18.618182-4.654545 0-9.309091 4.654545-13.963636 4.654545L339.781818 88.436364s0 4.654545-4.654545 4.654545H23.272727c-13.963636 0-23.272727 9.309091-23.272727 23.272727s9.309091 23.272727 23.272727 23.272728h325.818182c9.309091 0 18.618182-4.654545 23.272727-13.963637h4.654546l65.163636-65.163636c0-9.309091 0-9.309091 4.654546-13.963636h134.981818c0 4.654545 4.654545 4.654545 4.654545 4.654545L651.636364 121.018182c4.654545 9.309091 13.963636 18.618182 23.272727 18.618182h325.818182c13.963636 0 23.272727-9.309091 23.272727-23.272728s-9.309091-23.272727-23.272727-23.272727zM907.636364 232.727273c-13.963636 0-23.272727 9.309091-23.272728 23.272727V930.909091c0 23.272727-18.618182 46.545455-46.545454 46.545454H186.181818c-27.927273 0-46.545455-18.618182-46.545454-46.545454V256c0-13.963636-9.309091-23.272727-23.272728-23.272727s-23.272727 9.309091-23.272727 23.272727V930.909091c0 51.2 41.890909 93.090909 93.090909 93.090909h651.636364c51.2 0 93.090909-41.890909 93.090909-93.090909V256c0-13.963636-9.309091-23.272727-23.272727-23.272727z" fill="#666" p-id="1806"></path><path d="M325.818182 861.090909v-605.090909c0-13.963636-9.309091-23.272727-23.272727-23.272727s-23.272727 9.309091-23.272728 23.272727v605.090909c0 13.963636 9.309091 23.272727 23.272728 23.272727s23.272727-9.309091 23.272727-23.272727zM512 861.090909v-605.090909c0-13.963636-9.309091-23.272727-23.272727-23.272727s-23.272727 9.309091-23.272728 23.272727v605.090909c0 13.963636 9.309091 23.272727 23.272728 23.272727s23.272727-9.309091 23.272727-23.272727zM698.181818 861.090909v-605.090909c0-13.963636-9.309091-23.272727-23.272727-23.272727s-23.272727 9.309091-23.272727 23.272727v605.090909c0 13.963636 9.309091 23.272727 23.272727 23.272727s23.272727-9.309091 23.272727-23.272727z" fill="#666" p-id="1807"></path></svg>
        </div> 
    </div>
</template>

<script>
export default {
    name: 'todoItem',
    data() {
        return {
            isShowAll: false,
            selected: false,
        }
    },
    props: ['todo'],
    computed:{
        deadline(){
            let timeRan = Date.parse(this.todo.deadline) - Date.parse(new Date().toLocaleDateString());
            if(timeRan <= 0){
                return `EXPIRED:${this.todo.deadline}`;
            }else if(timeRan <= 86400000){
                return "TODAY";
            }else if(timeRan <= 172800000){
                return "TOMORROW";
            }else{
                return this.todo.deadline;
            }
        }
    },
    watch: {
        todo: {
           handler(val){
               this.selected = val.selected;
          },
         deep: true,
         immediate: true
     }
    },
    methods:{
        changeSelect(){
            this.$emit('change-select',this.todo.selected,this.todo.id);
            this.selected = this.todo.selected;
        },
        finishItem(){
            this.$emit('finish-item',this.todo.id);
        }
    }
}
</script>

<style lang="stylus" scoped>
    .todo-item-content{
        display flex
        width calc(100% - 20px)
        padding 10px 0 0
        margin 0 10px 10px
        box-sizing border-box
        cursor pointer

        @media screen and (min-width: 764px){
            border-top 1px solid rgb(150,150,150)
        }
        .detail-content{
            display flex
            flex-direction column
            flex-grow 1
            
            .title-deadline-content{
                display flex
                justify-content space-between
                align-items center
                min-height 38px
                                
                .item-title{
                    font-size 16px
                    font-weight 500
                    margin 0
                    padding 5px
                }

                .item-deadline{
                    display flex
                    align-items center
                    font-size 14px
                    color rgb(100,100,100)
                    padding 5px
                    margin 0
                }
            }
        }

        .item-descripton{
            font-size 14px
            color #666666
        }

        .select-content{
            width 38px
            min-width 38px
            height 38px
            display flex
            align-items center
            justify-content center

            .select-icon{
                width 20px
                height 20px
                border-radius 11px
                border 1px solid #999999
                cursor pointer

                &:hover{
                    border 1px solid $strongGreen
                }

                .icon{
                    transform scale(1.2)
                }
            }
            .select-icon.selected{
                border none
            }

        }

        .delete-item{
            width 38px
            max-height 38px
            display flex
            align-items center
            justify-content center

            .trashbin{
                width 50%
                height auto
                transition transform .3s linear
                cursor pointer

                &:hover{
                    path{
                        fill $strongGreen
                    }
                }
            }
        }
    }

    /** animation */
    /**todoItem animation */
    // .todo-item-ani-enter{
    //     transform translateX(-100%)
    // }

    // .todo-item-ani-enter-active{
    //     transition transform .3s linear
    // }

    // .todo-item-ani-leave-to{
    //     transform translateX(100%)
    // }

    // .todo-item-ani-leave-active{
    //     transition transform .3s linear
    // }

    /**description animation */
    .description-ani-enter{
        opacity 0
        transform translateY(-100%)
    }

    .description-ani-enter-active{
        transition opacity .3s linear,transform .3s linear
    }

    .description-ani-leave-active{
        transition opacity .3s linear,transform .3s linear
    }

    .description-ani-leave-to{
        opacity 0
        transform translateY(100%)
    }

    /**item select animation */
    .item-select-ani-enter-active{
        animation item-selct-enter-bounce .3s linear
    }

    @keyframes item-selct-enter-bounce{
        0%{
            opacity 0
            transform scale(0)
        }
        70%{
            opacity .7
            transform scale(1.4)
        }
        100%{
            opacity 1
            transform scale(1.2)
        }
    }

    .item-select-ani-leave-active{
        animation item-selct-leave-bounce .3s linear
    }

    @keyframes item-selct-leave-bounce{
        0%{
            opacity 1
            transform scale(1.2)
        }
        30%{
            opacity .7
            transform scale(1.4)
        }
        100%{
            opacity 0
            transform scale(0)
        }
    }

</style>