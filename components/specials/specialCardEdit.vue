<template>
    <div>
        

        <b-card>
            <!--<specialMenuCard 
            v-bind:specialItem='this.specialCard'
            id = 'smallSpecial'/>-->
            <b-card-text>
                <h3
                class = 'topLine'
                >{{ specialCard.Name }}</h3>
                    <b-button 
                    id = 'changeItem'
                    v-b-modal="this.specialCard._id" 
                    class = 'topLine'
                    >Change Item</b-button>


                    <div class = 'paramsHolder' v-if="this.params && this.allSpecials">




                        <b-img id = 'previewPic' thumbnail fluid :src="this.params.Img"></b-img>
                            <b-form 
                            :id="this.params._id" 
                            @submit="updateItem"
                            class = 'form'
                            >

                            <div class = 'formLeft'>
                                <b-form-group
                                label="Item Label:"
                                description="this does not render on the menu"
                                id = 'label'
                                >
                                    <b-form-input v-model="params.Label" placeholder="Item Label"></b-form-input>
                                </b-form-group>


                                <b-form-group
                                label="Item Name:"
                                >
                                    <b-form-input v-model="params.Name" placeholder="Item Name"></b-form-input>
                                </b-form-group>


                            </div>
                            <div class = 'formRight'>


                                <b-form-group
                                label="Item Description:"
                                id = 'description'
                                >
                                    <b-form-input v-model="params.Description" placeholder="Item Description"></b-form-input>
                                </b-form-group>

                                <b-form-group
                                label="Item Price:"
                                >
                                    <b-form-input v-model="params.price" placeholder="Item Price"></b-form-input>
                                </b-form-group>

                            </div>
                                
                            </b-form>

                    <div class = 'buttonGroup'>
                        <b-button 
                        variant="success"
                        v-on:click="updateItem"
                        :disabled="saveDisabled"
                        >Save Item</b-button>

                        <b-button 
                        variant="info"
                        v-on:click="sendToBoard"
                        >Send to Board</b-button>
                    </div>
                    
                    </div>
            </b-card-text>
        </b-card>

  <b-modal 
  scrollable
  :id="this.specialCard._id" 
  title="Select Item" 
  size="xl"
  ref="modal"
  >





      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>






            <b-table 
            hover 
            :items="allSpecials" 
            :fields="fields"
            selectable
            :filter="filter"
            @row-selected="onRowSelected"
            >
            <template v-slot:cell(Img)="data">
                <b-img id = 'previewPic' thumbnail fluid :src="data.item.Img"></b-img>
            </template>            
            
            </b-table>


      
  </b-modal>



    </div>
</template>

<script> //SPECIAL CARD FOR EDITING PAGE
import axios from 'axios';

export default {
    data() {
        return {
            params: null,
            saveDisabled: false,
            filter: null,
            fields: [
                {
                    key: 'Label',
                    sortable: true
                },
                {
                    key: 'Img',
                    sortable: false,
                    label: 'Background'
                },
                {
                    key: 'price',
                    sortable: true,
                    label: 'Price'
                }
            ]
        }
    },
    methods: {
        getParams() {
            let index = this.allSpecials.findIndex(item => item._id == this.specialCard.Link)
            this.params = this.allSpecials[index]
        },
        isCurrent() {
            if (this.params._id === this.specialCard.Link) {
                return true;
            } else {
                return false;
            }
        },
        updateItem() {


            axios.post(process.env.baseUrl + '/api/special/params/update', {
                'obj': this.params,
                'current': this.isCurrent()
            })
        },
        onRowSelected(items) { //select item to edit
            this.params = items[0];
            this.specialCard.Link = this.params._id;
            this.$refs['modal'].hide();
        },
        sendToBoard() {
            if (confirm('are you sure you want to send this to the board?')) {
                axios.post(process.env.baseUrl + '/api/changeSpecialItem', {
                    idBoard: this.specialCard._id,
                    idItem: this.params._id
                })
                .catch( err => {
                    //catch error
                });
            }
        }
    },

    created() {
        this.getParams()
    },
    props: [
        "specialCard",
        "allSpecials"
    ]
}
</script>

<style scoped>
#smallSpecial {
    width: 10%;
}

#previewPic {
    width: 10rem;
    display: inline-block;
}

.form {
    display: inline-block;
}

.topLine {
    display: inline-block;
}

img {
    vertical-align: top;
}

#changeItem {
    margin-left: 4rem;
}

.formLeft {
    display: inline-block;
}

.formRight {
    display: inline-block;
    vertical-align: top;
}

#label {
    margin-bottom: 0px;
}

#description {
    margin-bottom: 23px;
}

.buttonGroup {
    display: inline;
}
</style>