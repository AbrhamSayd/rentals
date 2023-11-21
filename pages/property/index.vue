<template>
  <ConfirmDialog group="templating">
    <template #message="slotProps">
      <div class="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
        <i :class="slotProps.message.icon" class="text-6xl text-primary-500"></i>
        <p>{{ slotProps.message.message }}</p>
      </div>
    </template>
  </ConfirmDialog>
  <div class="card">
    <DataView :value="properties" :layout="layout">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Propiedades</span>
          <Button type="button" label="Añadir" icon="pi pi-plus" :loading="loading" @click="openPopUp()" />
        </div>
      </template>
      <template #grid="slotProps">
        <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
          <div class="p-4 border-1 surface-border surface-card border-round">
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
              <div class="flex align-items-center gap-2">
                <i class="pi pi-tag"></i>
                <span class="font-semibold">{{ slotProps.data.address }}</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center gap-3 py-5" @click="getDetails(slotProps.data._id)">
              <img class="w-9 shadow-2 border-round img-fluid"
                :src="`https://imgs.search.brave.com/3R45V6f780pmSVQjuk5TlZ0HJZ28jN5djdODe1IQGhs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTc4/MTU1MzA4L3Bob3Rv/L2hvdXNlLWZvci1y/ZW50LmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1FNl9pR2V2/cXNiOFlZckJuWXQt/VUZidmpUQV9BWWRY/UXhtOFppdk5Pbkd3/PQ`"
                :alt="slotProps.data.name" />
              <div class="text-2xl font-bold">{{ slotProps.data.name }}
              </div>
              <span class="font-semibold">{{ slotProps.data.type }}</span>
            </div>
            <div class="flex align-items-center justify-content-between">
              <span class="text-2xl font-semibold">Editar</span>
              <Button icon="pi pi-pencil" rounded @click="editRent(slotProps.data)"></Button>
            </div>
            <div class="flex align-items-center justify-content-between">
              <span class="text-xl font-medium">Eliminar</span>
              <Button icon="pi pi-trash" severity="danger" rounded @click="showTemplate(slotProps.data._id)"></Button>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
  <Dialog v-model:visible="visible" modal header="Añadir propiedad" :style="{ width: '50rem' }"
    @update:visible="clearForm" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div class="flex flex-column gap-2">
      <label for="name">Nombre de la propiedad</label>
      <InputText id="name" v-model="property.name" />
    </div>
    <div class="flex flex-column gap-2">
      <label for="address">Dirección</label>
      <InputText id="address" v-model="property.address" />
    </div>
    <div class="flex flex-column gap-2">
      <label for="type">Caracteristicas</label>
      <Textarea id="type" v-model="property.type" />
    </div>
    <Divider type="solid" />
    <template v-for="(rent, index) in property.rents.slice(0)">
      <div class="flex flex-column gap-2">
        <label :for="'type-' + index">Nombre del plan</label>
        <InputText :id="'type-' + index" v-model="rent.type" aria-describedby="rent-help" />
        <small id="rent-help" class="p-d-block">El nombre del plan debe ser único, Eg. Mensual, Semanal, Etc..</small>
      </div>
      <div class="flex flex-column gap-2">
        <label :for="'amount-' + index">Renta</label>
        <InputNumber :id="'amount-' + index" v-model="rent.amount" mode="currency" currency="MXN" locale="es-MX" />
      </div>
      <Divider />
    </template>
    <Divider />
    <div class="flex flex-column gap-2">
      <label for="type">Agregar más rentas</label>
      <Button icon="pi pi-plus" label="Agregar renta" @click="addRent()" />
    </div>
    <template #footer>
      <div v-if="action == 'add'">
        <div class="flex justify-content-center flex-wrap">
          <Button type="submit" icon="pi pi-check" label="Guardar" @click.prevent="onSave($event)" />
          <Button icon="pi pi-times" label="Cancelar" severity="secondary" style="margin-left: 0.5em"
            @click="visible = false" />
        </div>
      </div>
      <div v-if="action == 'mod'">
        <div class="flex justify-content-center flex-wrap">
          <Button type="submit" icon="pi pi-check" label="Guardar" @click.prevent="onEdit()" />
          <Button icon="pi pi-times" label="Cancelar" severity="secondary" style="margin-left: 0.5em"
            @click="visible = false" />
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script >


export default {
  data() {
    return {
      property: {
        _id: '',
        name: '',
        address: '',
        type: '',
        rents: [],
      },
      properties: null,
      layout: 'grid',
      id: null,
      visible: false,
      action: 'add'
    }
  },
  mounted() {
    this.getProperties().then((data) => {
      data.refresh()
      this.properties = data.data
    });
  },
  methods: {
    getDetails(id) {
      this.$router.push(`/property/${id}`)
    },
    async getProperties() {
      const { data, pending, error, refresh } = await useFetch(`http://localhost:3000/property/0/10`,)
      return { data, pending, error, refresh }
    },
    async deleteProperty() {
      const { data, pending, error, refresh } = await useFetch(`http://localhost:3000/property/${this.id}`, {
        method: 'DELETE'
      })
      this.properties.splice(this.properties.findIndex((property) => property._id === this.id), 1)
    },
    showTemplate(idParam) {
      this.id = idParam
      this.$confirm.require({
        group: 'templating',
        header: 'Confirmación',
        message: '¿Está seguro que desea eliminar esta propiedad?',
        icon: 'pi pi-exclamation-circle',
        acceptIcon: 'pi pi-check',
        rejectIcon: 'pi pi-times',
        rejectClass: 'p-button-sm',
        acceptClass: 'p-button-outlined p-button-sm',
        accept: () => {
          this.deleteProperty()
        },
        reject: () => {
          this.$toast.add({
            severity: 'info',
            summary: 'Cancelado',
            detail: 'La propiedad no ha sido eliminada',
            life: 3000
          });
        }
      });
    },
    openPopUp() {
      this.visible = true

    },
    editRent(property) {
      this.action = 'mod'
      this.visible = true
      this.property = property
    },
    addRent() {
      this.property.rents.push({ type: '', amount: 0 });
    },
    clearForm() {
      this.property = {
        name: '',
        address: '',
        type: '',
        rents: [{ type: '', amount: 0 }],
      };
      this.visible = false;
    },
    async onSave() {
      console.log('save button clicked')
      const { data, pending, error, refresh } = await useFetch(`http://localhost:3000/property`, {
        method: 'POST',
        body: JSON.stringify(this.property),
        onResponse: (response) => {
          console.log(response)
          this.properties.push(response)
        }
      })
      this.clearForm()


    },
    async onEdit() {
      console.log('edit button clicked')
      const { data, pending, error, refresh } = await useFetch(`http://localhost:3000/property/${this.property._id}`, {
        method: 'PATCH',
        body: JSON.stringify(this.property),
        onResponse: (response) => {
          console.log(response)
          this.properties.push(response)
        }
      })
      this.clearForm()
    }
  }
}
</script>
