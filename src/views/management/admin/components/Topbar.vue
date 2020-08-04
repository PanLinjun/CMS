<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="10">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input
              v-model="listQuery.username"
              placeholder="请输入用户名"
              clearable
              @keyup.enter.native="handleFilter"
            />
          </el-col>
          <el-button icon="el-icon-search" circle @click="handleFilter"></el-button>
        </el-row>
      </el-col>
      <el-col :span="3">
        <el-row type="flex" justify="end">
          <el-button type="primary" circle @click="dialogFormVisible = true">
            <svg-icon icon-class="addpeople" style="height: 20px; width: 20px"/>
          </el-button>
          <el-button type="danger" circle @click="handleRefresh">
            <svg-icon icon-class="delete" style="height: 20px; width: 20px"/>
          </el-button>
          <el-button type="success" circle @click="handleRefresh">
            <svg-icon icon-class="refresh" style="height: 20px; width: 20px"/>
          </el-button>
        </el-row>
      </el-col>
    </el-row>

    <el-dialog title="填写用户信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-col :span="20">
            <el-input v-model="form.username"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-col :span="20">
            <el-input v-model="form.password"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="nickname" prop="nickname">
          <el-col :span="20">
            <el-input v-model="form.nickname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="用户权限" prop="role">
          <el-col :span="20">
            <el-select v-model="form.role" placeholder="请选择">
              <el-option
                v-for="item in roleList"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-col :span="20">
            <el-input v-model="form.phone"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-col :span="20">
            <el-input v-model="form.email"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="上传头像">
          <el-col :span="20">
            <el-upload
              action="string"
              class="avatar-uploader"
              :file-list="fileList"
              list-type="picture-card"
              :limit="1"
              :http-request="uploadImg">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-form-item>
        <div class="button-container">
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button @click="goBack">返回</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { uploadImg } from '@/api/img'
  import { createAdmin } from '@/api/admin'

  export default {
  name: 'Topbar',
  inject: ['reload'],
  props: ['categoryList', 'dia', 'userInfo'],
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必填项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必填项'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: '',
        nickname: '',
        role: '',
        phone: '',
        email: '',
        avatar: ''
      },
      rules: {
        username: [{ validator: validateRequire }],
        password: [{ validator: validateRequire }],
        role: [{ validator: validateRequire }],
        nickname: [{ validator: validateRequire }],
        phone: [{ validator: validateRequire }],
        email: [{ validator: validateRequire }]
      },
      roleList: [
        {
          value: '选项1',
          label: 'admin'
        },
        {
          value: '选项2',
          label: 'editor'
        }
      ],
      dialogFormVisible: false,
      listQuery: {},
      fileList: [],
      baseUrl: '/api'
    }
  },
  created() {
    this.parseQuery()
  },
  methods: {
    parseQuery() {
      // 收集查询条件
      const query = Object.assign({}, this.$route.query)
      let listQuery = {}
      if (query) {
        listQuery = {
          ...query
        }
      }
      this.listQuery = listQuery
    },
    handleCreate() {
      this.$router.push('/article/create')
    },
    handleRefresh() {
      this.reload()
    },
    handleFilter() {
      this.$router.push({
        path: '/management/admin',
        query: this.listQuery
      }).catch(() => {})
      this.reload()
    },
    uploadImg(data) {
      const imgFile = data.file
      const formData = new FormData()
      formData.append('file', imgFile)
      uploadImg(formData).then(response => {
        this.$notify({
          title: '成功',
          message: response.msg,
          type: 'success',
          duration: 2000
        })
        this.form.avatar = response.data
        console.log(this.form.avatar)
      }).catch((error) => {
        console.log(error)
      })
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.form)
          const admin = Object.assign({}, this.form)
          createAdmin(admin).then(response => {
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
    goBack() {
      this.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
  .button-container {
    text-align: center;
  }
</style>
