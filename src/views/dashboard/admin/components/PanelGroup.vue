<template>
  <el-row :gutter="40" class="panel-group" type="flex" justify="space-around">
    <el-col :span="5" class="card-panel-col">
      <div class="card-panel" id="manager">
        <div class="card-panel-icon-wrapper icon-admin">
          <svg-icon icon-class="admin" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            管理员数
          </div>
          <span class="card-panel-num">{{adminCount}}</span>
        </div>
      </div>
    </el-col>

    <el-col :span="5" class="card-panel-col">
      <div class="card-panel" id="article" @click="handleClick">
        <div class="card-panel-icon-wrapper icon-document">
          <svg-icon icon-class="document" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            文章数
          </div>
          <span class="card-panel-num">{{articleCount}}</span>
        </div>
      </div>
    </el-col>

    <el-col :span="5" class="card-panel-col">
      <div class="card-panel" id="click" @click="handleClick">
        <div class="card-panel-icon-wrapper icon-click">
          <svg-icon icon-class="click" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总点击量
          </div>
          <span class="card-panel-num">{{clickCount}}</span>
        </div>
      </div>
    </el-col>

    <el-col :span="5" class="card-panel-col">
      <div class="card-panel" id="comment" @click="handleClick">
        <div class="card-panel-icon-wrapper icon-comment">
          <svg-icon icon-class="comment" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总评论数
          </div>
          <span class="card-panel-num">{{commentCount}}</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import { listAdmin } from '@/api/admin'
  import { listArticle } from '@/api/article'
  import { listComment } from '@/api/comment'

  export default {
    name: 'PanelGroup',
    data() {
      return {
        adminCount: 0,
        articleCount: 0,
        clickCount: 0,
        commentCount: 0,
      }
    },
    mounted() {
      this.getAdminCount()
      this.getArticleCount()
      this.getCommentCount()
    },
    methods: {
      getAdminCount() {
        listAdmin().then(response => {
          const {
            total
          } = response
          this.adminCount = total
        })
      },
      getCommentCount() {
        listComment().then(response => {
          const {
            data
          } = response
          this.commentCount = data.reduce((accumulator, currentValue) => {
            return  accumulator + currentValue.childrenCount
          }, 0)
        })
      },
      getArticleCount() {
        listArticle().then(response => {
          const {
            data,
            total
          } = response
          this.clickCount = data.reduce((accumulator, currentValue) => {
            return  accumulator + currentValue.click
          }, 0)
          this.articleCount = total
        })
      },
      handleClick(e) {
        this.$emit('panelClick', e.currentTarget.id)
      }
    }
  }
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-admin {
        background: #2b2f3a;
      }

      .icon-document {
        background-color: #f4516c;
      }

      .icon-click {
        background-color: #3A71A8;
      }

      .icon-comment {
        background-color: #34bfa3;
      }
    }

    .icon-admin {
      color: #2b2f3a;
    }

    .icon-document {
      color: #f4516c;
    }

    .icon-click {
      color: #3A71A8;
    }

    .icon-comment {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
         float: left;
         font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      text-align: center;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 25px;
      }
    }
  }
}
</style>
