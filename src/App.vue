<template>
  <v-app :dark="true">

    <TopToolbar></TopToolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <!--BottomNav></BottomNav-->

  </v-app>
</template>

<script>
import TopToolbar from './components/TopToolbar.vue';

export default {
  data () {
      return {
          message: 'Welcome to the Aqua dash'
      }
  },
  components: {
      'TopToolbar': TopToolbar
  },
  methods: {
    
  },
  async created() {
    
  }
}
</script>
