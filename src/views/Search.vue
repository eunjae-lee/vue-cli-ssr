<template>
  <div id="search">
    <ul class="list">
      <li v-for="(hit, index) in hits" :key="index">
        <p class="name">{{ hit.name }}</p>
        <p class="description">{{ hit.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    hits() {
      return this.$store.state.search.result.hits || [];
    }
  },
  serverPrefetch() {
    console.log("fetching hits from server side");
    return this.search("");
  },
  mounted() {
    if (this.$store.state.search.result.hits === undefined) {
      console.log("fetching hits from client side");
      this.search("");
    }
  },
  methods: {
    search(query) {
      return this.$store.dispatch("search/search", { query });
    }
  }
};
</script>
