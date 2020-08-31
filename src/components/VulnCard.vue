<template>
  <v-row xs12>
    <v-card
      tile
      elevation="0"
      class="rounded-card"
      height="auto"
    >
      <v-card-title class="justify-center">
        <span class="title font-weight-light">
        VULNERABILITIES
        </span>
      </v-card-title>
        <v-chip
        class="ma-2"
        color="rgba(129,2,1,0.2)"
        text-color="error darken-4"
        borderWidth="4"
        x-large
        label
        @click.stop="criticalDialog = true"
        >
          <h1>
            <AnimatedNumber
            :number="vuln.critical"
            >
            </AnimatedNumber>
          </h1>
        </v-chip>
        <v-dialog
          v-model="criticalDialog"
          max-width="75%"
          overlay-opacity="0.9"
        >
          <DetailVulnCard
            :risks="criticalVulns"
            :title="'critical'"
          >
          </DetailVulnCard>
        </v-dialog>
        <v-chip
        class="ma-2"
        color="rgba(191,1,37,0.2)"
        text-color="error darken-2"
        x-large
        label
        @click.stop="highDialog = true"
        >
          <h1>
            <AnimatedNumber
            :number="vuln.high"
            >
            </AnimatedNumber>
          </h1>
        </v-chip>
        <v-dialog
          v-model="highDialog"
          max-width="75%"
          overlay-opacity="0.9"
        >
          <DetailVulnCard
            :risks="highVulns"
            :title="'high'"
          >
          </DetailVulnCard>
        </v-dialog>
        <v-chip
        class="ma-2"
        color="rgba(219,114,3,0.2)"
        text-color="warning darken-1"
        x-large
        label
        @click.stop="mediumDialog = true"
        >
          <h1>
            <AnimatedNumber
            :number="vuln.med"
            >
            </AnimatedNumber>
          </h1>
        </v-chip>
        <v-dialog
          v-model="mediumDialog"
          max-width="75%"
          overlay-opacity="0.9"
        >
          <DetailVulnCard
            :risks="mediumVulns"
            :title="'medium'"
          >
          </DetailVulnCard>
        </v-dialog>
    </v-card>
    <v-spacer/>
    <v-card
      tile
      elevation="0"
      class="rounded-card"
      height="auto"
    >
      <v-card-title class="justify-center">
        <span class="title font-weight-light ">
        SENSITIVE DATA
        </span>
      </v-card-title>
      <div class="text-center">
        <v-chip
        class="ma-2"
        color="rgba(245,127,24,0.2)"
        text-color="yellow darken-4"
        x-large
        label
        >
          <h1>
            <AnimatedNumber
            :number="vuln.sensitive"
            >
            </AnimatedNumber>
          </h1>
        </v-chip>
      </div>
    </v-card>
    <v-spacer/>
    <v-card
      tile
      elevation="0"
      class="rounded-card"
      height="auto"
    >
      <v-card-title class="justify-center">
        <span class="title font-weight-light ">
        MALWARE
        </span>
      </v-card-title>
      <div class="text-center">
        <v-chip
        class="ma-2"
        color="rgba(245,127,24,0.2)"
        text-color="yellow darken-4"
        x-large
        label
        >
          <h1>
            <AnimatedNumber
            :number="vuln.malware"
            >
            </AnimatedNumber>
          </h1>
        </v-chip>
      </div>
    </v-card>
    <v-spacer/>
    <v-spacer/>
    <v-card
      tile
      elevation="0"
      class="rounded-card"
      height="auto"
    >
      <v-card-title class="justify-center">
        <span class="title font-weight-light ">
        UNACKNOWLEDGED
        </span>
      </v-card-title>
      <div class="text-center">
        <v-chip
        class="ma-2"
        color="rgba(249,168,36,0.2)"
        text-color="yellow darken-3"
        x-large
        label
        @click.stop="unackDialog = true"
        >
          <h1>
            <AnimatedNumber
            :number="vuln.unacknowledged"
            >
            </AnimatedNumber>
          </h1>
        </v-chip>
        <v-dialog
          v-model="unackDialog"
          max-width="75%"
          overlay-opacity="0.9"
        >
          <DetailUnAckCard
            :risks="unacknowledged"
            :title="'unacknowledged'"
          >
          </DetailUnAckCard>
        </v-dialog>
      </div>
    </v-card>
    <v-spacer/>
    <v-card
      tile
      elevation="0"
      class="rounded-card"
      height="auto"
    >
      <v-card-title class="justify-center">
        <span class="title font-weight-light ">
        ACKNOWLEDGED
        </span>
      </v-card-title>
      <div class="text-center">
        <v-chip
        class="ma-2"
        color="rgba(44,149,56,0.2)"
        text-color="success darken-1"
        x-large
        label
        @click.stop="ackDialog = true"
        >
          <!--h1>{{vuln.acknowledged}}</h1-->
          <h1>
            <AnimatedNumber
            :number="acknowledged.length"
            >
            </AnimatedNumber>
          </h1>
        </v-chip>
        <v-dialog
          v-model="ackDialog"
          max-width="95%"
          overlay-opacity="0.9"
        >
          <DetailAckCard
            :risks="acknowledged"
            :title="'acknowledged'"
          >
          </DetailAckCard>
        </v-dialog>
      </div>
    </v-card>
    <v-spacer/>
    <v-card
      tile
      elevation="0"
      class="rounded-card"
      height="auto"
    >
      <v-card-title class="justify-center">
        <span class="title font-weight-light ">
        VSHIELDED
        </span>
      </v-card-title>
      <div class="text-center">
        <v-chip
        class="ma-2"
        color="rgba(1,124,214,0.2)"
        text-color="info darken-1"
        x-large
        label
        @click.stop="vshieldDialog = true"
        >
          <h1>
            <AnimatedNumber
            :number="vshielded.length"
            >
            </AnimatedNumber>
          </h1>
        </v-chip>
        <v-dialog
          v-model="vshieldDialog"
          max-width="95%"
          overlay-opacity="0.9"
          
        >
          <DetailVshieldCard
            :risks="vshielded"
            :title="'vshielded'"
          >
          </DetailVshieldCard>
        </v-dialog>
      </div>
    </v-card>
  </v-row>
