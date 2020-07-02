<template>
  <v-container fluid>
    <div class="vld-parent">
        <loading :active.sync="isLoading" 
        :can-cancel="false"
        :is-full-page="fullPage"></loading>
    </div>
    <v-row no-gutters>
    <v-col 
      cols="12"
      sm="3"
    >
      <v-row>
        <SelectCard 
          class="item"
        > </SelectCard>
      </v-row>
    </v-col>
    <v-col 
      cols="12"
      sm="9"
    >
      <v-row xs12>
        <VulnCard 
          class="item" 
          :statsType="vulnerabilities"
          :stats="vulnCount"
        > </VulnCard>
      </v-row>
      <v-row xs12>
        <v-col cols="12" sm="2" justify-left>
          <v-row>
        <!--Average/Outstanding/Resolution
        (critaicl_vuln_date_reported - Today) == so many days to fix-->
        <StatsCard 
          class="item" 
          :statsType="outstanding"
          :stats="stats"
        > </StatsCard>
      </v-row>
      <v-row>
        <StatsCard 
          class="item" 
          :statsType="resolve"
          :stats="stats"
        > </StatsCard>
      </v-row>
        </v-col>
        <v-col cols="12" sm="10">
          <TimeseriesCard
            :imageName="imageSelected"
            :repoName="repoSelected"
            :timeseriesData="timeseriesData"
          >
          </TimeseriesCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex'
import StatsCard from '../components/StatsCard.vue'
import SelectCard from '../components/SelectCard.vue'
import VulnCard from '../components/VulnCard.vue'
import TimeseriesCard from '../components/TimeseriesCard.vue'
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
    fullPage: true
  }),
  components: {
    StatsCard,
    SelectCard,
    VulnCard,
    TimeseriesCard,
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
      await this.fetchAccessToken()
      await this.fetchNamespaces()
      await this.fetchRegistries()
      await this.fetchImages('All Registries')
      await this.fetchVulnAck()
      await this.fetchTimeseriesData()
      this.isLoading = false
    } catch (err) {
      console.log(err)
    } finally {
      this.isLoading = false
    }
  },
  beforeDestroy () {
      clearInterval(this.polling)
  },
  methods: {
    ...mapActions([
      'fetchVuln', 
      'fetchAccessToken',
      'fetchVulnAck',
      'fetchNamespaces',
      'fetchRegistries',
      'fetchImages',
      'fetchTimeseriesData'
    ]),
    pollData () {
      this.polling = setInterval(() => {
        console.log('Dashboard polling...')
        this.fetchVuln()
        this.fetchVulnAck()
      }, 30000)
    },
    getVulnerabilities() {
      this.getVuln()
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