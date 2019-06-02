<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h1 class="title">{{ newsInfo.title }}</h1>
    <!-- 子标题 -->
    <p class="sub-title">
      <span>发表时间:{{ newsInfo.publishTime | dateFormat }}</span>
      <span>点击数: {{ newsInfo.clicks }}</span>
    </p>

    <hr>
    <!-- 内容区域 -->
    <div class="content">
      <p>{{newsInfo.content}}</p>
      <img :src="newsInfo.imgUrl" alt>
    </div>
    <!-- 评论子组件 -->
    <comment></comment>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
// 导入子组件
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id, //将 url 地址中传递过来的值，挂载到data上
      newsInfo: {},
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$axios
        .get("/newsInfo/" + this.id)
        .then(result => {
          console.log(result.data);
          if (Object.keys(result.data) != 0) {
            this.newsInfo = result.data;
          } else
            Toast({
              message: "加载失败",
              duration: 1000
            });
        })
        .catch(err => {});
    }
  },
  components: {
    //引用子组件
    comment
  }
};
</script>

<style lang="less">
.newsinfo-container {
  padding: 5px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0px;
  }
  .sub-title {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>