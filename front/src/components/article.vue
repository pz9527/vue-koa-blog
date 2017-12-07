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
    padding: 0.5em;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
  }
  blockquote {
    padding: 0.2em;
    border-left: 6px solid #ccc;
    font-size: small;
  }
  a,p{
    font-family:"	SimSun";
    font-size: small;
  }
</style>
