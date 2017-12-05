<template>
  <div class="root" @contextmenu.prevent="rightShow">
    <v-header></v-header>
    <router-view></router-view>
  </div>
</template>
<style lang="stylus" type="text/stylus">
* {
  padding: 0;
  margin: 0;
}



.v1 {
  background-color: #F4F4F4;
  padding-top: 8px;
  position: relative;
}

.title {
  font-family: 'PingFang SC';
  font-size: larger;
  color: rgba(0, 0, 0, 0.55);
}

.line {
  position: relative;
  border-height: 1px;
  background-color: #E6EBF5;
  margin-top: 10px;
  margin-bottom: 5px;
}

.v1-tag {
  display: inline-flex;
}

.v1-reply {
  font-size: smaller;
}

.card_title {
  margin-top: -9px;
}
</style>
<script>
import header from "./header.vue";

export default {
  methods: {
    rightShow() {
      this.$message("nihao");
    }
  },
  components: {
    "v-header": header
  }
};
</script>
