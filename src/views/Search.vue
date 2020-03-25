<template>
  <div id="search">
    <child1 name="Eunjae" :age="10" />
    <child2 :city="city" />
    <ul class="list">
      <li v-for="(hit, index) in hits" :key="index">
        <p class="name">{{ hit.name }}</p>
        <p class="description">{{ hit.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Child1 from "../components/Child1.vue";
import Child2 from "../components/Child2.vue";

export default {
  name: "Search",
  components: {
    Child1,
    Child2
  },
  data() {
    return {
      city: "Paris"
    };
  },
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
