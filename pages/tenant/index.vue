<template>
  <div class="card">
    <DataTable :loading="loading" :value="tenants" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Inquilinos</span>
          <Button type="button" label="Añadir" icon="pi pi-plus" :loading="loading" @click="load" />
        </div>
      </template>

      <Column field="first_name" header="Nombre"></Column>
      <Column field="last_name" header="Apellido"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
      <Column :exportable="false" style="min-width:8rem">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="onEdit(slotProps.data, 'edit')" />
          <Button icon="pi pi-trash" outlined rounded severity="danger" @click="onEdit(slotProps.data, 'delete')" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script >
export default {
  data() {
    return {
      tenants: null,
      layout: 'grid'
    }
  },
  mounted() {
    this.getProperties();
  },
  methods: {
    onEdit(data, method) {
      this.$router.push(`/tenant/${data._id}-${method}`)
    },
    getDetails(id) {
      this.$router.push(`/property/${id}-view`)
    },
    async getProperties() {
      const { data, pending, error, refresh } = await useFetch(`http://localhost:3000/tenant/0/10`,)
      this.tenants = data
      refresh()
    },
  }
}
</script>
