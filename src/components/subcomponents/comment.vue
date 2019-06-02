<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <textarea class="cmt-area" placeholder="请输入要BB的内容(最多吐槽120字)" maxlength="120"></textarea>

    <mt-button type="primary" size="large">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in commentsList" :key="index">
        <p class="cmt-info">{{index + 1}}楼 &nbsp;&nbsp; 用户：{{item.userName}}
           &nbsp;&nbsp; 发表时间: {{item.publishTime | dateFormat}}</p>
        <p class="cmt-content">{{item.content}}</p>
      </div>
    
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1,
      commentsList: []
    };
  },
  created() {
    this.getCommentsList()
  },
  methods: {
    getCommentsList() {
      this.$axios
        .get("/comments?pageIndex=" + this.pageIndex)
        .then(result => {
          // this.commentsList = result.data;
          // 每当获取新评论数据时候，不要把旧数据覆盖，还是拼接上去
          this.commentsList = this.commentsList.concat(result.data)
        })
        .catch(err => {});
    },
    getMore() {
      this.pageIndex++;
      this.getCommentsList()
    }
  }
};
</script>

<style lang="less" scoped>
.cmt-container {
  h3 {
    font-size: 16px;
  }
  textarea {
    font-size: 13px;
    margin-bottom: 0px;
  }
  .cmt-item {
    margin: 5px 0;
    .cmt-info {
      background-color: #eeeeee;
      line-height: 20px;
      color: blue;
    }
    .cmt-content {
      line-height: 25px;
      text-indent: 2em;
    }
  }
}
</style>