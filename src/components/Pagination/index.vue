<template>
  <!-- 分页器 -->
  <!-- 传入的数据 -->
  <!-- continues -->
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
    <button v-if="startNumAndEndNum[0] != 1" @click="$emit('getPageNo', 1)">1</button>
    <button v-if="startNumAndEndNum[0] > 2">···</button>

    <button 
      v-for="page in startNumAndEndNum" 
      :key="page"
      :class="{active:page == pageNo}"
      @click="$emit('getPageNo', page)"
    >{{page}}</button>

    <button v-if="startNumAndEndNum[startNumAndEndNum.length-1] < totalPage-1">···</button>
    <button 
      v-if="startNumAndEndNum[startNumAndEndNum.length-1] != totalPage"
      @click="$emit('getPageNo', totalPage)"
    >{{totalPage}}</button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
import { computed } from "vue"
export default {
  name: "Pagination",
  props:{
    pageNo:{
      type: Number,
      required: true
    },
    pageSize:{
      type: Number,
      required: true
    },
    total:{
      type: Number,
      required: true
    },
    continues:{
      type: Number,
      required: true
    }
  },
  emits:['getPageNo'],
  setup(props) {
    // 总共多少页
    const totalPage = computed(() => Math.ceil(props.total / props.pageSize))
    // 展示的页码
    const startNumAndEndNum = computed(() => {
      let page = Math.floor(props.continues / 2)
      let start = 0
      let end = 0
      // 如果总的页数少于连续页数
      if (totalPage.value <= props.continues) {
        start = 1
        end = totalPage.value
        // 如果连续页码的起始页码小于1
      } else if (props.pageNo - page < 1) {
        start = 1
        end = props.continues
        // 如果连续页码的结束页码大于总的页码
      } else if (props.pageNo + page > totalPage.value) {
        start = totalPage.value - props.continues + 1
        end = totalPage.value
        // 正常情况
      } else {
        start = props.pageNo - page
        end = props.pageNo + page
      }
      let arr = []
      for(let i=0;i<=end-start;i++){
        arr.push(start+i)
      }
      return arr
    })

    return {
      totalPage,
      startNumAndEndNum,
    }
  },
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>