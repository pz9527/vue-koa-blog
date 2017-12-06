<template>
  <div>
    <h2 style="text-align: center">{{title}}</h2>
    <span class="article" v-html="article"></span>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data(){
      return{
        title:'',
        article:'<h1>22</h1>',
      }
    },
    methods:{
      getData() {
        axios.get('/article/' + this.$route.query.id)
          .then(res => {
            console.log(res)
            this.article = res.data.content
            this.title=res.data.title
          })
      }
    }
    ,
    created(){
      this.getData()
    },
    watch:{
      "$route":'getData'
    }

  }
</script>
<style>
  pre{
    background-color: rgba(0,0,0,0.03);
    font:14px/25px 'Comic Sans MS','courier new';
    margin:5px;
    border-radius: 5px;
  }
  blockquote {
    border-left: 6px solid #ccc;
    margin: 1em 5px;
    padding: 0.5em 10px;
    quotes: "\201C""\201D""\2018""\2019";
  }
  article{
    font-family:"	SimSun";
  }
</style>
