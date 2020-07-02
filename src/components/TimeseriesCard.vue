<template>
  <div class="content">
    <v-card
    tile
    elevation="5"
    class="rounded-card"
    height="auto"
    >
      <v-card-title>
        <span class="title font-weight-light ">
        Risks: {{imageName}}
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