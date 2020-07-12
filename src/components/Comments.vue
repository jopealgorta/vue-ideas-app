<template>
  <div>
    <v-list v-if="comments.length > 0" three-line>
      <template v-for="comment in comments">
        <v-list-item :key="comment.createdAt">
          <v-list-item-avatar>
            <v-img :src="`/img/${comment.user.photo}`"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              <span>{{comment.user.name}}</span> .
              <small class="caption grey--text">{{formatDate(comment.createdAt)}}</small>
            </v-list-item-title>
            <v-list-item-subtitle v-html="comment.comment"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="comment.createdAt"></v-divider>
      </template>
    </v-list>
    <v-card flat v-else>
      <v-card-text class="text-center text-h6">No hay comentarios</v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: { comments: Array },
  data: () => ({}),
  methods: {
    formatDate(date) {
      let newDate = new Date(date).toLocaleString();
      return moment(newDate).fromNow();
    }
  }
};
</script>
