<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
        <el-breadcrumb-item>编辑器</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-input v-model="title"></el-input>
    <div class="plugins-tips">
内容
    </div>
    <quill-editor ref="myTextEditor" v-model="content" :config="editorOption" style="height: 330px"></quill-editor>
    <br><br><br>
    <span style="font-size: smaller">文章分类</span>
    <el-select v-model="value" placeholder="请选择" size="small">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <span style="font-size: smaller">标签</span>
    <el-tag
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    <el-button class="editor-btn" type="primary" @click="submit" size="small">提交</el-button>
  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'
  import axios from 'axios'
  export default {
    data: function(){
      return {
        content: '',
        title:'',
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        options: [{
          value: '1',
          label: '代码'
        }, {
          value: '2',
          label: '旅游'
        }, {
          value: '3',
          label: '美食'
        }, {
          value: '4',
          label: '关于'
        }],
        value: '',
        editorOption: {
          // something config
        }
      }
    },
    created(){
      axios.get('/article/' + this.$store.state.article.currentArticle)
          .then(res => {
            console.log(res)
            this.content = res.data.content
            this.title=res.data.title
          })
    },
    components: {
      quillEditor
    },
    methods: {
      onEditorChange({ editor, html, text }) {
        this.content = html;
      },
      submit(){
        let title=this.title,
          content=this.content,
          cate=this.value
        axios.patch('/article/'+this.$store.state.article.currentArticle,{title,content,cate})
          .catch(error=>{
            console.log(error)
          })
        console.log(this.content);
        this.$message.success('修改成功！');
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    },
    computed: {
      editor() {
        return this.$refs.myTextEditor.quillEditor;
      }
    }
  }
</script>
<style scoped>
  .editor-btn{
    margin-top: 20px;
  }
</style>
