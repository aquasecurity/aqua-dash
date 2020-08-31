<template>
  <div class="content">
  <v-card
    tile
    elevation="0"
    class="rounded-card"
    height="auto"
  >
    <v-list>
      <v-alert
        border="left"
        colored-border
        color="error darken-4"
        dark
        dense
      >
        <v-list-item-title>{{vuln.vulnsFixNeededCritical}} Critical</v-list-item-title>
          <v-list-item-subtitle>
            Fix {{vuln.daysRemainingCritical < 0 ? 'overdue' : 'due'}} {{moment().add(vuln.daysRemainingCritical, 'days').format('MMM DD')}} ({{moment().add(vuln.daysRemainingCritical, 'days').fromNow()}})
          </v-list-item-subtitle>
      </v-alert>
    
      <v-alert
        border="left"
        colored-border
        color="error darken-2"
        dark
        dense
      >
        <v-list-item-title>{{vuln.vulnsFixNeededHigh}} High</v-list-item-title>
        <v-list-item-subtitle>
          Fix {{vuln.daysRemainingHigh < 0 ? 'overdue' : 'due'}} {{moment().add(vuln.daysRemainingHigh, 'days').format('MMM DD')}} ({{moment().add(vuln.daysRemainingHigh, 'days').fromNow()}})
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          
        </v-list-item-subtitle>
      </v-alert>
    
      <v-alert
        border="left"
        colored-border
        color="success darken-1"
        dark
        dense
      >
        <v-list-item-title>{{acknowledged.length}} Acknowledged</v-list-item-title>
        <v-list-item-subtitle>
          {{acknowledgedDue < 0 ? 'Expired' : 'Expires'}} on {{moment().add(acknowledgedDue, 'days').format('MMM DD')}} ({{moment().add(acknowledgedDue, 'days').fromNow()}})
        </v-list-item-subtitle>
      </v-alert>
      <v-alert
        border="left"
        colored-border
        color="info darken-1"
        dark
        dense
      >
        <v-list-item-title>{{vshielded.length}} Vshield Applied</v-list-item-title>
        <v-list-item-subtitle>
          Fix {{vshieldedDue < 0 ? 'overdue' : 'due'}} {{moment().add(vshieldedDue, 'days').format('MMM DD')}} ({{moment().add(vshieldedDue, 'days').fromNow()}})
        </v-list-item-subtitle>
      </v-alert>
   </v-list>
  </v-card>
  </div>
</template>

<script>
//import {mapActions} from 'vuex'
import moment from 'moment'

  export default {
    data: () => ({
      polling: null,
      moment: moment
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
          vulnsFixNeededCritical: crit_vulns,
          vulnsFixNeededHigh: high_vulns,
          sensitive: sensitive_data,
          malware: malware,
          daysRemainingCritical: this.daysRemaining(dateSortedArray[0], 'critical'),
          daysRemainingHigh: this.daysRemaining(dateSortedArray[0], 'high')
        }
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
      vshieldedDue () {
        console.log('$%# vshieldedDue: ')
        return (this.vuln.daysRemainingCritical < this.vuln.daysRemainingHigh ? this.vuln.daysRemainingCritical : this.vuln.daysRemainingHigh)
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
      acknowledgedDue () {
        console.log('$%# acknowledgedDue: ')
        console.log(this.acknowledged)
        let expirationArray = []
        for (let i = 0; i < this.acknowledged.length; i++) {
          expirationArray.push(this.acknowledged[i].ack_expiration_days)
          console.log(this.acknowledged[i].ack_expiration_days)
        }
        let expirationSortedArray = expirationArray.sort()
        return expirationSortedArray[0]
      },
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
      daysRemaining (date, vulnType) {
        console.log('daysRemaining date:')
        console.log(date)
        console.log('high days')
        let daysToFix = null
        if (vulnType === 'critical') {
          daysToFix = parseInt(this.$store.getters.criticalAge, 10)
        } else if (vulnType === 'high') {
          daysToFix = parseInt(this.$store.getters.highAge, 10)
        }
        console.log(daysToFix)
        let orignDate = moment(date)
        var todayDate = moment(new Date)
        let diffDay = orignDate.diff(todayDate, 'days')
        console.log(diffDay)
        console.log(daysToFix)
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
