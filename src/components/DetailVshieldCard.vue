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
<template v-slot:item.nvd_url="{ item }">
  <v-btn 
  :href="item.nvd_url"
  text 
  small
  dense
  >nvd</v-btn>
</template>
<template v-slot:item.v_patch_enforced_on="{ item }">
  {{item.v_patch_enforced_on?moment(item.v_patch_enforced_on).fromNow():''}}
</template>
<template v-slot:item.v_patch_applied_on="{ item }">
  {{moment(item.v_patch_applied_on).fromNow()}}
</template>
<template v-slot:item.first_found_date="{ item }">
  <div
    v-if="item.aqua_severity === 'critical'"
  >
    {{moment(item.first_found_date).add(criticalAge, 'days').fromNow()}}
  </div>
  <div
    v-if="item.aqua_severity === 'high'"
  >
    {{moment(item.first_found_date).add(highAge, 'days').fromNow()}}
  </div>
</template>
<template v-slot:item.v_patch_status="{ item }">
 <div 
 v-if="item.v_patch_status === 'patched_audit'"
 >
 Audit
</div>
<div 
v-if="item.v_patch_status === 'patched_enforce'"
>
Enforce
</div>
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
          text: 'Vshield',
          value: 'v_patch_status',
          align: 'right'
        },
        {
          text: 'Applied on',
          align: 'start',
          value: 'v_patch_applied_on',
          groupable: false,
          sortable: false
        },
        {
          text: 'Applied by',
          align: 'start',
          value: 'v_patch_applied_by',
          groupable: false,
          sortable: false
        },
        {
          text: 'Enforced on',
          align: 'start',
          value: 'v_patch_enforced_on',
          groupable: false,
          sortable: false
        },
        {
          text: 'Enforced by',
          align: 'start',
          value: 'v_patch_enforced_by',
          groupable: false,
          sortable: false
        },
        { 
          text: 'Remediation Available',
          value: 'solution',
          align: 'left',
          groupable: false,
          sortable: false
        },
        { 
          text: 'Fix due in',
          value: 'first_found_date',
          align: 'left',
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
    },
    criticalAge () {
      return this.$store.getters.criticalAge
    },
    highAge () {
      return this.$store.getters.highAge
    }
  },
  methods: {

  }
}
</script>