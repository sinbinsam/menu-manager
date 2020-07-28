<template>
    <div v-if="this.params">
        <div id = 'cardholder'>
            <div id = 'doc' v-bind:style="{ 'background-image': 'url(' + this.params.Img + ')', 'background-size': 'cover' }">
                <b-aspect :aspect="this.specialItem.Aspect">
                    <div class='bottomRight nopadding'>
                        <h1 class = 'textSizing'>{{ this.params.Name}}</h1>
                        <h2 class = 'textSizing'>{{ this.params.price }}</h2>
                        <h3 class = 'textSizing'>{{ this.params.Description }}</h3>
                    </div>
                </b-aspect>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    data() {
        return {
            params: null,
        }
    },
    props: [
        'specialItem'
    ],
    methods: {
        getParams: function() {
            axios.post('/api/special/params', {'_id': this.specialItem.Link})
                .then(res => {
                    this.params = res.data[0]
                    })
        },
        subscribe() {
            this.sockets.subscribe('action_events', (data) => {
            if (data.type == 'command' && data.target == 'special' && data.action == 'refresh') {
                this.getParams()
            }
            });

        }
    },
    watch: {
        specialItem: function() {
            this.getParams()
        }
    },
    mounted() {
        this.subscribe()
    },
    created() {
        this.getParams()
    }
}
</script>

<style scoped>
#cardholder {
    width: 100%;
}

#doc {
    background-size: cover;
    position: relative;
}

.bottomRight {
  position: absolute;
  bottom: 5%;
  left: 10%;
  color: white;
  margin: 0;
  background: rgba(0, 0, 0, 0.651);
}

.textSizing {
    font-size: 3vw;
    margin-bottom: 2px;
}


</style>