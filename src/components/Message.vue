<template>
  <div>
    <div
      class="message"
      v-for="(message, index) in messages"
      v-bind:key="index"
      :class="{ own: message.from.name == username }"
    >
      <div class="content">
        <div
          class="username"
          v-if="index > 0 && messages[index - 1].user != message.from.name"
        >{{ message.from.name }}</div>
        <div class="username" v-if="index == 0">{{ message.from.name }}</div>
        <div style="margin-top: 5px"></div>
        <div v-html="message.message"></div>
        <!-- <chat-image v-if="message.image" :imgsrc="message.image" @imageLoad="imageLoad"></chat-image> -->
      </div>
    </div>
  </div>
</template>
<style scoped>
.message {
  margin: 0 1rem;
  margin-bottom: 3px;
}
.message.own {
  text-align: right;
}
.message.own .content {
  background-color: lightskyblue;
}
.chat-container .username {
  font-size: 14px;
  font-weight: bold;
}
.chat-container .content {
  padding: 4px 20px;
  background-color: lightgreen;
  border-radius: 10px;
  display: inline-block;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
  max-width: 50%;
  word-wrap: break-word;
}
</style>
<script>
export default {
  data() {
    return {};
  },
  props: ["messages"],
  computed: {
    username() {
      // return this.$root.user.name;
      return localStorage.getItem("username");
    }
  }
};
</script>
