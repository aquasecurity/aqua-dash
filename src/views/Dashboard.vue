<template>
  <v-container fluid>
    <div class="vld-parent">
        <loading :active.sync="isLoading" 
        :can-cancel="false"
        :is-full-page="fullPage"></loading>
    </div>
    <v-alert
      v-if="error"
      dense
      type="error"
      dismissible
    >
      {{errorText}}
    </v-alert>
    <v-row no-gutters>
    <v-col 
      cols="12"
      sm="2"
    >
      <v-row>
        <SelectCard 
          class="item"
        > </SelectCard>
      </v-row>
    </v-col>
    <v-col 
      cols="12"
      sm="10"
    >
      <v-row xs12>
        <VulnCard 
          class="item" 
        > </VulnCard>
      </v-row>
      <v-row xs12>
        <v-col cols="12" sm="9">
          <TimeseriesCard
            :imageName="imageSelected"
            :repoName="repoSelected"
            :timeseriesData="timeseriesData"
          >
          </TimeseriesCard>
        </v-col>
        <v-col cols="12" sm="3">
          <AttentionCard 
            :statsType="outstanding"
            :stats="stats"
          > </AttentionCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex'
//import StatsCard from '../components/StatsCard.vue'
import SelectCard from '../components/SelectCard.vue'
import VulnCard from '../components/VulnCard.vue'
import TimeseriesCard from '../components/TimeseriesCard.vue'
import AttentionCard from '../components/AttentionCard.vue'
//import RiskCard from '../components/RiskCard.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  data: () => ({
    polling: null,
    vulnerabilities: "Vulnerabilities",
    sensitiveData: "Sensitive Data",
    malware: "Malware",
    unacknowledged: "Unacknowledged",
    acknowledged: "Acknowledged",
    outstanding: "overdue",
    resolve: "resolved",
    isLoading: false,
    fullPage: true,
    error: false,
    errorText: null
  }),
  components: {
    //StatsCard,
    SelectCard,
    VulnCard,
    TimeseriesCard,
    AttentionCard,
    //RiskCard,
    Loading
  },
  computed: {
    stats () {
      return "0"
    },
    vulnCount () {
      return this.$store.getters.vulnCount
    },
    vulnAck () {
      return this.$store.getters.vulnAck
    },
    vulnUnAck () {
      return this.$store.getters.vulnUnAck
    },
    imageSelected () {
      return this.$store.getters.imageSelected
    },
    repoSelected () {
      return this.$store.getters.repoSelected
    },
    timeseriesData () {
      return this.$store.getters.timeseriesData
    }
  },
  async mounted () {
    this.pollData()
    try {
      this.isLoading = true
      if (this.$store.getters.accessToken) {
        await this.fetchNamespaces()
        await this.fetchRegistries()
        await this.fetchImages('All Registries')
        this.fetchVulnAck()
        this.fetchTimeseriesData()
        this.fetchAllRisks()
      }
      this.isLoading = false
    } catch (err) {
      console.log(err)
      this.error = true
      this.errorText = 
        '[' + err.response.data.code + '] '
        + err.response.data.message
    } finally {
      this.isLoading = false
    }
  },
  async created () {

  },
  beforeDestroy () {
      clearInterval(this.polling)
  },
  methods: {
    ...mapActions([
      'initializeStore',
      'fetchVuln', 
      'fetchAccessToken',
      'fetchVulnAck',
      'fetchNamespaces',
      'fetchRegistries',
      'fetchImages',
      'fetchTimeseriesData',
      'fetchAllRisks'
    ]),
    pollData () {
      this.polling = setInterval(() => {
        console.log('Dashboard polling...')
        this.fetchVulnAck()
      }, 60000)
    }
   }
}
</script>

<style scoped>
  .resultContainer {
    height: 350px;
  }

  .item {
    min-height: 50px;
    min-width: 80px;
    margin: 10px;
  }
</style>