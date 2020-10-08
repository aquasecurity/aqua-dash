# aqua.dash - Dashboard built upon [Aqua API](https://docs.aquasec.com/reference#aqua-api-overview)

![A screenshot of the Dashboard](https://github.com/aquasecurity/aqua-dash/blob/master/media/image1.png)

Install and run
===============

Github Repo: <https://github.com/aquasecurity/aqua-dash.git>

Prereqisite
-----------

[NodeJS](https://nodejs.org/en/download/), and npm is required to run this app.
Sample [Timeseries API](https://github.com/sanjay-shah/aqua-timeseries-api) implementation is required for the charts to work properly.


### Ubuntu setup for nodejs and npm

```bash
sudo apt update
sudo apt install nodejs
sudo apt install npm

```

Install / Project setup
-------------

```bash
git clone https://github.com/aquasecurity/aqua-dash.git
cd aqua-dash
npm install

```

Run / Development: compiles and hot-reloads for development
-----------------------------------------------------

```bash
npm run serve
```

Build / Production: compiles and minifies for production
------------------------------------------------

```bash
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize Vuejs configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


Deploy / Production: Kubernetes with kubectl
------------------------------------------------
Edit [Ingress](https://github.com/aquasecurity/aqua-dash/blob/master/k8s/aqua-dash-web-ingress.yaml#L10) and replace example.com with your domain name.

```bash
kubectl apply -f ./k8s
```

Introduction
============

This app is built on [Vue](https://vuejs.org/) and
[Vuex](https://vuex.vuejs.org/). The app uses
[Vuetify](https://vuetifyjs.com/) Material Design Component Framework
which is a direct implementation of Googles [Material
Design](https://material.io/)

[Rally](https://material.io/design/material-studies/rally.html) theme of
[Material
Studies](https://material.io/design/material-studies/about-our-material-studies.html)
is used because it's great match for any apps that displays a lot of
Numbers, Charts and Graphs.

Project Structure
=================

![screenshot](media/image2.png)

Source code 
===========

Source code of this project is under \`src\` directory.

![screenshot](media/image3.png)

App.vue 
-------

App.vue is the main entry point for displaying the app. This file only
uses TopToolbar.vue and router-view. Dashboard is served as a root view
for the app. See the router.js for more details.

main.js
-------

This file is main entry point for loading the App. This is the file that
gets loaded before any file. It contains the logic to load data from the
*browser local storage*.

router.js
---------

This is the file where client/browser side route is defined. The root or
"/" route defaults to display the Dashboard component. There another
route for About page is also defined if one chooses to display the About
information.

store.js (most important code)
------------------------------

This file is responsible for the browser state management and is an
implementation of Vuex. All the state variable is defined here and is
accessible by any component of the App.

![A screen shot](media/image4.png)

All the API Calls are also made from this file. Thus any API calls
modification will have to be done in this file. Typically, the api call
function is prefixed with **fetch** keyword and is under action: section
of the store. These **actions** can be called from any component. The
app uses **axios** to make any http api calls.

![A screenshot](media/image5.png)

Source code is further subdivided into views, components and plugin.

Views
-----

### Dashboard.vue

The main view Dashboard.vue is in views directory.

![screenshot](media/image6.png)

If desired, you can change the main layout of GUI here. Dashboard.vue
use component architecture to display GUI. The image, repo and project
selector pane on the left is displayed by the SelectCard.vue under
components folder. Risk Trends(line chart) is rendered by
TimeseriesCard.vue. Vulnerabilities are rendered by VulnCard.vue.
Attention with timelines are on the right by AttentionCard.vue.
TopToolbar is rendered at App.vue level, can be modified to display your
logo etc. by modifying TopToolbar.vue.

![A screenshot](media/image7.tiff)

Plugins
-------

### vuetify.js

This app uses only one plugin i.e. Vuetify plugin. Any Theming related
or Vuetify related changes can be done in vuetify.js under plugin
directory.

![screenshot](media/image8.png)

Components
----------

![screenshot](media/image9.png)

### AnimatedNumber.vue

This component is responsible for rendering the cosmetic number
animation.

### AttentionCard.vue

This component is responsible for rendering the Attention card on the
right. Any display logic can be changed in this file.

![screenshot](media/image10.png)

### BottomNav.vue(not displayed on the dashboard)

If desired, bottom nav can be modified for display logic and uncommented
in the App.vue file.

### DetailAckCard.vue

This component is rendered as a Dialog when a user clicks on the
Acknowledged button. Acknowledged Dialog display logic can be changed
here.

![screenshot](media/image11.png)

![screenshot](media/image12.png)

### DetailUnAckCard.vue

This component is rendered as a Dialog when a user clicks on the
Unacknowledged button. Unacknowledged Dialog display logic can be
changed here.

![screenshot](media/image13.png)

![screenshot](media/image14.png)

### DetailVshieldCard.vue

This component is rendered as a Dialog when a user clicks on the
Vshieded button. Vshieded Dialog display logic can be changed here.

![screenshot](media/image15.png)

![screenshot](media/image16.png)

### DetailVulnCard.vue

This component is rendered as a Dialog when a user clicks on the
Vulnerabilities button. Vulnerabilities Dialog display logic can be
changed here.

![screenshot](media/image17.png)

![screenshot](media/image18.png)

### LineChart.vue

This component is a Vue implementation of
[Chart.js](https://www.chartjs.org/). Any timeseries related display
logic can be changed here. For example you only want to display critical
and high vulnerabilities, you can remove the medium data point here. You
can also display the unstacked version of the chart.

![screenshot](media/image19.png)

### SelectCard.vue

This component is responsible for displaying the select section on the
left. Any display logic can be changed here.

**NOTE: Selecting the Project/Namespace is not implemented yet and does
nothing when selected.**

![screenshot](media/image20.png)

### SettingsCard.vue

This component is responsible for displaying the settings of the app
when the drawer on the top left is clicked. The settings hold the aqua
console and timeseries API endpoints. It's also used to display login
related data and number to days to fix critical and high
vulnerabilities.

Note: Settings data is stored in the browser local storage.

![screenshot](media/image21.png)

![screenshot](media/image22.png)

### TimeseriesCard.vue

This component encapsulates the LineChart.vue and only provides
cosmetics to the LineChart like Card title, image and repo name etc.

### TopToolbar.vue

This component is responsible for displaying the top navigation logo and
tools. It contains the display logic (show/hide) for SettingsCard.vue

![screenshot](media/image23.png)

### VulnCard.vue

This is one of the most **important** components of this app. It
contains the display logic and also correlation logic of Image
Vulnerabilities and Risk data. This could be the file you might find
yourself changing the most.

![screenshot](media/image24.png)

