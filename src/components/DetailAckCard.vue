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
			{{title.toUpperCase()}} 
		</span>
		<v-spacer/>
    <v-text-field
    v-model="search"
    append-icon="mdi-magnify"
    label="Search"
    single-line
    hide-details
    ></v-text-field>
    <v-spacer/>
    <span class="title font-weight-thin ">
     <v-chip
     class="ma-2"
     color="error darken-4"
     text-color="white"
     label
     >
     {{critCount}}
   </v-chip>
   <v-chip
   class="ma-2"
   color="error darken-1"
   text-color="white"
   label
   >
   {{highCount}}
 </v-chip>
 <v-chip
 class="ma-2"
 color="warning darken-1"
 text-color="white"
 label
 >
 {{medCount}}
</v-chip>
</span>
</v-card-title>
<v-data-table
:headers="headers"
:items="risks"
:search="search"
item-key="id"
sort-by="aqua_severity"
group-by="v_patch_status"
class="elevation-1"
show-group-by
>
<template v-slot:item.acknowledged_date="{ item }">
	{{moment(item.acknowledged_date).fromNow()}}
</template>
<template v-slot:item.ack_expiration_days="{ item }">
	<div 
  v-if="item.ack_expiration_days === 0"
  >
  Never
</div>
<div v-else>
  {{moment().add(item.ack_expiration_days, 'days').fromNow()}}
</div>
</template>
<template v-slot:item.nvd_url="{ item }">
	<v-btn 
	:href="item.nvd_url"
	text 
	small
	dense
	>nvd</v-btn>
</template>
<template v-slot:item.v_patch_status="{ item }">
	<v-btn 
	v-if="item.v_patch_status === 'patch_available'"
	text 
	small 
	color="info"
	>
	<v-icon x-small>
		mdi-shield-plus-outline
	</v-icon>
</v-btn>
<v-btn 
v-if="item.v_patch_status === 'no_patch'"
text 
small
disabled
>
<v-icon x-small>
	mdi-shield-remove-outline
</v-icon>
</v-btn>
<v-btn 
v-if="item.v_patch_status === 'patched_audit'"
text 
small
>
<v-icon x-small>
	mdi-shield-sync-outline
</v-icon>
</v-btn>
<v-btn 
v-if="item.v_patch_status === 'patched_enforce'"
text 
small
>
<v-icon x-small>
	mdi-shield-check-outline
</v-icon>
</v-btn>
<!--v-chip :color="getColor(item.calories)" dark>{{ item.calories }}</v-chip-->
</template>
</v-data-table>
</v-card>
</template>
<script>
	import Loading from 'vue-loading-overlay'
	import 'vue-loading-overlay/dist/vue-loading.css'
	import moment from 'moment'

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
					text: 'Comments',
					align: 'start',
					value: 'ack_comment',
					groupable: false,
					sortable: false
				},
				{
					text: 'Scope',
					align: 'start',
					value: 'ack_scope',
					groupable: false,
					sortable: false
				},
				{
					text: 'Acknowledged',
					align: 'start',
					value: 'acknowledged_date',
					groupable: false,
					sortable: false
				},
				{
					text: 'Expires',
					align: 'start',
					value: 'ack_expiration_days',
					groupable: false,
					sortable: false
				},
        {
          text: 'Image',
          align: 'start',
          value: 'image_name'
        },
        {
          text: 'Workload',
          align: 'start',
          value: 'image_workload_info',
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
         text: 'Vshield',
         value: 'v_patch_status',
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
       moment: moment,
       search: ''
     }
   },
   props: ['risks', 'title'],
   components: {
     Loading
   },
   computed: {
     riskTableLoading () {
      return false
    },
    critCount () {
      return this.risks.filter(function(obj) {
       return obj.aqua_severity === 'critical'
     }).length
    },
    highCount () {
      return this.risks.filter(function(obj) {
       return obj.aqua_severity === 'high'
     }).length
    },
    medCount () {
      return this.risks.filter(function(obj) {
       return obj.aqua_severity === 'medium'
     }).length
    }
  },
  methods: {

  }
}
</script>