# fitness-app

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Dependencies
- firestore
- moment
- vue-calendar-heatmap

## Focus
1. If user workout multiple times a day, by default heatmap only counts duration of the last exercise, need use ```reduce``` method to loop array to count total duration.
