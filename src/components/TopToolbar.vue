<template>
  <div>

    <!--v-navigation-drawer app v-model="showMenu">
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>help</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Help</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer-->


    <v-app-bar fixed app>
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
  
export default {
    data () {
        return {
            showMenu: false,
            
        }
    },
    computed: {

    }   
}
</script>
