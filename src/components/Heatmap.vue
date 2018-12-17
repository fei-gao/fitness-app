<template>
  <div>
    <h1>Heatmap</h1>
    <calendar-heatmap
      :values="[{ date: '2018-6-22', count: 150 },{ date: '2018-3-22', count: 50 }]"
      end-date="2018-12-30"
      :range-color="['ebedf0', 'dae2ef', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e']"
      :max="100"
    />
  </div>
</template>