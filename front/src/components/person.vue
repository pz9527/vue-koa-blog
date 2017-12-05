<template>
<div>
<span>文章编辑</span>
  <el-table
    :data="allArticles"
    >
    <el-table-column
      prop="created_at"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="user.name"
      label="姓名"
      width="100">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="500">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="delClick(scope.$index,scope.row.id)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small" @click='edit(scope.row.id)'>编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="initData.countArticle">
    </el-pagination>
  </div>
</template>

<script>
import {mapState}from 'vuex'
export default {
  created(){
    
  },
  methods: {
    delClick(index,id) {
      console.log(index)
      console.log(id)
      this.$store.dispatch('delArticle',{index,id});
    },
    edit(id){
      this.$store.commit('ARTICLE_MODIFY',id)
      this.$router.push({path:'/home/edit'})
    },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  },
computed:{
  ...mapState({
        allArticles: state => state.article.articleList,
        initData: state => state.article.initData,
        limit: state => state.article.limit,
        currentPage: state => state.article.currentPage
  })
},
  data() {
    return {
       currentPage4: 4,
       tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
    };
  }
};
</script>