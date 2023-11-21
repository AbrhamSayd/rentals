<template>
  <Card>
    <template #title> Añadir propiedad</template>
    <template #content>
      <div class="formgrid grid">
        <div class="field col md-4">
          <span class="p-float-label">
            <InputText v-model="property.name" id="name" />
            <label for="name">Nombre de la propiedad</label>
          </span>
        </div>

      </div>

    </template>
    <template #footer>
      <div class="flex justify-end">
        <Button icon="pi pi-check" label="Save" />
        <Button icon="pi pi-times" label="Cancel" severity="secondary" style="margin-left: 0.5em" />
      </div>
    </template>
  </Card>
  <!-- <div class="card">
    <div class="formgrid grid">
      <div class="field col md-4">
        <span class="p-float-label">
          <label for="name">Name</label>
          <InputText v-model="property.name" id="name" />
        </span>
      </div>
      <div class="field col md-4">
        <label for="address">Address</label>
        <InputText v-model="property.address" id="address" />
      </div>
      <div class="field col md-4">
        <label for="type">Type</label>
        <InputText v-model="property.type" id="type" />
      </div>
    </div>

    <div v-for="(rent, index) in property.rents" :key="index" class="formgrid grid">
      <div class="field col-12 md-6">
        <label :for="'rentType' + index">Type</label>
        <InputText v-model="rent.type" :id="'rentType' + index" />
      </div>
      <div class="field col-12 md-6">
        <label :for="'rentAmount' + index">Amount</label>
        <InputNumber v-model="rent.amount" :id="'rentAmount' + index" />
      </div>
    </div>

    <div class="mt-2">
      <Button type="button" label="Submit" @click="submitForm" />
    </div>

  </div> -->
</template>

<script>

export default {

  data() {
    return {
      property: {
        name: '',
        address: '',
        type: '',
        rents: [{ type: '', amount: 0 }],
      },
    };
  },
  methods: {
    submitForm() {
      // Handle form submission logic here
      console.log('Form submitted:', this.property);
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
