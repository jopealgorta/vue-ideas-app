<template >
  <nav>
    <v-app-bar dense app>
      <v-btn v-if="currentRouteName === 'Idea'" @click.stop="from" icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-app-bar-nav-icon v-else @click.stop="toggleNav"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title
        @click.stop="goToHome"
        class="text-uppercase dark-grey--text d-flex align-center"
      >
        <v-avatar size="30" class="ma-2">
          <v-img src="/img/logo-negro.png"></v-img>
        </v-avatar>
        <span class="font-weight-light">Ide</span>
        <span>App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom origin="center center" transition="scale-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Politica de Privacidad</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Acerca de</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer fixed temporary v-model="drawer" color="error" dark>
      <v-list dense nav class="py-0" height="86%">
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-img :src="`/img/${userPhoto}`" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{username}}</v-list-item-title>
            <v-list-item-subtitle>@{{username.split(' ')[0].toLowerCase()}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="item in items" :key="item.title" link router :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-spacer></v-spacer>
      <v-list dense nav class="py-0">
        <v-list-item @click.stop="logout" link>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Cerrar Sesion</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link router to="/me">
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Configuracion</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import axios from "axios";
export default {
  props: ["drawer"],
  data: () => ({
    username: "",
    userPhoto: "",
    items: [
      {
        title: "Ideas que te interesan",
        icon: "mdi-heart",
        route: "/liked-ideas"
      },
      { title: "Tus ideas", icon: "mdi-lightbulb", route: "/my-ideas" },
      { title: "Chats", icon: "mdi-message", route: "/chats" }
    ]
  }),
  created() {
    // this.username = this.$root.user.name;
    this.username = localStorage.getItem("username");
    // this.userPhoto = this.$root.user.photo;
    this.userPhoto = localStorage.getItem("photo");
  },
  methods: {
    toggleNav() {
      this.drawer = !this.drawer;
    },
    goToHome() {
      this.$router.push("/");
    },
    async logout() {
      if (confirm("Esta seguro de cerrar sesion?")) {
        await axios("api/users/logout");
        this.$router.push("/login");
      }
    },
    from() {
      this.$router.go(-1);
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  }
};
</script>

<style scoped>
.v-toolbar__title {
  cursor: pointer;
}
</style>