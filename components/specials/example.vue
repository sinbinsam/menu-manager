<template>
    <div>
        <b-aspect :aspect="'9:16'">
            <b-row v-if="this.specialItems">
                <b-col>
                    <specialMenuCard 
                    v-bind:specialItem='this.specialItems[0]'
                    /> 
                    <specialMenuCard 
                    v-bind:specialItem='this.specialItems[1]'
                    />
                </b-col>
                <b-col>
                    <specialMenuCard 
                    v-bind:specialItem='this.specialItems[2]'
                    /> 
                    <specialMenuCard 
                    v-bind:specialItem='this.specialItems[3]'
                    />
                </b-col>
            </b-row>
        </b-aspect>
    </div>
</template>

<script>
import axios from 'axios'
import specialMenuCard from '@/components/specials/specialMenuCard.vue'

export default {
    data() {
        return {
            restaurantId: null,
        }
    },
    methods: {
        populateSpecialItems: function() {
            axios.get(process.env.baseUrl + '/api/special/conf/' + this.restaurantId)
                .then(res => this.specialItems = res.data)
        },
        id: function(id) {
            let index = this.specialItems.findIndex(item => item._id == id)
            console.log(this.specialItems[index])
            return index
        }
    },
    props: [
        'specialItems'
    ],
    created() {
        this.restaurantId = this.$route.params.restId
        //this.populateSpecialItems()
    },
    components: {
        specialMenuCard
    }
}
</script>

<style scoped>
.row {
    margin-right: 0px;
    margin-left: 0px;
}

.col {
    padding: 0px;
}
</style>