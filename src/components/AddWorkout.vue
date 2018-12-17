<template>
  <div class="container">
    <h2>Add Workout</h2>
    <form @submit.prevent="addWorkout" class="card center-align">
      <div class="field">
        <label for="category">Category:</label>
        <input type="text" name="category" v-model="category">
      </div>
      <div class="field">
        <label for="duration">Duration(min):</label>
        <input type="text" name="duration" v-model="duration">
      </div>
      <div class="field">
        <label for="distance">Distance(km):</label>
        <input type="text" name="distance" v-model="distance">
      </div>
      <div class="field">
        <label for="description">Description:</label>
        <input type="text" name="description" v-model="description">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn lime accent-4">Add Workout</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import moment from "moment";

export default {
  name: "AddWorkout",
  data() {
    return {
      category: null,
      duration: null,
      distance: null,
      description: null,
      feedback: null
    };
  },
  methods: {
    addWorkout() {
      // check both category and duration field is not empty
      if (!this.category || !this.duration) {
        this.feedback = "Both category and duration field need to be filled.";
      } else {
        this.feedback = null;
        db.collection("workouts")
          .add({
            category: this.category,
            duration: this.duration,
            distance: this.distance,
            description: this.description,
            timestamp: Date.now()
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => console.log(err));
      }
    }
  }
};
</script>

<style>
.container .center {
  max-width: 200px;
  margin-top: 50px;
}
</style>