</template>

<script>
import {mapActions} from 'vuex'
import AnimatedNumber from '../components/AnimatedNumber.vue'
import DetailUnAckCard from '../components/DetailUnAckCard.vue'
import DetailVulnCard from '../components/DetailVulnCard.vue'
import DetailAckCard from '../components/DetailAckCard.vue'
import DetailVshieldCard from '../components/DetailVshieldCard.vue'
import moment from 'moment'
export default {
  data: () => ({
    polling: null,
    vshieldDialog: false,
    ackDialog: false,
    unackDialog: false,
    criticalDialog: false,
    highDialog: false,
    mediumDialog: false
  }),
  props: [
    
  ],
  components: {
    DetailUnAckCard,
    DetailVulnCard,
    AnimatedNumber,
    DetailAckCard,
    DetailVshieldCard
  },
  computed: {
    vuln () {
      let vulns = this.$store.getters.images
      let imageSelected = this.$store.getters.imageSelected
      let vulnAck = this.$store.getters.vulnAck
      let crit_vulns = 0
      let high_vulns = 0
      let med_vulns = 0
      let total_vulns = 0
      let sensitive_data = 0
      let malware = 0
      let acknowledged = 0
      let ack_vulns_counter = 0
      for (let i = 0; i < vulns.length; i++) {
        if (imageSelected && vulns[i].name === imageSelected) {
          crit_vulns = vulns[i].crit_vulns
          high_vulns = vulns[i].high_vulns
          med_vulns = vulns[i].med_vulns
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
        med_vulns += vulns[i].med_vulns
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
        med: med_vulns,
        sensitive: sensitive_data,
        malware: malware,
        acknowledged: acknowledged,
        unacknowledged: total_vulns - acknowledged
      }
    },
    image () {
      return this.$store.getters.imageSelected
    },
    criticalVulns () {
      //let that = this
      let imgSel = this.$store.getters.imageSelected
      let repSel = this.$store.getters.repoSelected
      let criticalVulns  = this.$store.getters.allRisks.filter(function(obj) {
        if (imgSel && repSel) {
          return (
            (obj.aqua_severity === 'critical')
            && (obj.registry === repSel)
            && (obj.image_name === imgSel)
          )
        } else if ( repSel && (!imgSel || imgSel === 'All Images')) {
          return (
            (obj.aqua_severity === 'critical')
            && (obj.registry === repSel)
          )
        } else if ( imgSel && !repSel && imgSel !== 'All Images') {
          return (
            (obj.aqua_severity === 'critical')
            && (obj.image_name === imgSel)
          )
        }
        else {
          return (obj.aqua_severity === 'critical')
        }
        //return (obj.v_patch_status === "patch_available") //&& (obj.age < 30)
      })
      return criticalVulns
    },
    highVulns () {
      //let that = this
      let imgSel = this.$store.getters.imageSelected
      let repSel = this.$store.getters.repoSelected
      let highVulns  = this.$store.getters.allRisks.filter(function(obj) {
        if (imgSel && repSel) {
          return (
            (obj.aqua_severity === 'high')
            && (obj.registry === repSel)
            && (obj.image_name === imgSel)
          )
        } else if ( repSel && (!imgSel || imgSel === 'All Images')) {
          return (
            (obj.aqua_severity === 'high')
            && (obj.registry === repSel)
          )
        } else if ( imgSel && !repSel && imgSel !== 'All Images') {
          return (
            (obj.aqua_severity === 'high')
            && (obj.image_name === imgSel)
          )
        }
        else {
          return (obj.aqua_severity === 'high')
        }
        //return (obj.v_patch_status === "patch_available") //&& (obj.age < 30)
      })
      return highVulns
    },
    mediumVulns () {
      //let that = this
      let imgSel = this.$store.getters.imageSelected
      let repSel = this.$store.getters.repoSelected
      let mediumVulns  = this.$store.getters.allRisks.filter(function(obj) {
        if (imgSel && repSel) {
          return (
            (obj.aqua_severity === 'medium')
            && (obj.registry === repSel)
            && (obj.image_name === imgSel)
          )
        } else if ( repSel && (!imgSel || imgSel === 'All Images')) {
          return (
            (obj.aqua_severity === 'medium')
            && (obj.registry === repSel)
          )
        } else if ( imgSel && !repSel && imgSel !== 'All Images') {
          return (
            (obj.aqua_severity === 'medium')
            && (obj.image_name === imgSel)
          )
        }
        else {
          return (obj.aqua_severity === 'medium')
        }
        //return (obj.v_patch_status === "patch_available") //&& (obj.age < 30)
      })
      return mediumVulns
    },
    vshielded () {
      //let that = this
      let imgSel = this.$store.getters.imageSelected
      let repSel = this.$store.getters.repoSelected
      let vshieldArray  = this.$store.getters.allRisks.filter(function(obj) {
        if (imgSel && repSel) {
          return (
            (obj.v_patch_status === 'patched_audit' || obj.v_patch_status === 'patched_enforce')
            && (obj.registry === repSel)
            && (obj.image_name === imgSel)
          )
        } else if ( repSel && (!imgSel || imgSel === 'All Images')) {
          return (
            (obj.v_patch_status === 'patched_audit' || obj.v_patch_status === 'patched_enforce')
            && (obj.registry === repSel)
          )
        } else if ( imgSel && !repSel && imgSel !== 'All Images') {
          return (
            (obj.v_patch_status === 'patched_audit' || obj.v_patch_status === 'patched_enforce')
            && (obj.image_name === imgSel)
          )
        }
        else {
          return (obj.v_patch_status === 'patched_audit' || obj.v_patch_status === 'patched_enforce')
        }
        //return (obj.v_patch_status === "patch_available") //&& (obj.age < 30)
      })
      return vshieldArray
    },
    acknowledged () {
      //let that = this
      let imgSel = this.$store.getters.imageSelected
      let repSel = this.$store.getters.repoSelected
      let acknowledgedArray  = this.$store.getters.allRisks.filter(function(obj) {
        if (imgSel && repSel) {
          return (
            (moment(obj.acknowledged_date).isAfter('1970-01-01T00:00:00Z'))
            && (obj.registry === repSel)
            && (obj.image_name === imgSel)
          )
        } else if ( repSel && (!imgSel || imgSel === 'All Images')) {
          return (
            (moment(obj.acknowledged_date).isAfter('1970-01-01T00:00:00Z'))
            && (obj.registry === repSel)
          )
        } else if ( imgSel && !repSel && imgSel !== 'All Images') {
          return (
            (moment(obj.acknowledged_date).isAfter('1970-01-01T00:00:00Z'))
            && (obj.image_name === imgSel)
          )
        }
        else {
          return (
            moment(obj.acknowledged_date).isAfter('1970-01-01T00:00:00Z')
          )
        }
        //return (obj.v_patch_status === "patch_available") //&& (obj.age < 30)
      })
      return acknowledgedArray
    },
    unacknowledged () {
      //let that = this
      let imgSel = this.$store.getters.imageSelected
      let repSel = this.$store.getters.repoSelected
      let unacknowledgedArray  = this.$store.getters.allRisks.filter(function(obj) {
        if (imgSel && repSel) {
          return (
            (moment(obj.acknowledged_date).isSame('1970-01-01T00:00:00Z'))
            && (obj.registry === repSel)
            && (obj.image_name === imgSel)
          )
        } else if ( repSel && (!imgSel || imgSel === 'All Images')) {
          return (
            (moment(obj.acknowledged_date).isSame('1970-01-01T00:00:00Z'))
            && (obj.registry === repSel)
          )
        } else if ( imgSel && !repSel && imgSel !== 'All Images') {
          return (
            (moment(obj.acknowledged_date).isSame('1970-01-01T00:00:00Z'))
            && (obj.image_name === imgSel)
          )
        }
        else {
          return (
            moment(obj.acknowledged_date).isSame('1970-01-01T00:00:00Z')
          )
        }
        //return (obj.v_patch_status === "patch_available") //&& (obj.age < 30)
      })
      return unacknowledgedArray
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
