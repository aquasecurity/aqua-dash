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
            borderColor: '#8b0000',
            pointBackgroundColor: '#8b0000',
            borderWidth: 1,
            pointBorderColor: '#8b0000',
            backgroundColor: 'transparent',
            data: this.chartData.critVuln
          },
          {
            label: 'high',
            borderColor: '#d80000',
            pointBackgroundColor: '#d80000',
            borderWidth: 1,
            pointBorderColor: '#d80000',
            backgroundColor: 'transparent',
            data: this.chartData.highVuln
          },
          {
            label: 'medium',
            borderColor: 'orange',
            pointBackgroundColor: 'orange',
            borderWidth: 1,
            pointBorderColor: 'orange',
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