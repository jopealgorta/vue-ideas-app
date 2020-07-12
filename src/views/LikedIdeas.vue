<template>
  <div class="home">
    <v-snackbar top v-model="snackbar" timeout="4000">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <h1 class="px-3 grey--text">Ideas que me gustan</h1>
    <Idea :ideas="ideas" :likedIdeas="likedIdeas" />
  </div>
</template>

<script>
import Idea from "../components/Idea";
import axios from "axios";
export default {
  name: "LikedIdeas",
  components: { Idea },
  data: () => ({
    text: "",
    snackbar: false,
    ideas: [],
    likedIdeas: []
  }),
  async created() {
    try {
      const response = await axios(
        `api/users/${this.$root.user.id}/liked?popu=1`
      );
      this.ideas = response.data.data.likedIdeas;
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
