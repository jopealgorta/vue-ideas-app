<template>
  <div class="home">
    <v-snackbar top v-model="snackbar" timeout="4000">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <Idea :ideas="ideas" :likedIdeas="likedIdeas" />
  </div>
</template>

<script>
import Idea from "../components/Idea";
import axios from "axios";
export default {
  name: "Home",
  components: { Idea },
  data: () => ({
    text: "",
    snackbar: false,
    ideas: [],
    likedIdeas: []
  }),
  async created() {
    try {
      const response = await axios("api/ideas");
      this.ideas = response.data.data.ideas;
    } catch (err) {
      this.snackbar = true;
      this.text = err.response.data.message;
    }
    try {
      const response = await axios(`api/users/${this.$root.user.id}/liked`);
      this.likedIdeas = response.data.data.likedIdeas;
    } catch (err) {
      this.snackbar = true;
      this.text = err.response.data.message;
    }
  }
};
</script>
