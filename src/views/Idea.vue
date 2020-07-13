<template>
  <div class="idea">
    <v-card v-model="idea" flat outlined class="mx-auto my-2" light max-width="600">
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
      <v-card-text class="subtitle-2 font-weight-light">{{ idea.description }}</v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
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
        </v-list-item>
      </v-card-actions>
    </v-card>
    <v-card flat outlined class="mx-auto" light max-width="600">
      <v-form @submit.prevent="addComment">
        <v-text-field
          autocomplete="off"
          dense
          filled
          outlined
          placeholder="Agregar un comentario..."
          v-model="comment"
          append-icon="mdi-send"
          @click:append="addComment"
        ></v-text-field>
      </v-form>
      <Comments :comments="idea.comments" />
    </v-card>
  </div>
</template>
<script>
import Comments from "../components/Comments";
import axios from "axios";
import moment from "moment";
export default {
  name: "Idea",
  components: { Comments },
  data: () => ({
    comment: "",
    idea: "",
    likedIdeas: [],
    like: false
  }),
  // async beforeRouteEnter(to, from, next) {
  //   const idea = (await axios(`api/ideas/${this.$root.idea}`)).data.data.idea;
  //   next(vm => vm.setIdea(idea));
  // },
  async created() {
    // const idea = (await axios(`api/ideas/${this.$root.idea}`)).data.data.idea;
    const idea = (await axios(`api/ideas/${localStorage.getItem("idea")}`)).data
      .data.idea;
    this.setIdea(idea);
    // const response = await axios(`api/users/${this.$root.user.id}/liked`);
    const response = await axios(
      `api/users/${localStorage.getItem("id")}/liked`
    );
    const likedIdeas = response.data.data.likedIdeas;
    this.likedIdeas = likedIdeas;
    this.liked(idea.id);
  },
  methods: {
    goToChat(id) {
      // this.$root.idea = id;
      localStorage.setItem("idea", id);
      this.$router.push(`/chat`);
    },
    async addComment() {
      const comment = {
        // user: this.$root.user.id,
        user: localStorage.getItem("id"),
        comment: this.comment
      };

      await axios.post(`api/ideas/${this.idea.id}/comments`, comment);
      this.idea.comments = (
        await axios(`api/ideas/${this.idea.id}/comments`)
      ).data.data.comments;
      this.comment = "";
    },
    formatDate(date) {
      let newDate = new Date(date).toLocaleString();
      return moment(newDate).fromNow();
    },
    setIdea(idea) {
      this.idea = idea;
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
        return "mdi-view-dashboard";
      }
    },
    liked(id) {
      this.like = this.likedIdeas.includes(id);
    },
    async putLike(id) {
      const response = await axios.patch(`api/ideas/${id}/like`);
      this.like = response.data.data.liked;
      if (this.like) {
        this.likedIdeas.push(this.idea.id);
        this.idea.likeCounter++;
      } else {
        this.likedIdeas.splice(this.likedIdeas.indexOf(this.idea.id), 1);
        this.idea.likeCounter--;
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
.v-text-field.v-text-field--enclosed .v-text-field__details {
  display: none !important;
}
</style>