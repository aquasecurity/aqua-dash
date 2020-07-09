<template>
  <v-app>

    <TopToolbar></TopToolbar>
    <v-main>
      <router-view></router-view>
    </v-main>
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
