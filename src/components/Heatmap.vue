<template>
  <div class="center">
    <h3>Fitness Calendar</h3>
<calendar-heatmap :values="options.values" :end-date="options.endDate" :range-color="options.rangeColor" :max="options.max" :vertical="options.vertical" :tooltip-unit="options.unit"/>
  </div>
</template>

<script>
import moment from "moment"
import db from "@/firebase/init";

export default {
  name:'Heatmap',
  data() {
    return {
      options: {
        values: [],
        endDate: '2018-12-31',
        rangeColor: [
          "#eceff1",
          "#ccff90",
          "#b2ff59",
          "#76ff03",
          "#64dd17",
          "#33691e"
        ],
        max: 60,
        vertical: false,
        unit: 'minutes'
      }
    };
  },
  methods: {
    // get date and duration of each workout to render heatmap
    getValues() {
      let tempValues = [];
      db.collection("workouts")
        .get()
        .then(workouts => {
          workouts.forEach(workout => {
            let singleWorkout = {};
            singleWorkout.date = moment(workout.data().timestamp).format().slice(0, 10);
            singleWorkout.count = workout.data().duration;
            tempValues.push(singleWorkout);
            })
          this.options.values = tempValues;
          })
        }
  },
  created() {
    this.getValues();
  }
};
</script>
