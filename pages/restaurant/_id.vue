<template>
    <div>
        <b-container fluid>
        <h2>{{ this.restaurantId }}</h2>

            <b-row>
                <b-col>
                    <div>
                        <nuxt-link 
                        class = 'linker active'
                        target="_blank"
                        :to="{ path: '/menu/main/' + this.restaurantId }"
                        >
                            <b-card
                                id = 'card'
                                overlay
                                img-src="/digitalmenus.jpg"
                                img-alt="Card Image"
                                text-variant="white"
                                title="Menu"
                                sub-title="Click here to view the menu"
                            >
                            </b-card>
                        </nuxt-link>
                    </div>
                </b-col>
                <b-col>
                    <div>
                        <nuxt-link 
                        class = 'linker active'
                        :to="{ path: '/special/edit/' + this.restaurantId }"
                        >
                            <b-card
                                id = 'card'
                                overlay
                                img-src="/fancy.png"
                                img-alt="Card Image"
                                text-variant="white"
                                title="Specials"
                                sub-title="Click here to edit the specials"
                            >
                            </b-card>
                        </nuxt-link>
                    </div>
                </b-col>
            </b-row>





        <b-table 
        striped 
        hover 
        :items="menuItems" 
        :fields="fields"
        >
        
    <template v-slot:cell(actions)="row">
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          Edit
        </b-button>
    </template>
        
        </b-table>

                <b-modal 
                :id="infoModal.id" 
                :title="infoModal.title" 
                :ok-title="'Save'"
                :ok-variant="'success'"
                @ok="changeMenuItem"
                :busy="this.busy"
                >

    <b-form-group
      id="fieldset-1"
      description="Edit the name"
      label="Name"
      label-for="input-1"
    >
        <b-form-input 
        id="input-1" 
        trim 
        v-model="infoModal.Name" 
        ></b-form-input>
    </b-form-group>

    <b-form-group
      id="fieldset-1"
      description="Edit the price"
      label="Price"
      label-for="input-2"
    >
    <b-form-input 
    id="input-2" 
    trim 
    v-model="infoModal.price" 
    ></b-form-input>
    </b-form-group>


    



                </b-modal>

        </b-container>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: [
        "id"
    ],
    data() {
        return {
            restaurantId: this.$route.params.id,
            Name: '',
            price: '',
            menuItems: [],
            fields: [
                {
                    key: 'Name',
                    label: 'Menu Item',
                    sortable: true
                },
                {
                    key: 'price',
                    label: 'Price',
                    sortable: true
                },
                {
                    key: 'actions',
                    label: 'Actions'
                }
            ],
            infoModal: {
                id: 'info-modal',
                title: '',
                content: ''
            },
            busy: false
        }
    },
  methods: {
    populateMenuItems() {
      axios.get(process.env.baseUrl + '/api/menu/' + this.restaurantId)
        .then(res => this.menuItems = res.data)
        .catch(err => console.log(err))
    },
    info (item, index, button) {
        this.infoModal.title = 'Menu item ID: ' + item['_id']

            this.infoModal._id = item['_id']
            this.infoModal.Name = item['Name']
            this.infoModal.price = item['price']

        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal._id = ''
        this.infoModal.Name = ''
        this.infoModal.price = ''
        this.busy = false
    },
    changeMenuItem(bvModalEvt) {
        this.busy = true;
        bvModalEvt.preventDefault()
        this.changeItemRequest((bool, obj) => {
            bool ? this.closeModal(obj) : this.errorModal()
        });
        

    },
    closeModal(obj) {
        let index = this.menuItems.findIndex(menuItem => menuItem._id == obj._id)
        this.menuItems[index].price = obj.price
        this.menuItems[index].Name = obj.Name
        this.$bvModal.hide('info-modal')
        this.resetInfoModal()
    },
    errorModal() {
        this.busy = false;
    },
    changeItemRequest(callback) {
        let obj = {
            _id: this.infoModal._id,
            Name: this.infoModal.Name,
            price: this.infoModal.price
        }
        axios.post(process.env.baseUrl + '/api/changeMenuItem', obj)
        .then(res => {
            if (res.status == 200) {
                callback(true, obj);
            } else {
                callback(false, obj);
            }
        })
        .catch(err => {
            console.log(err);
            callback(false);
        });
    }
  },
  computed: {
      state() {
          return ''
      },
  },
  created() {
      this.restaurantId = this.$route.params.id;
      this.populateMenuItems();
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
</style>