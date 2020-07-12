<template>
  <div class="create-idea">
    <v-snackbar top v-model="snackbar" timeout="4000">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-card flat class="mx-auto mt-5" max-width="700px">
      <v-form v-model="valid" @submit.prevent="createIdea">
        <v-card-title>Tengo una idea...</v-card-title>
        <v-card-text>
          <v-text-field
            ref="title"
            v-model="title"
            :rules="[() => !!title || 'El titulo es requerido']"
            label="Titulo"
            required
          ></v-text-field>
          <v-text-field
            ref="title"
            v-model="summary"
            :rules="[() => !!summary || 'El resumen es requerido']"
            label="Resumen"
            required
          ></v-text-field>
          <v-textarea
            v-model="description"
            label="Descripcion"
            placeholder="Que magnifica idea tienes?..."
          ></v-textarea>
          <v-autocomplete
            ref="categories"
            v-model="category"
            :items="categories"
            label="Categorias"
            placeholder="Seleccionar..."
          ></v-autocomplete>
        </v-card-text>
        <v-divider class="mt-8"></v-divider>
        <v-card-actions>
          <v-btn text router to="/">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" type="submit" :loading="loading" text>Enviar</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>
<style scoped>
.create-idea {
  height: 100%;
}
</style>
<script>
import axios from "axios";
export default {
  data: () => ({
    valid: false,
    loading: false,
    text: "",
    snackbar: false,
    title: "",
    summary: "",
    description: "",
    category: "",
    categories: ["IT", "Programacion", "Economia", "Deportes", "Politica"]
  }),
  methods: {
    async createIdea() {
      this.loading = true;
      try {
        const idea = {
          title: this.title,
          summary: this.summary,
          description: this.description,
          user: this.$root.user.id,
          category: this.category
        };
        const response = await axios.post("api/ideas", idea);
        if (response.data.status == "success") {
          this.loading = false;
          this.$router.push("/");
        }
      } catch (err) {
        this.snackbar = true;
        this.text = err.response.data.message;
        this.loading = false;
      }
    }
  }
};
</script>