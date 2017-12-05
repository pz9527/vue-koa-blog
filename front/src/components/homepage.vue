<template>
<table>
  <thead v-for="(value, key) in tabledata">
    <th>{{key}}</th>
  </thead>
  <tr v-for="(item,key) in tabledata">
    <td>{{item.time}}</td>
    <td>{{item.id}}</td>
    <td>{{item.content}}</td>
  </tr>
  <tr>
    <td>
      <div v-for="(value, key) in  tabledata">
        {{ key }}: {{ value }}
      </div>
    </td>
  </tr>
</table>

</template>
<script>
  export default {
    data(){
      return{
        tabledata:[
          {time:2000,id:1,content:'内容1'},
          {time:2002,id:2,content:'内容2'},
          ]
      }
    }
  }
</script>
