import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'

// Function to compute timestamp 
// from mongodb's document _id 
function getTimestamp (objectId) {
  return moment(
    new Date(
      parseInt(objectId.substring(0, 8), 16) * 1000)
  ).format('DD-MM-YY HH:mm')
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initRequired: false,
    aquaApi: null,
    timeseriesApi: null,
    userName: null,
    password: null,
    accessToken: null,
    criticalAge: null,
    highAge: null,
    rememberMe: null,
    namespaces: [],
    registries: [],
    imagesText: [],
    images: [],
    vulnCount: 0,
    vulnAck: [],
    vulnUnAck: 0,
    vulnCritical: 0,
    vulnHigh: 0,
    vulnMedium: 0,
    vulnLow: 0,
    imageSelected: null,
    repoSelected: null,
    timeseriesData: null,
    from: moment().subtract(60, 'days'),
    to: moment(),
    risks: [],
    riskTableLoading: false,
    allRisks: []
  },
  getters: {
    initRequired (state) {
      return state.initRequired
    },
    aquaApi (state) {
      return state.aquaApi
    },
    timeseriesApi (state) {
      return state.timeseriesApi
    },
    userName (state) {
      return state.userName
    },
    password (state) {
      return state.password
    },
    accessToken (state) {
      return state.accessToken
    },
    criticalAge (state) {
      return state.criticalAge
    },
    highAge (state) {
      return state.highAge
    },
    rememberMe (state) {
      return state.rememberMe
    },
    namespaces (state) {
      return state.namespaces
    },
    registries (state) {
      return state.registries
    },
    imagesText (state) {
      return state.imagesText
    },
    images (state) {
      return state.images
    },
    vulnCount (state) {
      return state.vulnCount
    },
    vulnAck (state) {
      return state.vulnAck
    },
    vulnUnAck (state) {
      return state.vulnUnAck
    },
    vulnCritical (state) {
      return state.vulnCritical
    },
    vulnHigh (state) {
      return state.vulnHigh
    },
    vulnMedium (state) {
      return state.vulnMedium
    },
    vulnLow (state) {
      return state.vulnLow
    },
    imageSelected (state) {
      return state.imageSelected
    },
    repoSelected (state) {
      return state.repoSelected
    },
    timeseriesData (state) {
      return state.timeseriesData
    },
    risks (state) {
      return state.risks
    },
    riskTableLoading (state) {
      return state.riskTableLoading
    },
    allRisks (state) {
      return state.allRisks
    }
  },
  mutations: {
    INITIALIZE_STORE (state) {
      state.aquaApi 
        = localStorage.getItem('aquaApi')
      state.timeseriesApi 
        = localStorage.getItem('timeseriesApi')
      state.userName 
        = localStorage.getItem('userName')
      state.accessToken
        = localStorage.getItem('accessToken')
      state.criticalAge
        = localStorage.getItem('criticalAge') || 7
      state.highAge
        = localStorage.getItem('highAge') || 30
      state.rememberMe = (localStorage.getItem('rememberMe') === 'true' ? true : false)
      
      if (
        !state.aquaApi || 
        !state.timeseriesApi || 
        !state.userName || 
        !state.accessToken
      ) {
        state.initRequired = true
      }
    },
    SET_AQUA_API (state, aquaApi) {
      state.aquaApi = aquaApi
      localStorage.setItem('aquaApi', aquaApi)
    },
    SET_TIMESERIES_API (state, timeseriesApi) {
      state.timeseriesApi = timeseriesApi
      localStorage.setItem('timeseriesApi', timeseriesApi)
    },
    SET_USERNAME (state, userName) {
      state.userName = userName
      localStorage.setItem('userName', userName)
    },
    SET_PASSWORD (state, password) {
      state.password = password
      //localStorage.setItem('password', password)
    },
    SET_ACCESS_TOKEN (state, accessToken) {
      state.accessToken = accessToken
      localStorage.setItem('accessToken', (state.rememberMe ? accessToken : ''))
    },
    SET_CRITICAL_FIX (state, criticalAge) {
      state.criticalAge = criticalAge
      localStorage.setItem('criticalAge', criticalAge)
    },
    SET_HIGH_FIX (state, highAge) {
      state.highAge = highAge
      localStorage.setItem('highAge', highAge)
    },
    SET_REMEMBER_ME (state, rememberMe) {
      state.rememberMe = rememberMe
      localStorage.setItem('rememberMe', rememberMe)
    },
    SET_NAMESPACES (state, namespaces) {
      if (namespaces) {
        state.namespaces = namespaces
      }
    },
    SET_REGISTRIES (state, registries) {
      if (registries) {
        state.registries = registries
      }
    },
    SET_IMAGES_TEXT (state, imagesText) {
      if (imagesText) {
        state.imagesText = imagesText
      }
    },
    SET_IMAGES (state, images) {
      if (images) {
        state.images = images
      }
    },
    SET_VULN_COUNT (state, vulnCount) {
      if (vulnCount) {
        state.vulnCount = vulnCount
      }
    },
    SET_VULN_ACK (state, vulnAck) {
      if (vulnAck) {
        state.vulnAck = vulnAck
      }
    },
    SET_VULN_UNACK (state, vulnUnAck) {
      if (vulnUnAck) {
        state.vulnUnAck = vulnUnAck
      }
    },
    SET_VULN_SEV (state, vulnSev) {
      if (vulnSev.severity === 'critical') {
        state.vulnCritical = vulnSev.count
      } else if (vulnSev.severity === 'high') {
        state.vulnHigh = vulnSev.count
      } else if (vulnSev.severity === 'medium') {
        state.vulnMedium = vulnSev.count
      } else if (vulnSev.severity === 'low') {
        state.vulnLow = vulnSev.count
      }
    },
    SET_IMAGE_SELECTED (state, imageSelected) {
      if (imageSelected) {
        state.imageSelected = imageSelected
      }
    },
    SET_REPO_SELECTED (state, repoSelected) {
      if (repoSelected) {
        state.repoSelected = repoSelected
      }
    },
    SET_TIMESERIES_DATA (state, timeseriesData) {
      if (timeseriesData) {
        state.timeseriesData = timeseriesData
      }
    },
    SET_RISKS (state, risks) {
      if (risks) {
        state.risks = risks
      }
    },
    SET_RISK_TABLE_LOADING (state, riskTableLoading) {
      if (riskTableLoading) {
        state.riskTableLoading = riskTableLoading
      }
    },
    CONCAT_ALL_RISKS (state, risks) {
      if (risks) {
        state.allRisks = [...state.allRisks, ...risks]
      }
    }
  },
  actions: {
    async initializeStore ({commit}) {
      console.log('initializeStore called')
      await commit('INITIALIZE_STORE')
    },
    async saveSettings ({commit}, settings) {
      await commit('SET_AQUA_API', settings.aquaApi)
      await commit('SET_TIMESERIES_API', settings.timeseriesApi)
      await commit('SET_USERNAME', settings.userName)
      await commit('SET_PASSWORD', settings.password)
      await commit('SET_ACCESS_TOKEN', settings.accessToken)
      await commit('SET_CRITICAL_FIX', settings.criticalAge)
      await commit('SET_HIGH_FIX', settings.highAge)
      await commit('SET_REMEMBER_ME', settings.rememberMe)
    },
    async fetchAccessToken ({commit, state}) {
      console.log('fetch accessToken:::::')
      //console.log(state.userName)
      //console.log(state.password)
      let loginSettings = {}
      loginSettings.id = state.userName
      loginSettings.password = state.password
      loginSettings.remember = state.rememberMe
      let result = await axios.post(
          state.aquaApi + '/api/v1/login', 
          loginSettings
        )
      //console.log(result.data.token)
      await commit('SET_ACCESS_TOKEN', result.data.token)
    },
    async fetchNamespaces ({commit, state}) {
      let tokenString = "Bearer " + state.accessToken
      //console.log('fetchNamespaces token: ' + tokenString)
      let response = await axios.get(state.aquaApi + '/api/v1/orchestrator/namespaces/names?orderby=name%2Basc', 
        { headers: { Authorization: tokenString } 
      })
      console.log('namespaces: ')
      console.log(response.data.result)
      let names = ['All Projects']
      for (var i = 0; i < response.data.result.length; i++) {
        names.push(response.data.result[i].name)
      }
      await commit('SET_NAMESPACES', names)
    },
    async fetchRegistries ({commit, state}) {
      let tokenString = "Bearer " + state.accessToken
      //console.log(tokenString)
      let response = await axios.get(state.aquaApi + '/api/v1/registries', 
        { headers: { Authorization: tokenString } 
      })
      console.log('registries: ')
      console.log(response.data)
      let names = ['All Registries']
      for (var i = 0; i < response.data.length; i++) {
        names.push(response.data[i].name)
      }
      await commit('SET_REGISTRIES', names)
      //console.log(result.data)
    },
    async fetchImages ({commit, state}, repo) {
      let tokenString = "Bearer " + state.accessToken
      /////////////////////////////////////
      //**** PUT LOGIC FOR PAGINATION    //
      //**** TEMP HACK - PAGE_SIZE: 1000 //
      /////////////////////////////////////
      /*
      let response = await axios.get('http://localhost:9090/api/v2/images?registry=Host+Images&page=1&include_totals=true&order_by=name&page_size=1000', 
        { headers: { Authorization: tokenString } 
      })*/
      repo = repo.replace(/ /g, '+')
      console.log('REPO: ')
      console.log(repo)
      let response = null
      if (repo !== 'All+Registries') {
        response = await axios.get(state.aquaApi + '/api/v2/images?registry=' + repo + '&page=1&include_totals=true&order_by=name&page_size=1000', 
          { headers: { Authorization: tokenString } 
        })
      } else {
        response = await axios.get(state.aquaApi + '/api/v2/images?page=1&include_totals=true&order_by=name&page_size=1000', 
          { headers: { Authorization: tokenString } 
        })
      }

      console.log('images: ')
      console.log(response.data.result)

      let names = ['All Images']
      for (var i = 0; response.data.result && i < response.data.result.length; i++) {
        names.push(response.data.result[i].name)
      }
      await commit('SET_IMAGES_TEXT', response.data.result ? names : [])
      await commit('SET_IMAGES', response.data.result ? response.data.result : [])
      //console.log(result.data)
    },
    async fetchAllRisks ({commit, state}) {
      console.log('########fetchAllRisks############')
      let pageSize = 1000
      let tokenString = "Bearer " + state.accessToken
      let vulnResponse = null
      let pageLoop = 1
      for (var i = 0; i < pageLoop; i++) {
        vulnResponse = await axios.get(
          state.aquaApi + '/api/v2/risks/vulnerabilities',
        { 
          headers: { 
            Authorization: tokenString 
          },
          params: {
            include_vpatch_info: 'true',
            page: i + 1,
            pagesize: pageSize,
            skip_count: false,
            hide_base_image: false,
            show_negligible: true,
            order_by: '-aqua_severity'
          }
        })
        if (i === 0) {
          pageLoop = Math.ceil(vulnResponse.data.count/pageSize)
        }
        console.log(`######### pageCount: ${vulnResponse.data.count}`)
        console.log(`######### pageLoop: page ${i + 1} of ${pageLoop}`)
        console.log(`######### riskCount: ${vulnResponse.data.result.length}`)
        await commit('CONCAT_ALL_RISKS', vulnResponse.data.result)
      }
      console.log(`######### allRisks length: ${state.allRisks.length}`)
    },
    async fetchRisks ({commit, state}) {
      //https://testdrive656.aquasec.com/api/v2/images/aquademo/malware-example/latest/malware
      //https://testdrive656.aquasec.com/api/v2/images/aquademo/malware-example/latest/sensitive
      await commit('SET_RISKS', [])
      await commit('SET_RISK_TABLE_LOADING', true)
      let tokenString = "Bearer " + state.accessToken
      let vulnResponse = await axios.get(state.aquaApi + '/api/v2/risks/vulnerabilities', 
        { 
          headers: { 
            Authorization: tokenString 
          },
          params: {
            include_vpatch_info: 'true',
            page: 1,
            pagesize: 1000,
            skip_count: false,
            hide_base_image: false,
            image_name: state.imageSelected,
            show_medium_to_critical: true,
            order_by: '-aqua_severity'
          }
      })
      let riskArray = []
      let riskArrayWithVpatch = []
      //response.data.result ? response.data.result : []
      for (let i = 0; i < vulnResponse.data.result.length; i++) {
        if (vulnResponse.data.result[i].aqua_severity !== 'medium') {
          riskArray.push(vulnResponse.data.result[i])
          if (vulnResponse.data.result[i].v_patch_status === 'patch_available') {
            riskArrayWithVpatch.push(vulnResponse.data.result[i])
          }
        }
      }
      
      console.log('RISKS: ')
      console.log(riskArray)
      let cleansedImageName = state.imageSelected
      cleansedImageName = cleansedImageName.replace(/:/g, '/')
      let malwareResponse = await axios.get(`${state.aquaApi}/api/v2/images/${state.repoSelected}/${cleansedImageName}/malware`, 
      { 
        headers: { 
          Authorization: tokenString 
        }
      })
      console.log('Malware:')
      console.log(malwareResponse.data.result)
      let sensitiveResponse = await axios.get(`${state.aquaApi}/api/v2/images/${state.repoSelected}/${cleansedImageName}/sensitive`, 
      { 
        headers: { 
          Authorization: tokenString 
        }
      })
      console.log('Sensitive:')
      console.log(sensitiveResponse.data.result)
      let malwareObject = {
        name: "Malware",
        aqua_severity: "Malware",
        solution: "Delete these files",
        nvd_url: "https://malware.fix"
      }
      for (let i = 0; i < malwareResponse.data.result.length; i++) {
          malwareObject.description 
            = 'Malware: ' + malwareResponse.data.result[i].malware 
            + ' Path: ' + malwareResponse.data.result[i].paths
          riskArray.push(malwareObject)
      }

      let sensitiveObject = {
        name: "Sensitive",
        aqua_severity: "Sensitive",
        solution: "Delete these files",
        nvd_url: "https://sensitive.fix"
      }
      for (let j = 0; j < sensitiveResponse.data.result.length; j++) {
          sensitiveObject.description 
            = 'Type: ' + sensitiveResponse.data.result[j].type 
            + ' Path: ' + sensitiveResponse.data.result[j].path
          riskArray.push(sensitiveObject)
          console.log('sensitiveObject')
          console.log(sensitiveObject)
      }
      // add id to riskArray
      console.log('Risk Array Length')
      console.log(riskArray.length)
      for (var i = 0; i < riskArray.length; i++) {
        console.log(i)
        riskArray[i].id = i
      }
      console.log('riskArray with malware')
      console.log(riskArray)
      await commit('SET_RISKS', riskArray)
      await commit('SET_RISK_TABLE_LOADING', false)
    },
    async fetchVulnAck ({commit, state}) {
      /////////////////////////////////////
      //**** PUT LOGIC FOR PAGINATION    //
      //**** TEMP HACK - PAGE_SIZE: 1000 //
      //count: X, page: 1, pagesize: 1000//
      /////////////////////////////////////
      let tokenString = "Bearer " + state.accessToken
      let response = await axios.get(state.aquaApi + '/api/v2/risks/vulnerabilities?include_vpatch_info=true&show_negligible=true&page=1&pagesize=1000&skip_count=false&hide_base_image=false&acknowledge_status=true&order_by=-vendor_severity', 
        { headers: { Authorization: tokenString } 
      })
      console.log('fetchVulnAck: ')
      console.log(response.data.result)
      await commit('SET_VULN_ACK', response.data.result)
    },
    async fetchVulnSeverity ({commit, state}, severity) {
      let tokenString = "Bearer " + state.accessToken
      let result = await axios.get(state.aquaApi + '/api/v2/risks/vulnerabilities?include_vpatch_info=true&show_negligible=false&page=1&pagesize=50&skip_count=true&hide_base_image=false&severity=' + severity + '&order_by=-vendor_severity', 
        { headers: { Authorization: tokenString } 
      })
      await commit('SET_VULN_SEV', { 
        severity: severity, 
        count: result.data.result.length 
      })
      console.log(result.data.result.length)
    },
    async selectImage ({commit}, image) {
      await commit('SET_IMAGE_SELECTED', image)
      console.log('Selected Image: ')
      console.log(image)
    },
    async selectRepo ({commit}, repo) {
      await commit('SET_REPO_SELECTED', repo)
      console.log('Selected Repo: ')
      console.log(repo)
    },
    async fetchTimeseriesData ({commit, state}) {
      let imageName = state.imageSelected
      let repoName = state.repoSelected
      let timeseriesData = {}
      console.log('attempting to fetch timeseriesData: ')
      console.log('imageName: ' + imageName)
      console.log('repoName: ' + repoName)
      let response = await axios.get(`${state.timeseriesApi}/risks?from=${state.from}&to=${state.to}&imageName=${imageName}&repoName=${repoName}`)
      console.log('timeseriesData')
      console.log(response.data)
      timeseriesData.critVuln = response.data.map(image => image.critVulns)
      timeseriesData.highVuln = response.data.map(image => image.highVulns)
      timeseriesData.medVuln = response.data.map(image => image.medVulns)
      timeseriesData.labels = response.data.map(image => getTimestamp(image._id))
      await commit('SET_TIMESERIES_DATA', timeseriesData)
    }
  }
})
