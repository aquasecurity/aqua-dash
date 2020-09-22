<template>
	<v-form
      ref="form"
  >
    <v-alert
      v-if="error"
      dense
      type="error"
      dismissible
    >
      {{errorText}}
    </v-alert>
    <span class="title font-weight-light"> Settings </span>
    <v-text-field
      label="Aqua Endpoint"
      name="aquaApi"
      v-model="settings.aquaApi"
      outlined
      prepend-inner-icon="mdi-api"
      hint="http://aqua.console"
      dense
    >
    </v-text-field>
    <v-text-field
      label="Timeseries Endpoint"
      name="timeseriesApi"
      v-model="settings.timeseriesApi"
      outlined
      prepend-inner-icon="mdi-api"
      hint="http://timeseries.api"
      dense
    >
    </v-text-field>
    <v-text-field
      label="Username"
      name="username"
      v-model="settings.userName"
      hint="Aqua console username"
      outlined
      prepend-inner-icon="mdi-account"
      dense
    >
    </v-text-field>
    <v-text-field
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      name="password"
      label="Password"
      v-model="settings.password"
      hint="Aqua console password"
      prepend-inner-icon="mdi-account-key"
      outlined
      @click:append="showPassword = !showPassword"
      dense
    ></v-text-field>
    <!--v-textarea
      outlined
      name="accessToken"
      v-model="settings.accessToken"
      label="Access Token"
      prepend-inner-icon="mdi-key"
      rows="2"
      dense
    ></v-textarea-->
    <v-text-field
      label="Critical days to fix"
      name="critalDays"
      v-model="settings.criticalAge"
      outlined
      prepend-inner-icon="mdi-calendar-check"
      hint="Recommended 5 to 7 days"
    ></v-text-field>
    <v-text-field
      label="High days to fix"
      name="highDays"
      v-model="settings.highAge"
      outlined
      prepend-inner-icon="mdi-calendar-check"
      hint="Recommended 7 to 30 days"
    ></v-text-field>
    <v-checkbox
      v-model="settings.rememberMe"
      :label="rememberMeText"
      dense
    ></v-checkbox>
    <v-layout
      align-center
      justify-end
    >
		<v-btn 
			rounded 
			outlined 
			color="secondary" 
			dark
      :loading="saveLoading"
      :disabled="saveLoading"
      v-on:click="save"
		>Save</v-btn> 
    <v-btn 
      rounded 
      outlined 
      color="primary" 
      dark
      :loading="saveAndGoLoading"
      :disabled="saveAndGoLoading"
      v-on:click="saveAndGo"
    >Login</v-btn>
    </v-layout>
  </v-form>
</template>
<script>
  import {mapActions} from 'vuex'
	export default {
		data: () => ({
			settings: {},
			showPassword: false,
      saveLoading: false,
      saveAndGoLoading: false,
      error: false,
      errorText: null,
      rememberMeText: 'Remember me for 30 days'
		}),
		created: function () {
			this.settings.aquaApi = this.$store.getters.aquaApi
      this.settings.timeseriesApi = this.$store.getters.timeseriesApi
      this.settings.userName = this.$store.getters.userName
      this.settings.password = this.$store.getters.password
      this.settings.accessToken = this.$store.getters.accessToken
      this.settings.criticalAge = this.$store.getters.criticalAge
      this.settings.highAge = this.$store.getters.highAge
      this.settings.rememberMe = this.$store.getters.rememberMe
		},
		methods: {
      ...mapActions([
        'saveSettings',
        'fetchAccessToken',
        'fetchNamespaces',
        'fetchRegistries',
        'fetchImages',
        'fetchVulnAck',
        'fetchTimeseriesData'
      ]),
			async save () {
        this.saveLoading = true
        await this.saveSettings(this.settings)
        this.saveLoading = false
			},
      async saveAndGo () {
        try {
          this.error = false
          this.saveAndGoLoading = true
          console.log('saveAndGo...')
          await this.save()
          await this.fetchAccessToken()
          await this.fetchNamespaces()
          await this.fetchRegistries()
          await this.fetchImages('All Registries')
          this.fetchVulnAck()
          this.fetchTimeseriesData()
          console.log('saveAndGo... complete!')
        } catch (err) {
          console.log(err)
          this.error = true
          this.errorText = 
            '[' + err.response.data.code + '] '
            + err.response.data.message
        } finally {
          this.saveAndGoLoading = false
        }
      }
		}
	}
</script>