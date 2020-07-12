<template>
  <v-app v-touch="{right: () => swipe('Right'),left: () => swipe('Left')}">
    <Navbar
      :drawer="drawer"
      v-if=" currentRouteName != 'Login' && currentRouteName != 'Signup' && currentRouteName != 'Chat'"
    />
    <v-main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
    <BottomNav
      v-if=" currentRouteName != 'Login' && currentRouteName != 'Signup' && currentRouteName != 'Chat'"
    />
  </v-app>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
<script>
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
export default {
  components: { Navbar, BottomNav },
  name: "App",

  data: () => ({
    drawer: false
  }),
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  methods: {
    swipe(direction) {
      if (direction === "Right") this.drawer = true;
      if (direction === "Left") this.drawer = false;
    }
  }
};
</script>
