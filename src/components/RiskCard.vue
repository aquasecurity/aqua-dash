<template>
	<v-card
	tile
	elevation="5"
	class="rounded-card"
	height="auto"
	>
		<div class="vld-parent">
        <loading :active.sync="riskTableLoading" 
        :can-cancel="false"
        :is-full-page="false"></loading>
    </div>
		<v-card-title>
			<span class="title font-weight-light ">
				Risk Data 
			</span>
			<v-spacer/>
			<span class="title font-weight-thin ">
				
			</span>
		</v-card-title>
		<v-data-table
		:headers="headers"
		:items="risks"
		item-key="id"
		sort-by="aqua_severity"
		group-by="aqua_severity"
		class="elevation-1"
		show-group-by
		></v-data-table>
	</v-card>
</template>
<script>
	import Loading from 'vue-loading-overlay'
	import 'vue-loading-overlay/dist/vue-loading.css'

	export default {
		data () {
			return {
				headers: [
				{
					text: 'Vulnerabilities',
					align: 'start',
					value: 'name',
					groupable: false,
					sortable: false
				},
				{ 
					text: 'Issue Description',
					value: 'description',
					align: 'left',
					groupable: false,
					sortable: false
				},
				{ 
					text: 'Severity',
					value: 'aqua_severity',
					align: 'right'
				},
				{ 
					text: 'Remediation',
					value: 'solution',
					align: 'left',
					groupable: false,
					sortable: false
				},
				{ 
					text: 'Link to Aqua',
					value: 'nvd_url',
					align: 'left',
					groupable: false,
					sortable: false
				}
				],
			}
		},
		components: {
			Loading
		},
		computed: {
			risks () {
				return this.$store.getters.risks
			},
			riskTableLoading () {
				return this.$store.getters.riskTableLoading
			}
		}
	}
</script>