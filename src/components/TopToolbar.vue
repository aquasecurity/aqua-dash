<template>
  <div>
  <v-app-bar
    color="#33343E"
    dark
  >
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

    <v-toolbar-title>
      <span class="title ml-3 mr-5" font-color="blue-grey lighten-5">aqua<span class="font-weight-light">.dash</span></span>
    </v-toolbar-title>
    <v-layout
          align-center
          justify-end
      >
      <span class="font-weight-light">Aqua ProServ</span>
    </v-layout>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    absolute
    temporary
  >
    <v-form
      ref="form"
    >
      <span class="title font-weight-light"> Settings </span>
      <v-text-field
        label="Aqua Conole"
        name="aquaApiUrl"
        outlined
        prepend-inner-icon="mdi-api"
        hint="http://aqua.console"
        dense
      >
      </v-text-field>
      <v-text-field
        label="Timeseries Endpoint"
        name="timeseriesApiUrl"
        outlined
        prepend-inner-icon="mdi-api"
        hint="http://timeseries.api"
        dense
      >
      </v-text-field>
      <v-text-field
        label="Username"
        name="username"
        outlined
        prepend-inner-icon="mdi-account"
        dense
      >
      </v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        name="password"
        label="Password"
        hint="At least 8 characters"
        counter
        prepend-inner-icon="mdi-account-key"
        outlined
        @click:append="show1 = !show1"
        dense
      ></v-text-field>
      <v-textarea
        outlined
        name="token"
        label="Access Token"
        prepend-inner-icon="mdi-key"
        rows="2"
        dense
      ></v-textarea>
      <v-text-field
        label="Critical days to fix"
        name="critalDays"
        outlined
        prepend-inner-icon="mdi-calendar-check"
        hint="Recommended 5 to 7 days"
      ></v-text-field>
      <v-text-field
        label="High days to fix"
        name="highDays"
        outlined
        prepend-inner-icon="mdi-calendar-check"
        hint="Recommended 7 to 30 days"
      ></v-text-field>
    </v-form>
  </v-navigation-drawer>
 </div>
</template>


<script>
  export default {
    data: () => ({
      drawer: false,
    }),
  }
</script>
    <!--v-navigation-drawer app v-model="showMenu">
      <SelectCard 
        class="item"
      > </SelectCard>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click.stop="toggleMenu"></v-app-bar-nav-icon>
      
      <span class="title ml-3 mr-5" font-color="blue-grey lighten-5">aqua<span class="font-weight-light">.dash</span></span>

      <v-layout
          align-center
          justify-end
      >
        <span class="font-weight-light">Aqua ProServ</span>
      </v-layout>

    </v-app-bar-->

  
