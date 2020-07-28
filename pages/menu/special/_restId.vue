<template>
    <div>
        <component 
        v-if="this.specialItems"
        v-bind:specialItems='specialItems'
        :is="comp"></component>
    </div>
</template>

<script>
import axios from 'axios'


export default {
    data() {
        return {
            restaurantId: '',
            specialItems: null
        }
    },
    layout: 'noSideBar',
    methods: {
    subscribe() {
      this.sockets.subscribe('action_events', (data) => {
      if (data.type == 'command' && data.target == 'special' && data.action == 'refresh') {
          console.log('yes')
          this.populateMenuItems()
      }
      });

    },
    populateMenuItems() {
      axios.get(process.env.baseUrl + '/api/special/conf/' + this.restaurantId)
        .then(res => this.specialItems = res.data)
    },
    },
    mounted() {
        this.subscribe()
    },
    created() {
        this.restaurantId = this.$route.params.restId
        this.populateMenuItems()
    },
computed: {
  comp () {
      return () => import(`@/components/specials/${this.restaurantId}.vue`)
  }
}
}
</script>

<style scoped>

</style>