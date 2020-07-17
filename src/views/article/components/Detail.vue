<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-position="right" label-width="80px">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="6">
            <el-form-item label="标题" prop="title">
              <el-input v-model="postForm.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="文档分类" prop="category">
              <el-select v-model="postForm.category" placeholder="请选择">
                <el-option
                  v-for="item in categoryList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="文档分类" prop="tag">
              <el-checkbox-group v-model="postForm.tag" size="small">
                <el-checkbox v-for="item in tagList" :label="item.label" :key="item.value" class="tagCheck">{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="作者">
              <el-input v-model="postForm.author"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="80px" label="摘要">
          <el-input v-model="postForm.content_short" :rows="1" type="textarea" class="article-textarea" autosize/>
        </el-form-item>

        <el-form-item prop="content" style="margin-bottom: 20px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </el-form-item>

        <div class="button-container">
          <el-button type="primary">发布</el-button>
          <el-button type="warning" @click="submitForm">保存为草稿</el-button>
          <el-button @click="goBack">返回</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import { createArticle, updateArticle, getArticle, getCategory, listTag } from '@/api/article'
  import { mapGetters } from 'vuex'

  export default {
    name: 'CreateArticle',
    components: { Tinymce },
    inject: ['reload'],
    computed: {
      ...mapGetters([
        'username'
      ])
    },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
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
        postForm: {
          id: '',
          title: '',
          author: '',
          createUser: '',
          category: '',
          tag: [],
          content_short: '',
          content: '',
          state: ''
        },
        rules: {
          title: [{ validator: validateRequire }],
          category: [{ validator: validateRequire }],
          content: [{ validator: validateRequire }]
        },
        categoryList: [],
        tagList: []
      }
    },
    created() {
      if (this.isEdit) {
        const articleId = this.$route.params.id
        this.getArticleData(articleId)
      }
    },
    mounted() {
      this.getCategoryList()
      this.getTagList()
    },
    methods: {
      setData(data) {
        const {
          id,
          title,
          author,
          createUser,
          category,
          content_short,
          content,
          state
        } = data
        const tag = data.tag.split(',')
        this.postForm = {
          id,
          title,
          author,
          category,
          createUser,
          tag,
          content_short,
          content,
          state
        }
      },
      submitForm() {
        console.log(this.postForm)
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.postForm.createUser = this.username
            this.postForm.state = '草稿'
            const article = Object.assign({}, this.postForm)
            if (!this.isEdit) {
              createArticle(article).then(response => {
                this.$notify({
                  title: '成功',
                  message: response.msg,
                  type: 'success',
                  duration: 2000
                })
              }).catch((error) => {
                console.log(error)
              })
            } else {
              updateArticle(article).then(response => {
                this.$notify({
                  title: '成功',
                  message: response.msg,
                  type: 'success',
                  duration: 2000
                })
              }).catch((error) => {
                console.log(error)
              })
            }
          } else {
            return false
          }
        })
      },
      getArticleData(id) {
        getArticle(id).then(response => {
          this.setData(response.data)
          console.log(this.postForm)
        })
      },
      getCategoryList() {
        getCategory().then(response => {
          this.categoryList = response.data
        })
      },
      goBack() {
        this.$router.push(`/article/list`)
        this.reload()
      },
      getTagList() {
        listTag().then(response => {
          this.tagList = response.data
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .createPost-main-container {
    padding: 10px 10px;

    .button-container {
      display: inline-block;
      padding: 10px 10px;
      float: right;
    }
  }

  .tagCheck {
    margin-right: 5px;
  }
</style>
