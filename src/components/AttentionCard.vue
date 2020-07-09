<template>
  <div>

  <v-card
    tile
    elevation="5"
    class="rounded-card"
    height="auto"
  >
    <v-card-title class="justify-center">
      <span class="title error--text font-weight-light">
        FIX NEEDED
      </span>
    </v-card-title>
    <div class="text-center">
      <v-chip
      class="ma-2"
      color="#be0000"
      text-color="white"
      x-large
      label
      >
        <h1>{{vuln.vulnsFixNeeded}}</h1>
      </v-chip>
      <v-chip
      class="ma-2"
      color="info"
      text-color="white"
      x-large
      label
      >
        <h1>{{vuln.daysRemaining}}</h1>
        <br>
        <h5> Days</h5>
      </v-chip>
    </div>
  </v-card>
  </div>
</template>

<script>
//import {mapActions} from 'vuex'
import moment from 'moment'

  export default {
    data: () => ({
      polling: null
    }),
    props: [
      'statsType',
      'stats'
    ],
    computed: {
      vuln () {
        let vulns = this.$store.getters.images
        let imageSelected = this.$store.getters.imageSelected
        let crit_vulns = 0
        let high_vulns = 0
        let sensitive_data = 0
        let malware = 0
        let dateHash = {}
        for (let i = 0; i < vulns.length; i++) {
          if (imageSelected && vulns[i].name === imageSelected) {
            crit_vulns = vulns[i].crit_vulns
            high_vulns = vulns[i].high_vulns
            sensitive_data = vulns[i].sensitive_data
            malware = vulns[i].malware
            dateHash = {}
            dateHash[vulns[i].created] = vulns[i].name
            break
          }
          crit_vulns += vulns[i].crit_vulns
          high_vulns += vulns[i].high_vulns
          sensitive_data += vulns[i].sensitive_data
          malware += vulns[i].malware
          dateHash[vulns[i].created] = ''
          //console.log(`Scan: ${vulns[i].scan_date} Create: ${vulns[i].created} Image: ${vulns[i].name}`)
        }
        let dateSortedArray = Object.keys(dateHash).sort()
        //console.log(dateSortedArray)
        return {
          vulnsFixNeeded: crit_vulns + high_vulns,
          sensitive: sensitive_data,
          malware: malware,
          daysRemaining: this.daysRemaining(dateSortedArray[0])
        }
      }
    },
    created () {
      //this.pollData()
    },
    beforeDestroy () {
      clearInterval(this.polling)
    },
    methods: {
      //...mapActions(['updateRigStats']),
      pollData () {
        this.polling = setInterval(() => {
          this.getStats('I dont know :)')
        }, 30000)
      },
      getStats(ofWhat) {
        console.log(ofWhat)
      },
      daysRemaining (date) {
        let daysToFix = 30
        let orignDate = moment(date)
        var todayDate = moment(new Date)
        let diffDay = orignDate.diff(todayDate, 'days')
        console.log(diffDay)
        return (daysToFix + diffDay)
      }
    }
  }
</script>

<style>
.rounded-card{
  border-radius:15px;
}
</style>
