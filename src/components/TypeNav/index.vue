<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterSort">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="aa">
          <div class="sort" v-show="show">
            <div class="all-sort-list2">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
                @click="goSearch"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue"
import { useStore } from "vuex"
import { throttle } from "lodash"
import { useRouter, useRoute } from "vue-router"
export default {
  name: "TypeNav",
  setup() {
    // 挂载后触发
    onMounted(() => {
      // 在非主页中让三级联动隐藏
      if (route.path != "/home") {
        show.value = false;
      }
    });

    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    // 三级联动是否显示
    const show = ref(true);
    // 三级联动数据
    const categoryList = computed(() => store.state.home.categoryList);
    let currentIndex = ref(-1);
    // 移入一级分类触发,节流
    let changeIndex = throttle(function (index) {
      currentIndex.value = index;
    }, 50);
    // 移出分类触发
    let leaveIndex = () => {
      // 延时器(为了防止出现鼠标移出后背景颜色不变的情况)
      setTimeout(() => {
        currentIndex.value = -1;
      }, 50);
      if (route.path != "/home") {
        show.value = false;
      }
    };
    // 进入分类时触发
    let enterSort = () => {
      if (route.path != "/home") {
        show.value = true;
      }
    };
    // 点击分类后跳到search路由
    let goSearch = (event) => {
      let { categoryname, category1id, category2id, category3id } = event.target.dataset;
      // 路由跳转需要的数据
      let info = {
        name: "search",
        query: {
          categoryname,
        },
      };
      // 获取不同级别分类的数据
      if (categoryname) {
        if (category1id) {
          info.query.category1id = category1id;
        } else if (category2id) {
          info.query.category2id = category2id;
        } else {
          info.query.category3id = category3id;
        }
        if(route.params){
          info.params = route.params
        }
        // 路由跳转
        router.push(info);
      }
    };
    return {
      show,
      categoryList,
      currentIndex,
      changeIndex,
      leaveIndex,
      goSearch,
      enterSort,
    };
  },
};
</script>

<style scoped lang='less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // sort移入移出的过渡动画
    .aa-enter-active,
    .aa-leave-active {
      height: 461px; 
      transition:all 0.5s;
    }
    .aa-enter-from,
    .aa-leave-to {
      height: 0;
    }
  }
}
</style>