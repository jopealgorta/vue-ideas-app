<template>
  <nav>
    <v-bottom-navigation grow app :value="activeBtn" color="red lighten-1">
      <v-btn router to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn router to="/notifications">
        <v-icon>mdi-history</v-icon>
      </v-btn>
      <v-btn router to="/create-idea">
        <v-icon x-large color="red lighten-1">mdi-plus-box</v-icon>
      </v-btn>
      <v-btn>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn router to="/chats">
        <v-icon>mdi-message</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </nav>
</template>


<script>
export default {
  data: () => ({
    activeBtn: 1
  })
};
</script>