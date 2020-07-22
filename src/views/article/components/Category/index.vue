<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>分类目录</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">新增类别</el-button>
      </div>
      <div v-for="item in categoryList" :key="item.value" class="text item">
        <span class="item-wrapper">{{ item.label }}</span>
        <el-button type="primary" icon="el-icon-edit" circle size="mini" class="button-wrapper"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle size="mini" class="button-wrapper" @click="handleDelete(item.value)"></el-button>
      </div>
    </el-card>

    <el-dialog title="新建分类" :visible.sync="dialogFormVisible" width="30%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分类名" prop="label">
          <el-col :span="20">
            <el-input v-model="form.label"></el-input>
          </el-col>
        </el-form-item>
        <div class="button-container">
          <el-button type="primary" @click="submitForm">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { getCategory, createCategory, deleteCategory } from '@/api/article'

  export default {
    name: 'ArticleCategory',
    inject: ['reload'],
    data() {
      const validateRequire = (rule, value, callback) => {
        if (value === '') {
          this.$message({
            message: '分类为必填项',
            type: 'error'
          })
          callback(new Error('分类为必填项'))
        } else {
          callback()
        }
      }
      return {
        categoryList: {},
        form: {
          value: 0,
          label: ''
        },
        dialogFormVisible: false,
        rules: {
          label: [{ validator: validateRequire }]
        }
      }
    },
    mounted() {
      this.getCategoryList()
    },
    methods: {
      getCategoryList() {
        getCategory().then(response => {
          this.categoryList = response.data
        })
      },
      submitForm() {
        this.$refs.form.validate(valid => {
          if (valid) {
            const index = this.categoryList.map(arr => arr.value)
            console.log(index)
            if (index.length === 0) {
              this.form.value = 1
            } else {
              this.form.value = Math.max(...index) + 1
            }
            const category = Object.assign({}, this.form)
            createCategory(category).then(response => {
              this.$notify({
                title: '成功',
                message: response.msg,
                type: 'success',
                duration: 2000
              })
              this.reload()
            }).catch((error) => {
              console.log(error)
            })
          } else {
            return false
          }
        })
      },
      handleDelete(value) {
        this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCategory(value).then(response => {
            this.$notify({
              title: '成功',
              message: response.msg || '删除成功',
              type: 'success',
              duration: 2000
            })
            this.reload()
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .button-container {
    text-align: center;
  }

  .text {
    font-size: 20px;
  }

  .item {
    margin: 12px 20px;

    .item-wrapper {
      vertical-align: middle;
    }

    .button-wrapper {
      vertical-align: middle;
      margin-left: 10px;
    }
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    margin: 100px auto;
  }
</style>
