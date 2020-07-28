<template>
    <div>
        <ul class="nav flex-column">
            <p class = 'index-header'>Restaurants</p>
            <div 
            v-bind:key="restaurant.id" v-for="restaurant in restaurants"
            >
                <li class="nav-item">
                    <nuxt-link 
                    class = 'linker active' 
                    :to="{ path: '/restaurant/' + restaurant.link, params: {yes: restaurant.link} }"
                    >{{ restaurant.restaurant }}</nuxt-link>
                </li>
            </div>
        </ul>
    </div>
    
</template>

<script>
export default {
    props: [
        "restaurants",
    ]
}
</script>

<style scoped>
.linker {
    display: block;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-top: 2px;
    text-align: center;
}

a {
    color:rgb(241, 241, 241);
    background-color: #676767;
    text-decoration: unset;
}

.index-header {
    display: block;
    margin: 0px;
    text-align: center;
    font-size: 1.7rem;
    font-weight: bold;
    color:rgb(29, 29, 29);
    background-color:rgb(241, 241, 241);
}

</style>