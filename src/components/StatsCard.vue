<template>
  <v-card
    tile
    elevation="5"
    class="rounded-card"
    height="auto"
  >
    <v-card-title>
      <span class="title font-weight-light ">
      {{statsType.toUpperCase()}}
      </span>
    </v-card-title>
    <div class="text-center">
      <v-chip
      class="ma-2"
      color="green"
      text-color="white"
      x-large
      label
      >
        {{ stats?stats:'...' }}
      </v-chip>
    </div>
  </v-card>
</template>

<script>
import {mapActions} from 'vuex'

  export default {
    data: () => ({
      polling: null
    }),
    props: [
      'statsType',
      'stats'
    ],
    computed: {
      user () {
        return "administrator"
      },
      textColor () {
        return "red"
      }
    },
    created () {
      //this.pollData()
    },
    beforeDestroy () {
      clearInterval(this.polling)
    },
    methods: {
      ...mapActions(['updateRigStats']),
      pollData () {
        this.polling = setInterval(() => {
          this.getStats('I dont know :)')
        }, 30000)
      },
      getStats(ofWhat) {
        console.log(ofWhat)
      }
    }
  }
</script>

<style>
.rounded-card{
  border-radius:15px;
}
</style>
