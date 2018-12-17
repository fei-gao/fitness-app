<template>
  <div class="index container">
    <ul class="categories">
      <li v-for="(category,index) in categories" :key="index">
        <router-link
          :to="{name: 'EditWorkout', params:{category: category}}"
          class="chip waves-effect waves-light btn"
        >{{category}}</router-link>
      </li>
    </ul>
    <Heatmap/>
  </div>
</template>

<script>
import db from "@/firebase/init";
import Heatmap from "@/components/Heatmap";

export default {
  name: "Index",
  components: {
    Heatmap
  },
  data() {
    return {
      categories: []
    };
  },
  methods: {
    getCategories() {
      let tempCat = [];
      db.collection("workouts")
        .get()
        .then(workouts => {
          workouts.forEach(workout => {
            let singleCat = workout.data().category;
            if (tempCat.indexOf(singleCat) == -1) {
              tempCat.push(singleCat);
            }
          });
          this.categories = tempCat;
        });
    }
  },
  created() {
    this.getCategories();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
