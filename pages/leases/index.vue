<template>
  <div class="card">
    <DataView :value="leases" layout="grid">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Contratos</span>
          <Button type="button" label="Añadir" icon="pi pi-plus" :loading="loading" @click="openPopUp()" />
        </div>
      </template>
      <template #grid="slotProps">
        <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
          <div class="p-4 border-1 surface-border surface-card border-round">
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
              <div class="flex align-items-center gap-2">
                <i class="pi pi-tag"></i>
                <span class="font-semibold">{{ slotProps.data.tenant.first_name }} {{ slotProps.data.tenant.last_name
                }}</span>
              </div>
            </div>
            <div class="flex flex-column align-items-left gap-1 py-3">
              <div><strong>Fecha Inicio:</strong> {{ format_date(slotProps.data.lease_start_date) }}</div>
              <div><strong>Fecha Fin:</strong> {{ format_date(slotProps.data.lease_end_date) }}</div>
              <div><strong>Terminos:</strong> {{ slotProps.data.lease_terms }}</div>
              <div><strong>Deposito de Seguridad:</strong> {{ slotProps.data.security_deposit }}</div>
              <div><strong>Estatus:</strong> {{ slotProps.data.status }}</div>
            </div>
            <div class="flex align-items-center justify-content-between">
              <span class="text-2xl font-semibold">Editar</span>
              <Button icon="pi pi-pencil" rounded></Button>
            </div>
            <div class="flex align-items-center justify-content-between">
              <span class="text-xl font-medium">Eliminar</span>
              <Button icon="pi pi-trash" severity="danger" rounded></Button>
            </div>
          </div>
        </div>
      </template>

      <template #list="slotProps">

        <div class="grid grid-nogutter">
          <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
            <div
              class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
              <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                <div class="text-2xl font-bold text-900">{{ slotProps.data.property }}</div>
                <div class="flex align-items-center gap-3">
                  <ul>

                  </ul>
                  <strong>Fehca Inicio:</strong> {{ format_date(slotProps.data.lease_start_date) }}
                  <strong>Fecha Fin:</strong> {{ format_date(slotProps.data.lease_end_date) }}
                  <strong>Terminos:</strong> {{ slotProps.data.lease_terms }}
                  <strong>Deposito de Seguridad:</strong> {{ slotProps.data.security_deposit }}
                  <strong>Estatus:</strong> {{ slotProps.data.status }}
                </div>

              </div>
            </div>
          </div>
        </div>

      </template>
    </DataView>
    <Dialog v-model:visible="visible" modal header="Añadir contrato" :style="{ width: '50rem' }"
      @update:visible="clearForm" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <div class="flex flex-column gap-2 py-2">
        <label for="name">Propiedad</label>
        <Dropdown v-model="selectedProperty" :options="properties" :id="selectedProperty._id" optionLabel="name"
          placeholder="Selecciona una propiedad" />
      </div>

      <div class="flex flex-column gap-2 py-2">
        <label for="name">Inquilino</label>
        <Dropdown v-model="selectedTenant" :options="tenants" :id="selectedTenant._id"
          placeholder="Selecciona un inquilino" optionLabel="first_name" />
      </div>

      <div class="flex flex-column gap-2 py-2">
        <label for="lease_start_date">Fecha de inicio</label>
        <Calendar v-model="lease.lease_start_date" />
      </div>

      <div class="flex flex-column gap-2 py-2">
        <label for="lease_end_date">Fecha de fin</label>
        <Calendar v-model="lease.lease_end_date" />
      </div>

      <div class="flex flex-column gap-2 py-2">
        <label for="lease_terms">Terminos</label>
        <InputText id="lease_terms" v-model="lease.lease_terms" required="true" />
      </div>

      <div class="flex flex-row gap-7 py-2 px-2">
        <div class="row" v-if="selectedProperty._id !== undefined">
          <label for="rent_plan">Plan de renta</label>
          <div>
            <Dropdown :options="selectedProperty.rents" id="_id" v-model="selectedRent" optionLabel="type" />
          </div>
        </div>
        <div class="row" v-if="selectedProperty._id !== undefined && selectedRent._id !== undefined">
          <label for="rent_plan">Monto</label>
          <div>
            <label for="rent_plan">{{ selectedRent.amount }}</label>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import type { Lease, Property, Tenant, Rent } from '~/utils/models';





const leases = ref([] as Lease[]);
const layout = 'grid';
const loading = ref(false);
const visible = ref(false);
const properties = ref([] as Property[]);
const tenants = ref([] as Tenant[]);
const selectedProperty = ref({} as Property);
const selectedTenant = ref({} as Tenant);
const selectedRent = ref({} as Rent);
const lease = ref({} as Lease);

onMounted(async () => {
  loading.value = true;
  leases.value = await getLeases();
  loading.value = false;
  properties.value = await getProperties();
  tenants.value = await getTenants();
  console.log(leases.value);

});


const getLeases = async (): Promise<Lease[]> => {
  const { data, refresh, pending } = await useFetch('http://localhost:3000/lease/0/100');
  const lease: Lease[] = data.value as Lease[];
  return lease;
};

const getProperties = async (): Promise<Property[]> => {
  const { data, refresh, pending } = await useFetch('http://localhost:3000/property/0/100');
  const property: Property[] = data.value as Property[];
  return property;
};

const getTenants = async (): Promise<Tenant[]> => {
  const { data, refresh, pending } = await useFetch('http://localhost:3000/tenant/0/10');
  const tenant: Tenant[] = data.value as Tenant[];
  console.log(tenant);
  return tenant;
};

const format_date = (date: string): string => {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

const clearForm = () => {
  visible.value = false;
};

const openPopUp = () => {
  visible.value = true;
};
</script>

<style></style>

