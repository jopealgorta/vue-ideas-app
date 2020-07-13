<template>
  <div>
    <template v-for="(idea, i) in ideas">
      <v-card
        @click="goToIdea(idea.id)"
        :key="i"
        flat
        outlined
        class="mx-auto my-2"
        light
        max-width="600"
      >
        <div class="d-flex align-center justify-start mx-4">
          <v-avatar large left class="mr-3" color="grey darken-3">
            <v-img class="elevation-6" :src="`/img/${idea.user.photo}`"></v-img>
          </v-avatar>
          <div>
            <v-card-title>
              <span class="text-body-1 font-weight-light">{{ idea.user.name }}</span>
            </v-card-title>
            <v-card-subtitle class="caption">{{ formatDate(idea.createdAt) }}</v-card-subtitle>
          </div>
        </div>
        <v-card-text class="subtitle-1 font-weight-bold">{{ idea.title }}</v-card-text>
        <v-card-text class="subtitle-2 font-weight-light">{{ idea.summary }}</v-card-text>
        <v-card-actions>
          <v-list-item class="grow">
            <v-row class="px-2">
              <v-list-item-icon color="grey darken-3">
                <v-icon left>{{getCategoryIcon(idea.category)}}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="subtitle-1">{{ idea.category }}</v-list-item-title>
              </v-list-item-content>
              <v-row align="center" justify="end">
                <v-icon class="mr-1">mdi-message</v-icon>
                <span class="subheading mr-2">{{ idea.comments.length }}</span>
                <span class="mr-1">·</span>
                <v-btn icon :color=" like ? 'pink' : ''" @click.stop="putLike(idea.id)">
                  <v-icon class="mr-1">mdi-heart</v-icon>
                </v-btn>
                <span class="subheading mr-2">{{ idea.likeCounter }}</span>
                <span class="mr-1">·</span>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      class="mr-1"
                      v-bind="attrs"
                      v-on="on"
                      @click.stop="goToChat(idea.id)"
                    >mdi-lightbulb-group</v-icon>
                  </template>
                  <span>Unirse al chat</span>
                </v-tooltip>
              </v-row>
            </v-row>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </template>
    <p
      v-if="ideas.length == 0"
      class="ma-4 text-center text-h6 grey--text"
    >No hay ideas disponibles...</p>
  </div>
</template>
<script>
import moment from "moment";
import axios from "axios";
export default {
  props: {
    ideas: Array,
    likedIdeas: Array
  },
  data: () => ({
    like: false
  }),
  methods: {
    formatDate(date) {
      let newDate = new Date(date).toLocaleString();
      return moment(newDate).fromNow();
    },
    goToChat(id) {
      // this.$root.idea = id;
      localStorage.setItem("idea", id);
      this.$router.push(`/chat`);
    },
    goToIdea(id) {
      // this.$root.idea = id;
      localStorage.setItem("idea", id);
      this.$router.push(`/idea`);
    },
    liked(id) {
      this.like = this.likedIdeas.includes(id);
    },
    getCategoryIcon(category) {
      if (category === "IT") {
        return "mdi-laptop-mac";
      } else if (category == "Deportes") {
        return "mdi-soccer";
      } else if (category == "Economia") {
        return "mdi-cash-100";
      } else if (category == "Politica") {
        return "mdi-castle";
      } else if (category == "Programacion") {
        return "mdi-script-text-outline";
      } else {
        return "mdi-view-dashboard-variant-outline";
      }
    },
    async putLike(id) {
      const response = await axios.patch(`api/ideas/${id}/like`);
      this.like = response.data.data.liked;
      if (this.like) {
        this.likedIdeas.push(this.id);
        this.ideas = this.ideas.map(idea => {
          if (idea.id === id) idea.likeCounter++;
        });
      } else {
        this.likedIdeas.splice(this.likedIdeas.indexOf(this.id), 1);
        this.ideas = this.ideas.map(idea => {
          if (idea.id === id) idea.likeCounter--;
        });
      }
      this.liked(id);
    }
  }
};
</script>
<style scoped>
.v-application--is-ltr .v-list-item__action:first-child,
.v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 0;
}
</style>