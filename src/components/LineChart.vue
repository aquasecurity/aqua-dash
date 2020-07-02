<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: {
    timeseriesData: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    chartData: function() {
      return this.timeseriesData;
    }
  },
  methods: {
    renderLineChart: function() {
      this.renderChart({
        labels: this.chartData.labels,
        datasets: [
          {
            label: 'critical',
            borderColor: 'red',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: 'red',
            backgroundColor: 'transparent',
            data: this.chartData.critVuln
          },
          {
            label: 'high',
            borderColor: 'orange',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: 'orange',
            backgroundColor: 'transparent',
            data: this.chartData.highVuln
          },
          {
            label: 'medium',
            borderColor: 'green',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: 'green',
            backgroundColor: 'transparent',
            data: this.chartData.medVuln
          }
        ]
      }, this.options)   
    }
  },
  mounted () {
    if (this.chartData) {
      this.renderLineChart()
    }
  },
  watch: {
    timeseriesData: function() {
      this.renderLineChart();
    }
  }
}
</script>