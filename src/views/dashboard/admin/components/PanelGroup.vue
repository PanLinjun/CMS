<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :span="5" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-admin">
          <svg-icon icon-class="admin" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            管理员数
          </div>
<!--          <count-to :start-val="0" :end-val="data.user" :duration="2600" class="card-panel-num" />-->
        </div>
      </div>
    </el-col>

    <el-col :span="5" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-document">
          <svg-icon icon-class="document" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            文章数
          </div>
          <!--          <count-to :start-val="0" :end-val="data.user" :duration="2600" class="card-panel-num" />-->
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'PanelGroup'
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
    }

    .icon-admin {
      color: #2b2f3a;
    }

    .icon-document {
      color: #f4516c;
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

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
