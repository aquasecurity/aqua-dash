<template>
  <div>
    <v-app-bar
      color="#33343E"
      dark
      dense
      flat
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span class="title ml-3 mr-5" font-color="blue-grey lighten-5">aqua<span class="font-weight-light">.dash</span></span>
      </v-toolbar-title>
      <v-layout
        align-center
        justify-end
      >
        <span class="font-weight-light">Aqua ProServ</span>
      </v-layout>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <SettingsCard/>
    </v-navigation-drawer>
 </div>
</template>


<script>
  import SettingsCard from '../components/SettingsCard.vue'
  export default {
    data: () => ({
      drawer: false,
    }),
    components: {
      SettingsCard
    },
    created () {
      this.drawer = this.$store.getters.initRequired
    }
  }
</script>

  
