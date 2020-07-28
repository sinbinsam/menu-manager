<template>
    <div>
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-1"
          label="New database item:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="itemForm.Name"
            required
            placeholder="Item Name"
          ></b-form-input>

          <b-form-input
            id="input-2"
            v-model="itemForm.price"
            required
            placeholder="Item Price"
          ></b-form-input>

          <b-form-input
            id="input-2"
            v-model="itemForm.Restaurant"
            required
            placeholder="Item Restaurant"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
        itemForm: {
          Restaurant: null,
          Name: null,
          price: null
        }
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      this.postData(this.itemForm)
    },
    postData(obj) {
      axios.post(process.env.baseUrl + '/api/newitem', obj)
      .then(res => {

      })
    }
  }
}
</script>

<style scoped>

</style>