<template>
    <div>
        <p>{{ menuItems[this.id('5e8515040f757510546da8bc')].Name }}</p>
        <p>{{ menuItems[this.id('5e8515040f757510546da8bc')].price }}</p>

    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: [
        'menuItems'
    ],
    methods: {
        id: function(id) {
            let index = this.menuItems.findIndex(item => item._id == id)
            console.log(this.menuItems[index])
            return index
            
        }

    },
    created() {

        
    },
}
</script>

<style scoped>

</style>