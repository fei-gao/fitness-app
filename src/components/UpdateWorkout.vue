<template>
  <div class="container">
    <h3>Update {{workout.category}}</h3>
    <form @submit.prevent="updateWorkout" class="update-form card center-align">
      <div class="field">
        <label for="category">Category:</label>
        <input type="text" name="category" v-model="workout.category">
      </div>
      <div class="field">
        <label for="duration">Duration(min):</label>
        <input type="text" name="duration" v-model="workout.duration">
      </div>
      <div class="field">
        <label for="distance">Distance(km):</label>
        <input type="text" name="distance" v-model="workout.distance">
      </div>
      <div class="field">
        <label for="description">Description:</label>
        <input type="text" name="description" v-model="workout.description">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn lime accent-4">Update Workout</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  data() {
    return {
      workout: null,
      feedback: null
    };
  },
  methods: {
    getWorkout() {
      db.collection("workouts")
        .doc(this.$route.params.id)
        .get()
        .then(snapshot => (this.workout = snapshot.data()));
    },
    updateWorkout() {
      // check both category and duration field is not empty
      if (!this.workout.category || !this.workout.duration) {
        this.feedback = "Both category and duration field need to be filled.";
      } else {
        this.feedback = null;
        db.collection("workouts")
          .doc(this.$route.params.id)
          .update({
            category: this.workout.category,
            duration: this.workout.duration,
            distance: this.workout.distance,
            description: this.workout.description,
            timestamp: this.workout.timestamp
          })
          .then(() => {
            this.$router.push({
              name: "EditWorkout",
              params: { category: this.workout.category }
            });
          })
          .catch(err => console.log(err));
      }
    }
  },
  created() {
    this.getWorkout();
  }
};
</script>

<style>
.update-form {
  max-width: 400px;
  margin: 100px auto;
}
</style>


