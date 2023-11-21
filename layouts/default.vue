
<template>
  <header>
    <div class="card">
      <Menubar :model="items">
        <template #item="{ item, props, hasSubmenu }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple :href="href" v-bind="props.action" @click="navigate">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
            <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
          </a>
        </template>
      </Menubar>
    </div>
  </header>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          label: 'Inicio',
          icon: 'pi pi-microsoft',
          command: () => {
            this.$router.push('/');
          }

        },
        {
          label: 'Departamentos',
          icon: 'pi pi-home',
          command: () => {
            this.$router.push('/property');
          }
        },
        {
          label: 'Inquilinos',
          icon: 'pi pi-users',
          command: () => {
            this.$router.push('/tenant');
          }
        },
        {
          label: 'Contratos',
          icon: 'pi pi-file',
          command: () => {
            this.$router.push('/leases');
          }
        },
        {
          label: 'Pagos',
          icon: 'pi pi-money-bill',
          command: () => {
            this.$router.push('/payments');
          }
        },
      ]
    };
  }
};
</script>
