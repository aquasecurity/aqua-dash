<template>
  <v-card
    tile
    elevation="0"
    class="rounded-card"
    width="80%"
    height="auto"
  >
    <div>
      <v-layout
        align-center
      >
        <v-col>
          Projects/namespaces
          <v-overflow-btn
            class="projects"
            :items="projects"
            label="Select Project"
            hint="Not implemented yet."
          ></v-overflow-btn>

          Repos
          <v-overflow-btn
            class="registries"
            :items="registries"
            label="Select Repo"
            v-model="repoSelected"
            v-on:change="handleRepoSelection"
          ></v-overflow-btn>

          Images
          <v-overflow-btn
            class="images"
            :items="images"
            label="Select Image"
            v-model="imageSelected"
            v-on:change="handleImageSelection"
          ></v-overflow-btn>
        </v-col>
      </v-layout>
    </div>
  </v-card>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data: () => ({
    polling: null,
    imageSelected: null,
    repoSelected: null
  }),
  computed: {
    user () {
      return "administrator"
    },
    projects () {
      return this.$store.getters.namespaces
    },
    registries () {
      return this.$store.getters.registries
    },
    images () {
      return this.$store.getters.imagesText
    }
  },
  async mounted () {
    this.pollData()
  },
  beforeDestroy () {
    clearInterval(this.polling)
  },
  methods: {
    ...mapActions([
      'fetchNamespaces',
      'fetchRegistries',
      'fetchImages',
      'fetchTimeseriesData',
      'fetchRisks',
      'selectImage',
      'selectRepo'
    ]),
    pollData () {
      this.polling = setInterval(() => {
        console.log('polling for namespaces and registries...')
        this.fetchNamespaces()
        this.fetchRegistries()
      }, 60000)
    },
    handleImageSelection() {
      this.selectImage(this.imageSelected)
      this.fetchTimeseriesData()
      this.fetchRisks()
    },
    handleRepoSelection() {
      this.selectRepo(this.repoSelected)
      this.fetchImages(this.repoSelected)
      this.fetchTimeseriesData()
    }

  }
}
</script>

<style>
.rounded-card{
  border-radius:15px;
}
</style>
