<template>
  <div>
    <v-navigation-drawer app v-model="showMenu">
      <SelectCard 
        class="item"
      > </SelectCard>
    </v-navigation-drawer>

    <v-app-bar dark fixed app>
      <v-app-bar-nav-icon @click.stop="toggleMenu"></v-app-bar-nav-icon>
      
      <span class="title ml-3 mr-5" font-color="blue-grey lighten-5">aqua<span class="font-weight-light">.dash</span></span>

      <v-layout
          align-center
          justify-end
      >
        <span class="font-weight-light">Aqua ProServ</span>
      </v-layout>

    </v-app-bar>

  </div>
</template>

<script>
import SelectCard from '../components/SelectCard.vue'
export default {
  data () {
      return {
          showMenu: false,
      }
  },
  components: {
    SelectCard
  },
  computed: {
    toggleMenu () {
        this.showMenu = !this.showMenu
        return this.showMenu
    }
  }   
}
</script>
