<template>
  <div class="chats">
    <v-list flat>
      <h1 class="px-3 grey--text">Chats</h1>
      <template v-for="(chat, index) in chats">
        <v-list-item :key="index" @click="goToChat(chat.id)">
          <v-list-item-content>
            <v-list-item-title v-html="chat.title"></v-list-item-title>
            <v-list-item-subtitle v-html="chat.summary"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index"></v-divider>
      </template>
    </v-list>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    chats: []
  }),
  methods: {
    goToChat(id) {
      // this.$root.idea = id;
      localStorage.setItem("idea", id);
      this.$router.push(`/chat`);
    }
  },
  async mounted() {
    // const res = await axios(`api/users/${this.$root.user.id}?fields=chats`);
    const res = await axios(
      `api/users/${localStorage.getItem("id")}?fields=chats`
    );
    this.chats = res.data.data.user[0].chats;
  }
};
</script>