<template>
    <div>
        
        <b-form-file 
        accept="image/jpeg, image/png"
        v-model="file"
        placeholder="Choose a file"
        :disabled="isLoading"
        ></b-form-file>

                                <b-form-group
                                label="Item Label:"
                                description="this does not render on the menu"
                                >
                                    <b-form-input 
                                    v-model="Label" 
                                    placeholder="Item Name"
                                    :disabled="isLoading"
                                    ></b-form-input>
                                </b-form-group>


                                <b-form-group
                                label="Item Name:"
                                >
                                    <b-form-input 
                                    v-model="Name" 
                                    placeholder="Item Name"
                                    :disabled="isLoading"
                                    ></b-form-input>
                                </b-form-group>

                                <b-form-group
                                label="Item Description:"
                                >
                                    <b-form-input 
                                    v-model="Description" 
                                    placeholder="Item Description"
                                    :disabled="isLoading"
                                    ></b-form-input>
                                </b-form-group>

                                <b-form-group
                                label="Item Price:"
                                >
                                    <b-form-input 
                                    v-model="price" 
                                    placeholder="Item Price"
                                    :disabled="isLoading"
                                    ></b-form-input>
                                </b-form-group>


                                <b-button
                                :disabled="isLoading"
                                v-on:click="onSubmit"
                                >
                                Submit

                                    <b-spinner 
                                    small 
                                    type="grow"
                                    v-if="isLoading"
                                    ></b-spinner>

                                </b-button>
                                <b-alert 
                                fade 
                                :variant="alertVariant"
                                :show="alertTime"
                                >{{ alertMessage }}</b-alert>


    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            file: null,
            Label: '',
            Name: '',
            Description: '',
            price: '',
            isLoading: false,
            alertTime: 0,
            alertVariant: null,
            alertMessage: null
        }
    },
    methods: {
        onSubmit() {
            this.isLoading = true;
            if (this.file && this.Label) {
                this.submitImage();
            } else if (!this.image && this.Label) {
                this.submitNoImage();
            } else {
                this.alert('you need to have either an image or a label to submit an item', 'warning')
                this.isLoading = false;
            }
        },
        submitImage() {
            let form = new FormData();
            form.append('Restaurant', this.$route.params.id);
            form.append('Label', this.Label);
            form.append('Name', this.Name);
            form.append('Description', this.Description);
            form.append('price', this.price);
            form.append('file', this.file)
            try {
                axios.post('/upload', form)
                .then(res => {
                    if (res.status === 200) {
                        this.alert(this.Label + 'was successfully submitted', 'success')
                        this.clearForm()
                    } else {
                        this.alert('There was a problem submitting the item', 'danger')
                        this.isLoading = false;
                    }
                });
            }
            catch(err) {
                console.log(err)
            }
        },
        submitNoImage() {
            let form = {
                Restaurant: this.$route.params.id,
                Label: this.Label,
                Name: this.Name,
                Description: this.Description,
                price: this.price
            }

            try {
                axios.post('/upload/no-image', form)
                .then(res => {
                    if (res.status === 200) {
                        this.alert(this.Label + 'was successfully submitted', 'success')
                        this.clearForm();
                    } else {
                        this.alert('There was a problem submitting the item', 'danger')
                        this.isLoading = false;
                    }
                });
            }
            catch(err) {
                console.log(err)
            }
        },
        alert(message, variant) {
            

            this.alertVariant = variant;
            this.alertMessage = message;
            this.alertTime = true;
        },
        clearForm() {
            this.file = null;
            this.Label = '';
            this.Name = '';
            this.Description = '';
            this.price = '';
            this.isLoading = false;
        }
    }
    
}
</script>

<style scoped>

</style>