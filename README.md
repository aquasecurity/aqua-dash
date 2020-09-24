# aqua.dash - Dashboard built upon [Aqua API](https://docs.aquasec.com/reference#aqua-api-overview)

![A screenshot of the Dashboard](https://github.com/aquasecurity/aqua-dash/blob/master/media/image1.png)

Install and run
===============

Github Repo: <https://github.com/sanjay-shah/aqua-dash.git>

Prereqisite
-----------

[NodeJS](https://nodejs.org/en/download/), and npm is required to run this app.


### Ubuntu setup for nodejs and npm

```bash
sudo apt update
sudo apt install nodejs
sudo apt install npm

```

Install / Project setup
-------------

```bash
git clone https://github.com/sanjay-shah/aqua-dash.git
cd aqua-dash
npm install

```

Run / Development: compiles and hot-reloads for development
-----------------------------------------------------

```bash
npm run serve
```

Run / Production: compiles and minifies for production
------------------------------------------------

```bash
npm run build
```

Run / Production: Kubernetes with kubectl
------------------------------------------------

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

![A screen shot of a smart phone Description automatically
generated](media/image2.png){width="1.7667235345581802in"
height="6.008064304461942in"}

Source code 
===========

Source code of this project is under \`src\` directory.

![A screenshot of a cell phone Description automatically
generated](media/image3.png){width="1.7777777777777777in"
height="4.263888888888889in"}

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

![A screen shot of a smart phone Description automatically
generated](media/image4.png){width="2.5403226159230097in"
height="3.5984886264216973in"}

All the API Calls are also made from this file. Thus any API calls
modification will have to be done in this file. Typically, the api call
function is prefixed with **fetch** keyword and is under action: section
of the store. These **actions** can be called from any component. The
app uses **axios** to make any http api calls.

![A screenshot of a cell phone Description automatically
generated](media/image5.png){width="2.620967847769029in"
height="2.3857524059492565in"}

Source code is further subdivided into views, components and plugin.

Views
-----

### Dashboard.vue

The main view Dashboard.vue is in views directory.

![A close up of a sign Description automatically
generated](media/image6.png){width="1.7638888888888888in"
height="1.1805555555555556in"}

If desired, you can change the main layout of GUI here. Dashboard.vue
use component architecture to display GUI. The image, repo and project
selector pane on the left is displayed by the SelectCard.vue under
components folder. Risk Trends(line chart) is rendered by
TimeseriesCard.vue. Vulnerabilities are rendered by VulnCard.vue.
Attention with timelines are on the right by AttentionCard.vue.
TopToolbar is rendered at App.vue level, can be modified to display your
logo etc. by modifying TopToolbar.vue.

![A screenshot of a video game Description automatically
generated](media/image7.tiff){width="6.5in" height="4.0625in"}

Plugins
-------

### vuetify.js

This app uses only one plugin i.e. Vuetify plugin. Any Theming related
or Vuetify related changes can be done in vuetify.js under plugin
directory.

![A close up of a sign Description automatically
generated](media/image8.png){width="1.5416666666666667in"
height="0.8194444444444444in"}

Components
----------

![A picture containing sitting, holding, clock Description automatically
generated](media/image9.png){width="1.1290321522309712in"
height="2.9922812773403327in"}

### AnimatedNumber.vue

This component is responsible for rendering the cosmetic number
animation.

### AttentionCard.vue

This component is responsible for rendering the Attention card on the
right. Any display logic can be changed in this file.

![A screenshot of a cell phone Description automatically
generated](media/image10.png){width="1.2661286089238846in"
height="1.8609142607174103in"}

### BottomNav.vue(not displayed on the dashboard)

If desired, bottom nav can be modified for display logic and uncommented
in the App.vue file.

### DetailAckCard.vue

This component is rendered as a Dialog when a user clicks on the
Acknowledged button. Acknowledged Dialog display logic can be changed
here.

![A close up of a sign Description automatically
generated](media/image11.png){width="0.9435487751531059in"
height="0.8401465441819772in"}

![A screenshot of a video screen Description automatically
generated](media/image12.png){width="6.5in"
height="2.088888888888889in"}

### DetailUnAckCard.vue

This component is rendered as a Dialog when a user clicks on the
Unacknowledged button. Unacknowledged Dialog display logic can be
changed here.

![A picture containing food, drawing Description automatically
generated](media/image13.png){width="1.024194006999125in"
height="0.7727449693788276in"}

![A screenshot of a cell phone Description automatically
generated](media/image14.png){width="6.5in" height="3.86875in"}

### DetailVshieldCard.vue

This component is rendered as a Dialog when a user clicks on the
Vshieded button. Vshieded Dialog display logic can be changed here.

![A sign on the screen Description automatically
generated](media/image15.png){width="0.6451607611548557in"
height="0.8268077427821522in"}

![A screenshot of a video game Description automatically
generated](media/image16.png){width="6.5in"
height="2.970138888888889in"}

### DetailVulnCard.vue

This component is rendered as a Dialog when a user clicks on the
Vulnerabilities button. Vulnerabilities Dialog display logic can be
changed here.

![A close up of a sign Description automatically
generated](media/image17.png){width="1.524194006999125in"
height="0.6745592738407699in"}

![A screenshot of a social media post Description automatically
generated](media/image18.png){width="6.5in"
height="3.692361111111111in"}

### LineChart.vue

This component is a Vue implementation of
[Chart.js](https://www.chartjs.org/). Any timeseries related display
logic can be changed here. For example you only want to display critical
and high vulnerabilities, you can remove the medium data point here. You
can also display the unstacked version of the chart.

![A screenshot of a computer Description automatically
generated](media/image19.png){width="6.5in"
height="3.6798611111111112in"}

### SelectCard.vue

This component is responsible for displaying the select section on the
left. Any display logic can be changed here.

**NOTE: Selecting the Project/Namespace is not implemented yet and does
nothing when selected.**

![A screenshot of a cell phone Description automatically
generated](media/image20.png){width="1.177419072615923in"
height="2.0811679790026245in"}

### SettingsCard.vue

This component is responsible for displaying the settings of the app
when the drawer on the top left is clicked. The settings hold the aqua
console and timeseries API endpoints. It's also used to display login
related data and number to days to fix critical and high
vulnerabilities.

Note: Settings data is stored in the browser local storage.

![A picture containing drawing Description automatically
generated](media/image21.png){width="1.43125in"
height="0.41606080489938757in"}

![A screenshot of a cell phone Description automatically
generated](media/image22.png){width="1.431943350831146in"
height="3.1612904636920387in"}

### TimeseriesCard.vue

This component encapsulates the LineChart.vue and only provides
cosmetics to the LineChart like Card title, image and repo name etc.

### TopToolbar.vue

This component is responsible for displaying the top navigation logo and
tools. It contains the display logic (show/hide) for SettingsCard.vue

![](media/image23.png){width="3.7177416885389327in"
height="0.3456408573928259in"}

### VulnCard.vue

This is one of the most **important** components of this app. It
contains the display logic and also correlation logic of Image
Vulnerabilities and Risk data. This could be the file you might find
yourself changing the most.

![A close up of a logo Description automatically
generated](media/image24.png){width="6.5in"
height="0.8833333333333333in"}


# aqua-dash

## Project setup
```
git clone https://github.com/sanjay-shah/aqua-dash.git
cd aqua-dash
npm install
```
### Dependecies
A separate implementation of Timeseries API is required to populate the graps and charts.
Here's sample reference implementaion of [Aqua Timeseries API](https://github.com/sanjay-shah/aqua-timeseries-api).

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize Vuejs configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
