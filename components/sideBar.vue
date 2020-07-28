<template>
    <div>
    <b-sidebar 
    no-header 
    :no-close-on-route-change="true" 
    visible
    id="sidebar-variant" 
    title="Sidebar" 
    bg-variant="dark" 
    text-variant="light" 
    shadow
    >
        <div class="px-3 py-2">
          <nuxt-link 
          class = 'linker active header' 
          :to="{ path: '/' }"
          >Control Panel</nuxt-link>
        </div>
    <restaurantLinks 
    v-bind:restaurants="restaurants"
    />
    </b-sidebar>


    </div>
</template>

<script>
import axios from 'axios'
import restaurantLinks from '../components/restaurantLinks.vue'

export default {
  data() {
    return {
      restaurants: []
    }
  },
  methods: {
    populateRestuarants() {
      axios.get(process.env.baseUrl + '/api/restaurants')
        .then(res => this.restaurants = res.data)
    }
  },
  components: {
    restaurantLinks
  },
  created() {
    this.populateRestuarants()
  }
}

</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a {
  color: #545454;
  background-color: #e6e6e6;
}

.nav-link {
  padding: 0.5rem 1rem;
}

#mainView {
  margin-left: 320px;
}

.smaller {
  width: 20rem;
}

.bigger {
  width: 50rem;
}

.header {
  color: white;
  background-color: transparent;
  font-size: 2rem;
  text-decoration: unset;
}
</style>