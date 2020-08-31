<template>
  <div class="content">
    <v-card
    tile
    elevation="0"
    class="rounded-card"
    height="auto"
    >
      <v-card-title>
        <span class="title font-weight-light ">
        Risk Trends 
        </span>
        <v-spacer/>
        <span class="title font-weight-thin ">
        {{(repoName && (repoName !== 'All Registries'))? repoName : ''}}
        </span>
        <span class="title font-weight-thin ">
        {{(imageName && repoName)? ':' : ''}}
        </span>
        <span class="title font-weight-thin ">
        {{(imageName && (imageName !== 'All Images'))? imageName : ''}}
        </span>
      </v-card-title>
      <div class="container">
        <div class="Chart__content">
          <line-chart
            :timeseriesData="timeseriesData"
          ></line-chart>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
import LineChart from '@/components/LineChart'
export default {
  components: {
    LineChart
  },
  props: ['imageName', 'repoName', 'timeseriesData']
}
</script>