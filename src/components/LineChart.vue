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
            },
            stacked: true
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
            borderColor: '#800001',
            pointBackgroundColor: '#800001',
            borderWidth: 4,
            pointRadius: 0,
            pointBorderColor: '#800001',
            backgroundColor: 'rgba(129,2,1,0.2)',
            data: this.chartData.critVuln
          },
          {
            label: 'high',
            borderColor: '#BF0125',
            pointBackgroundColor: '#BF0125',
            borderWidth: 4,
            pointRadius: 0,
            pointBorderColor: '#BF0125',
            backgroundColor: 'rgba(191,1,37,0.2)',
            data: this.chartData.highVuln
          },
          {
            label: 'medium',
            borderColor: '#DB7200',
            pointRadius: 0,
            pointBackgroundColor: '#DB7200',
            borderWidth: 4,
            pointBorderColor: '#DB7200',
            backgroundColor: 'rgba(219,114,3,0.2)',
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