<template>
  <div class="NotFound">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card height="400" color="transparent" flat>
            <div class="display-3 mt-5">No has iniciado sesion</div>
            <div
              class="grey--text lighten-5"
            >La pagina que deseas visitar esta protegida para usuarios que esten registrados en el sistema.</div>
            <div class="paragraph-text mt-2">
              <br />
              <br />Inicie sesion o registrese para compartir tus ideas con la comunidad!
            </div>
            <v-card-actions>
              <v-btn router to="/login">Ir a inicio de sesion</v-btn>
              <v-btn router to="/signup">No tienes una cuenta? Registrate.</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
.paragraph-text {
  font-size: 18px;
}
</style>