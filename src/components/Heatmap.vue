<template>
  <div class="heatmap">
    <h6>Fitness Calendar</h6>
    <calendar-heatmap
      :values="options.values"
      :end-date="options.endDate"
      :range-color="options.rangeColor"
      :max="options.max"
      :vertical="options.vertical"
      :tooltip-unit="options.unit"
    />
  </div>
</template>

<script>
import moment from "moment";
import db from "@/firebase/init";

export default {
  name: "Heatmap",
  data() {
    return {
      options: {
        values: [],
        endDate: "2018-12-31",
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
        unit: "minutes"
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
            // here we get right date from timestamp, but I think the heatmap always shifted one day ahead, to color the correct date we delay one day on local variable, however the timestamp on firestore is corrected and untouched.
            singleWorkout.date = moment(workout.data().timestamp + 24 * 3600000)
              .format()
              .slice(0, 10);
            singleWorkout.count = workout.data().duration;
            tempValues.push(singleWorkout);
          });
          this.options.values = tempValues;
        });
    }
  },
  created() {
    this.getValues();
  }
};
</script>

<style>
.heatmap {
  margin: 10px auto;
  width: 95vw;
}
</style>

