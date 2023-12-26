<template>
  <div>
    <navbar/>
      <router-view>
      </router-view>
    <footer_page/>
  </div>
</template>
<script setup>
import navbar from "./components/navbar-footer/navbar.vue"
import footer_page from "./components/navbar-footer/footer.vue"
</script>
<style>
.router-link-active{
  border-bottom: 1px solid rgb(0, 0, 0);
  padding-bottom: 5px;
}

</style>