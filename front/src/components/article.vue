<template>
  <div>

    <h2 style="text-align: center">{{title}}</h2>

    <span class="article" v-html="article"></span>
  </div>

</template>
<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        title: '',
        article: '<h1>22</h1>',
      }
    },
    methods: {
      getData() {
        axios.get('/article/' + this.$route.query.id)
          .then(res => {
            console.log(res)
            this.article = res.data.content
            this.title = res.data.title
          })
      }
    }
    ,
    created() {
      this.getData()
    },
    watch: {
      "$route": 'getData'
    }

  }
</script>
<style type="text/stylus" lang="stylus">
  pre {
    background-color: rgba(0, 0, 0, 0.03);
    font: 14px Consolas, "Liberation Mono", Menlo, Courier, monospace;
    padding: 0.5em;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
    color rgba(0, 0, 0, 0.6)
  }

  blockquote {
    padding 10px
    border-left: 6px solid #ccc;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    font-size: 16px;
    line-height: 12px;
  }

  .article a, p {
    -webkit-text-size-adjust: 100%;
    line-height: 1.5;
    color: #585858;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 16px;
    word-wrap: break-word;
    line-height: 2;
    letter-spacing: 0.2px;
  }
</style>
