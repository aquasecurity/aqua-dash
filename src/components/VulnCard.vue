<template>
  <v-row xs12>
    <v-card
      tile
      elevation="5"
      class="rounded-card"
      height="auto"
    >
      <v-card-title>
        <span class="title font-weight-light ">
        VULNERABILITIES
        </span>
      </v-card-title>
      <!--div class="hidden-sm-and-down"-->
      <div class="text-center">
        <v-chip
        class="ma-2"
        color="error"
        text-color="white"
        x-large
        label
        >
          {{vuln.critical}}
        </v-chip>
        <v-chip
        class="ma-2"
        color="warning"
        text-color="white"
        x-large
        label
        >
          {{vuln.high}}
        </v-chip>
        <v-chip
        class="ma-2"
        color="info"
        text-color="white"
        x-large
        label
        >
          {{vuln.total}}
        </v-chip>
      </div>
    </v-card>
    <v-spacer/>
    <v-card
      tile
      elevation="5"
      class="rounded-card"
      height="auto"
    >
      <v-card-title>
        <span class="title font-weight-light ">
        SENSITIVE DATA
        </span>
      </v-card-title>
      <div class="text-center">
        <v-chip
        class="ma-2"
        color="warning"
        text-color="white"
        x-large
        label
        >
          {{vuln.sensitive}}
        </v-chip>
      </div>
    </v-card>
    <v-spacer/>
    <v-card
      tile
      elevation="5"
      class="rounded-card"
      height="auto"
    >
      <v-card-title>
        <span class="title font-weight-light ">
        MALWARE
        </span>
      </v-card-title>
      <div class="text-center">
        <v-chip
        class="ma-2"
        color="warning"
        text-color="white"
        x-large
        label
        >
          {{vuln.malware}}
        </v-chip>
      </div>
    </v-card>
    <v-spacer/>
    <v-spacer/>
    <v-card
      tile
      elevation="5"
      class="rounded-card"
      height="auto"
    >
      <v-card-title>
        <span class="title font-weight-light ">
        UNACKNOWLEDGED
        </span>
      </v-card-title>
      <div class="text-center">
        <v-chip
        class="ma-2"
        color="error"
        text-color="white"
        x-large
        label
        >
          {{vuln.unacknowledged}}
        </v-chip>
      </div>
    </v-card>
    <v-spacer/>
    <v-card
      tile
      elevation="5"
      class="rounded-card"
      height="auto"
    >
      <v-card-title>
        <span class="title font-weight-light ">
        ACKNOWLEDGED
        </span>
      </v-card-title>
      <div class="text-center">
        <v-chip
        class="ma-2"
        color="success"
        text-color="white"
        x-large
        label
        >
          {{vuln.acknowledged}}
        </v-chip>
      </div>
    </v-card>
  </v-row>
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
    vuln () {
      let vulns = this.$store.getters.vulns
      let imageSelected = this.$store.getters.imageSelected
      let vulnAck = this.$store.getters.vulnAck
      let crit_vulns = 0
      let high_vulns = 0
      let total_vulns = 0
      let sensitive_data = 0
      let malware = 0
      let acknowledged = 0
      let ack_vulns_counter = 0
      for (let i = 0; i < vulns.length; i++) {
        if (imageSelected && vulns[i].name === imageSelected) {
          crit_vulns = vulns[i].crit_vulns
          high_vulns = vulns[i].high_vulns
          total_vulns = vulns[i].vulns_found
          sensitive_data = vulns[i].sensitive_data
          malware = vulns[i].malware
          for (let j = 0; j < vulnAck.length; j++) {
            if (vulnAck[j].image_name === vulns[i].name) {
              ack_vulns_counter++
            }
          }
          break
        } 
        crit_vulns += vulns[i].crit_vulns
        high_vulns += vulns[i].high_vulns
        total_vulns += vulns[i].vulns_found
        sensitive_data += vulns[i].sensitive_data
        malware += vulns[i].malware
      }
      if (imageSelected && imageSelected !== 'All Images') {
        acknowledged = ack_vulns_counter
      } else {
        acknowledged = vulns.length === 0 ? 0 : vulnAck.length
      }
      return {
        critical: crit_vulns,
        high: high_vulns,
        total: total_vulns,
        sensitive: sensitive_data,
        malware: malware,
        acknowledged: acknowledged,
        unacknowledged: total_vulns - acknowledged
      }
    },
    image () {
      return this.$store.getters.imageSelected
    }
  },
  created () {
    // Polling is disabled
    //this.pollData()
  },
  beforeDestroy () {
    clearInterval(this.polling)
  },
  methods: {
    ...mapActions(['fetchVuln']),
    pollData () {
      this.polling = setInterval(() => {
        //this.getStats('I dont know :)')
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
