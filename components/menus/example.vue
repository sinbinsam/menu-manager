<template>
    <div>
    <b-card>
      <b-aspect :aspect="aspect">
        <b-row>
            <b-col>
                <div class = 'text-center item'>
                    <p id = '' class = 'itemName'>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].Name }}</p>
                    <p id = '' class = 'itemPrice'>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].price }}</p>
                </div>
                <div class = 'text-center item'>
                    <p id = '' class = 'itemName'>{{ menuItems[this.id('5ea45715b6f90d3334ddf320')].Name }}</p>
                    <p id = '' class = 'itemPrice'>{{ menuItems[this.id('5ea45715b6f90d3334ddf320')].price }}</p>
                </div>
                <div class = 'text-center item'>
                    <p id = '' class = 'itemName'>{{ menuItems[this.id('5ea46d0fb6f90d3334ddf322')].Name }}</p>
                    <p id = '' class = 'itemPrice'>{{ menuItems[this.id('5ea46d0fb6f90d3334ddf322')].price }}</p>
                </div>
                <div class = 'text-center item'>
                    <p id = '' class = 'itemName'>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].Name }}</p>
                    <p id = '' class = 'itemPrice'>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].Name }}</p>
                </div>
                <div class = 'text-center item'>
                    <p id = '' class = 'itemName'>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].Name }}</p>
                    <p id = '' class = 'itemPrice'>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].Name }}</p>
                </div>
                <div class = 'text-center item'>
                    <p id = '' class = 'itemName'>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].Name }}</p>
                    <p id = '' class = 'itemPrice'>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].Name }}</p>
                </div>
            </b-col>
            <b-col>
                <div class = 'text-center item'>
                    <p id = '' class = 'itemName'>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].Name }}</p>
                    <p id = '' class = 'itemPrice'>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].Name }}</p>
                </div>
                <div class = 'text-center item'>
                    <p id = '' class = 'itemName'>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].Name }}</p>
                    <p id = '' class = 'itemPrice'>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].Name }}</p>
                </div>
                <div class = 'text-center item'>
                    <p id = '' class = 'itemName'>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].Name }}</p>
                    <p id = '' class = 'itemPrice'>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].Name }}</p>
                </div>
                <div class = 'text-center item'>
                    <p id = '' class = 'itemName'>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].Name }}</p>
                    <p id = '' class = 'itemPrice'>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].Name }}</p>
                </div>
                <div class = 'text-center item'>
                    <p id = '' class = 'itemName'>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].Name }}</p>
                    <p id = '' class = 'itemPrice'>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].Name }}</p>
                </div>
                <div class = 'text-center item'>
                    <p id = '' class = 'itemName'>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].Name }}</p>
                    <p id = '' class = 'itemPrice'>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].Name }}</p>
                </div>
            </b-col>
        </b-row>



      </b-aspect>
    </b-card>

        <p>{{ menuItems[this.id('5ea456f8b6f90d3334ddf31f')].Name }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            aspect: '9:16'
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
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@1,700&display=swap');
p {
    margin: 0px;
    font-size: 30px;
}

.card-body {
    padding: 0px;
}

.itemName {
    font-family: 'Kanit', sans-serif;
}

.itemPrice {
    font-family: 'Noto Sans', sans-serif;
}

.item {
    padding-top: 30px;
}
</style>