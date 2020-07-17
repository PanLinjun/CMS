<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-col :span="20">
          <el-input v-model="form.username" :disabled="true"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码">
        <el-col :span="20">
          <el-button type="primary">修改密码</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="nickname" prop="nickname">
        <el-col :span="20">
          <el-input v-model="form.nickname"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="用户权限">
        <el-col :span="20">
          <el-select v-model="form.role" placeholder="请选择" :disabled="true">
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
            list-type="picture-card"
            :http-request="uploadImg">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-form-item>
      <div class="button-container">
        <el-button type="primary" @click="submitForm">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import { getAdmin, updateAdmin } from '@/api/admin'
  import { mapGetters } from 'vuex'
  import { uploadImg } from '@/api/img'

  export default {
    name: 'Profile',
    inject: ['reload'],
    computed: {
      ...mapGetters([
        'username',
        'avatar'
      ])
    },
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
        ]
      }
    },
    mounted() {
      this.getUserInfo(this.username)
    },
    methods: {
      setData(data) {
        const {
          username,
          nickname,
          role,
          phone,
          email,
          avatar
        } = data
        this.form = {
          username,
          nickname,
          role,
          phone,
          email,
          avatar
        }
      },
      getUserInfo(username) {
        getAdmin(username).then(response => {
          this.setData(response.data)
        })
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
            updateAdmin(admin).then(response => {
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .button-container {
    text-align: center;
  }
</style>
