<template>
  <div>
    <p>Child 1</p>
    <child11 />
    <child12 />
  </div>
</template>

<script>
import Child11 from "./Child11.vue";
import Child12 from "./Child12.vue";

export default {
  components: { Child11, Child12 }
};
</script>

<style></style>
