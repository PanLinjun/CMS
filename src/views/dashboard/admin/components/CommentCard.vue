<template>
  <div class="card-wrapper">
    <div class="card-title">
      <span>近期评论</span>
    </div>
    <div class="card-content">
      <div v-for="item in commentList" :key="item.id" class="content-item">
        <div class="content-top">
          <a class="content-from-id" @click="handleCommentClick(item.owner_id)">{{ item.from_id }}</a> 在 {{ item.create_time }} 评论
        </div>
        <div class="content-bottom">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { listComment } from '@/api/comment'
import { redirect_url } from '@/constant'

export default {
  name: "CommentCard",
  data() {
    return {
      commentList: [],
      limit: 5
    }
  },
  created() {
    this.listComment()
  },
  methods: {
    listComment() {
      const params = {
        limit: this.limit
      }
      listComment(params).then( response => {
        const { data } = response
        this.commentList = data.reverse()
      })
    },
    handleCommentClick(owner_id) {
      const url = redirect_url + `/content?id=${owner_id}`
      window.open(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-wrapper {
  width: 600px;
  padding: 10px 0;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 2px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16);

  .card-title {
    padding: 0 20px 10px;
    font-size: 1rem;
    border-bottom: 1px solid #bfcbd9;
  }

  .card-content {
    margin: 10px 40px;

    .content-item {
      padding: 5px;

      .content-bottom {
        padding: 10px;
        word-wrap:break-word;
        background-color: rgb(240, 242, 245);
      }

      .content-from-id {
        cursor: pointer;
      }
    }
  }
}
</style>