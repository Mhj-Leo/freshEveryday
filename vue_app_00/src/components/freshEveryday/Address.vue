<template>
    <div class="container">
        <van-tree-select
        :items="items"
        :main-active-index="mainActiveIndex"
        :active-id="activeId"
        @click-nav="onClickNav"
        @click-item="onClickItem"
        />
    </div>
</template>
<script>
export default {
    data(){
        return{
                 items:[
  {
    // 导航名称
    text: '所有城市',
    // 该导航下所有的可选项
    children: [
      {
        // 名称
        text: '温州',
        // id，作为匹配选中状态的标识
        id: 1,
        // 禁用选项
        disabled: false
      },
      {
        text: '杭州',
        id: 2,
        disabled: false
      },
      {
        text: '南京',
        id: 3,
        disabled: false
      },
      {
        text: '扬州',
        id: 4,
        disabled: false
      },
      {
        text: '上海',
        id: 5,
        disabled: false
      }
    ]
  },
    {
    // 导航名称
    text: '江苏',
    // 该导航下所有的可选项
    children: [
      {
        // 名称
        text: '南京',
        // id，作为匹配选中状态的标识
        id: 1,
        // 禁用选项
        disabled: false
      },
      {
        text: '无锡',
        id: 2,
        disabled: false
      },
      {
        text: '苏州',
        id: 3,
        disabled: false
      },
      {
        text: '徐州',
        id: 4,
        disabled: false
      },
    ]
  },
    {
    // 导航名称
    text: '浙江',
    // 该导航下所有的可选项
    children: [
      {
        // 名称
        text: '温州',
        // id，作为匹配选中状态的标识
        id: 1,
        // 禁用选项
        disabled: false
      },
      {
        text: '杭州',
        id: 2,
        disabled: false
      },
      {
        text: '宁波',
        id: 3,
        disabled: false
      },
      {
        text: '义乌',
        id: 4,
        disabled: false
      },
    ]
  }
],
      // 左侧高亮元素的index
      mainActiveIndex: 0,
      // 被选中元素的id
      activeId: 1
    };
  },
   methods: {
    onClickNav(index) {
      this.mainActiveIndex = index;
    },
    onClickItem(data) {
      this.activeId = data.id;
    }
  }
}
</script>
<style scoped>
    .container{
        height:550px;
    }
</style>