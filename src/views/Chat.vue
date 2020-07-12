<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row>
      <v-col class="pa-0">
        <v-toolbar height="70" class="mx-3">
          <v-btn router :to="from()" icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title class="text-h5 font-weight-light">{{ idea }}</v-toolbar-title>
        </v-toolbar>
      </v-col>
      <v-col cols="12" class="chat-container">
        <message :messages="messages"></message>
      </v-col>
      <v-col cols="12" class="typer py-0 px-2">
        <v-text-field
          v-model="message"
          :append-outer-icon="message ? 'mdi-send' : 'mdi-microphone'"
          prepend-icon="mdi-emoticon"
          clear-icon="mdi-close-circle"
          clearable
          label="Message"
          type="text"
          @click:append-outer="sendMessage"
          @click:clear="clearMessage"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Message from "../components/Message";
import io from "socket.io-client";
import axios from "axios";
export default {
  name: "Chat",
  components: {
    message: Message
  },
  data: () => ({
    idea: "",
    show: false,
    message: "",
    messages: [],
    socket: io("http://localhost:3000"),
    prevRoute: null
  }),
  methods: {
    joinServer() {
      const data = {
        userId: this.$root.user.id,
        username: this.$root.user.name,
        room: this.$root.idea
      };
      this.socket.emit("joinRoom", data);
      this.socket.on("loadMessages", messages => {
        this.messages = messages;
      });
      this.listen();
    },
    listen() {
      this.socket.on("message", msg => {
        this.messages.push(msg);
        // chatMessages.scrollTop = chatMessages.scrollHeight;
      });
    },
    sendMessage() {
      this.socket.emit("chatMessage", this.message);
      this.clearMessage();
    },
    clearMessage() {
      this.message = "";
    },
    from() {
      return this.prevRoute;
    }
  },
  async mounted() {
    this.idea = (
      await axios(`api/ideas/${this.$root.idea}`)
    ).data.data.idea.title;
    await axios.patch(
      `api/users/${this.$root.user.id}/${this.$root.idea}/chat`
    );

    this.joinServer();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from;
    });
  }
};
</script>

<style scoped>
.typer {
  position: absolute;
  bottom: 0;
  left: 0;
}
.scrollable {
  overflow-y: auto;
  height: 90vh;
}
.chat-container {
  box-sizing: border-box;
  height: calc(100vh - 9.5rem);
  overflow-y: auto;
  background-color: #f2f2f2;
}
.message {
  margin-bottom: 3px;
}
.message.own {
  text-align: right;
}
.message.own .content {
  background-color: lightskyblue;
}
.chat-container .username {
  font-size: 18px;
  font-weight: bold;
}
.chat-container .content {
  padding: 8px;
  background-color: lightgreen;
  border-radius: 10px;
  display: inline-block;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
  max-width: 50%;
  word-wrap: break-word;
}
</style>
