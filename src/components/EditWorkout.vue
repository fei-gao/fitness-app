<template>
  <div class="container">
    <h3>Edit {{this.$route.params.category}}</h3>
    <table class="striped center">
      <thead>
        <tr>
          <th>Date</th>
          <th>Duration(min)</th>
          <th>Distance(km)</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(list, index) in lists" :key="index">
          <td>{{list.timestamp}}</td>
          <td>{{list.duration}}</td>
          <td>{{list.distance}}</td>
          <td>{{list.description}}</td>
          <td>
            <i class="material-icons delete" @click="deleteWorkout(list.id)">delete</i>
            <router-link :to="{name: 'UpdateWorkout', params:{id: list.id}}">
              <i class="material-icons edit green-text darken-3">edit</i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import db from "@/firebase/init";
import moment from "moment";

export default {
  data() {
    return {
      lists: []
    };
  },
  methods: {
    // get all workouts under this category
    getThisCategory() {
      let tempLists = [];
      db.collection("workouts")
        .orderBy("timestamp")
        .get()
        .then(workouts => {
          workouts.forEach(workout => {
            if (workout.data().category == this.$route.params.category) {
              tempLists.push({
                id: workout.id,
                category: workout.data().category,
                duration: workout.data().duration,
                distance: workout.data().distance,
                description: workout.data().description,
                timestamp: moment(workout.data().timestamp).format("ll")
              });
            }
          });
        });
      let reversed = tempLists.reverse();
      this.lists = reversed;
    },
    deleteWorkout(id) {
      // delete doc from firestore
      db.collection("workouts")
        .doc(id)
        .delete()
        // delete list locally
        .then(() => {
          this.lists = this.lists.filter(list => {
            return list.id != id;
          });
        });
    }
  },
  created() {
    this.getThisCategory();
  }
};
</script>
