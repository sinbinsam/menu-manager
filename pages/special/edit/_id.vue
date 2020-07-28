<template>
    <div 
    v-if="this.allSpecials"
    class = 'cont'
    >


                        <nuxt-link 
                        class = 'linker active card'
                        target="_blank"
                        :to="{ path: '/menu/special/' + this.restaurantId }"
                        >
                            <b-card
                                id = 'card'
                                class = 'card'
                                overlay
                                img-src="/digitalmenus.jpg"
                                img-alt="Card Image"
                                text-variant="white"
                                title="Specials"
                                sub-title="Click here to view the specials menu"
                            >
                            </b-card>
                        </nuxt-link>

                        <nuxt-link 
                        class = 'linker active card'
                        target=""
                        :to="{ path: '/special/new/' + this.restaurantId }"
                        >
                            <b-card
                                id = 'card'
                                class = 'card'
                                overlay
                                img-src="/digitalmenus.jpg"
                                img-alt="Card Image"
                                text-variant="white"
                                title="New Item"
                                sub-title="Click here to add new special item"
                            >
                            </b-card>
                        </nuxt-link>



        <div 
        v-for="specialCard in specialCards" 
        v-bind:key="specialCard._id" 
        >
            <specialCard 
            v-bind:specialCard="specialCard"
            v-bind:allSpecials="allSpecials"
            />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import specialCard from '@/components/specials/specialCardEdit.vue'

export default {
    data() {
        return {
            restaurantId: this.$route.params.id,
            allSpecials: null,
            specialCards: []
        }
    },
    methods: {
        getSpecials() {
            axios.get(process.env.baseUrl + '/api/special/conf/' + this.restaurantId)
            .then(res => this.specialCards = res.data)
            .catch(err => console.log(err));
        },
        getAllItems() {
            axios.get(process.env.baseUrl + '/api/special/params')
            .then(res => this.allSpecials = res.data)
            .catch(err => console.log('WTF' + err));
        },
    },
    components: {
        specialCard
    },
    created() {
        this.getSpecials();
        this.getAllItems();
    }
}
</script>

<style scoped>
.card-title {
    background: rgba(0, 0, 0, 0.815);
}

.card-subtitle {
    color:rgb(221, 0, 0);
    background:rgba(255, 255, 255, 0.815);
}

.cont {
    padding-left: 3rem;
    padding-right: 3rem;
}

.card {
    width: 20rem;
}
</style>