<template>
    <div class="todo-item-content">
        <div class="select-content">
            <div :class="['select-icon',isSelect ? 'selected' : '']" @click="changeSelect">
                <transition name="item-select-ani">
                    <svg v-if="isSelect" t="1596647425832" :class="['icon',isSelect ? 'active' : '']" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4625"><path d="M512 65.945945c-246.361991 0-446.060195 199.698205-446.060195 446.060195s199.698205 446.048939 446.060195 446.048939c246.360967 0 446.059172-199.686948 446.059172-446.048939S758.361991 65.945945 512 65.945945L512 65.945945zM756.604974 385.847835 456.943057 685.480077c-6.520507 6.563486-15.195074 9.780761-23.813359 9.739828-8.56098 0.040932-17.293875-3.176342-23.813359-9.739828L267.394003 543.558763c-13.039991-13.011338-13.039991-34.302247 0-47.313585 13.041014-13.014408 34.305317-13.014408 47.346331 0l118.389364 118.430296 276.129968-276.129968c13.041014-13.011338 34.305317-13.011338 47.346331 0C769.588683 351.545588 769.588683 372.836497 756.604974 385.847835L756.604974 385.847835z" p-id="4626" fill="#519D9E"></path></svg>
                </transition>
            </div>
        </div>
        <div class="detail-content">
            <div class="title-deadline-content">
                <h5 class="item-title">{{ todo.title }}</h5>
                <p class="item-deadline">{{ todo.deadline }}</p>
            </div>
            <transition name="description-ani">
                <p v-if="isShowAll" class="item-descripton">{{ todo.description }}</p>
            </transition>
            <transition name="delete-item-ani">
                <button v-if="isShowAll" class="delete-item" type="button" @click="finishItem">finished</button>
            </transition>
        </div>
        <div class="show-all-content" @click="isShowAll = !isShowAll">
            <svg t="1596646837787" :class="['arrow','icon',isShowAll ? 'reverse' : '']" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3867" width="200" height="200"><path d="M232 392l280 280 280-280z" p-id="3868" fill="#A976D1"></path></svg>
            <!-- <svg t="1596646081329" :class="['arrow','icon',isShowAll ? 'reverse' : '']" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3698"><path d="M819.07712 478.69952l-225.4848 191.488a81.73568 81.73568 0 0 1-53.0432 19.47648 81.77664 81.77664 0 0 1-53.02272-19.47648l-225.4848-191.488a81.92 81.92 0 1 1 106.06592-124.86656l172.4416 146.45248 172.46208-146.45248a81.92 81.92 0 0 1 106.06592 124.86656z" p-id="3699" fill="#A976D1"></path></svg> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'todoItem',
    data() {
        return {
            isShowAll: false,
            isSelect: false,
        }
    },
    props:{
        todo:{
            type:Object,
            required:true
        }
    },
    methods:{
        changeSelect(){
            this.isSelect = !this.isSelect;
            this.$emit('change-select',this.isSelect,this.todo.id);
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
        width 100%
        padding 10px
        margin-bottom 10px
        box-sizing border-box
        background-color #ffffff
        border-radius 10px

        .detail-content{
            display flex
            flex-direction column
            flex-grow 1
            
            .title-deadline-content{
                display flex
                justify-content space-between
                                
                .item-title{
                    font-size 20px
                    font-weight bold
                    margin 0
                    padding 5px
                }

                .item-deadline{
                    display flex
                    align-items center
                    padding 5px
                    margin 0
                }
            }
        }

        .item-descripton{
            font-size 14px
            color #999999
        }

        .delete-item{
            color #666666
            background-color transparent 
            border none 
            outline none 
            cursor pointer
            align-self: flex-end;

            &:hover{
                color $strongGreen
            }
        }

        .select-content{
            width 38px
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

                .icon{
                    transform scale(1.2)
                }
            }
            .select-icon.selected{
                border none
            }

        }
        .show-all-content{
            width 38px
            height 100%
            display flex
            align-items center

            .arrow{
                width 100%
                height auto
                transition transform .3s linear
                cursor pointer
            }

            .arrow.reverse{
                transform rotate(180deg)
            }
        }
    }

    /** animation */

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

    /** delete item animation */
    .delete-item-ani-enter{
        opacity 0
        transform translateY(100%)
    }

    .delete-item-ani-enter-active{
        transition opacity .3s linear,transform .3s linear
    }

    .delete-item-ani-leave-active{
        transition opacity .3s linear,transform .3s linear
    }

    .delete-item-ani-leave-to{
        opacity 0
        transform translateY(-100%)
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