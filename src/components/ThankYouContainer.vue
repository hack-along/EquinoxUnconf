<template>
  <div class="my-10">
    <h2>Thank you</h2>
    <ul class="pl-1">
      <li
        v-for="name in thankyou"
        :key="name"
      >{{name}}</li>
    </ul>
  </div>
</template>


<script>
export default {
  data() {
    return {
      thankyou: [
        "all the people",
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
ul {
  -moz-column-count: 4;
  -moz-column-gap: 20px;
  -webkit-column-count: 4;
  -webkit-column-gap: 20px;
  column-count: 4;
  column-gap: 20px;
}
</style>

