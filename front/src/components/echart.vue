<template>
  <div style="display: inline-flex">
  <div id="myChart" :style="{width: '500px', height: '500px'}"></div>
  <div id="myChart1" :style="{width: '500px', height: '500px'}"></div>
  </div>
</template>
<script>
  export default {
    name: 'hello',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
        // 绘制图表
        myChart.setOption({
          color: ['#3398DB'],
          title: {text: '当天浏览量'},
          tooltip: {},
          xAxis: {
            data: [ '代码', "相册", "美食", "旅行", "留言", "关于"]
          },
          yAxis: {},
          series: [{
            name: '浏览量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
        myChart1.setOption({
          color: ['#3398DB'],
          title: {text: '日均ip访问量'},
          tooltip: {},
          xAxis: {
            data: [ '11-23', "11-24", "11-25", "11-25", "11-27", "11-28"]
          },
          yAxis: {},
          series: [{
            name: '浏览量',
            type: 'line',
            data: [304, 220, 336, 310, 510, 620]
          }]
        });
      }
    }
  }
</script>
