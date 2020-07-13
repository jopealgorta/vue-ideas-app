<template>
  <div class="login d-flex align-center justify-center">
    <v-snackbar top v-model="snackbar" timeout="4000">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" class="d-flex justify-center align-center flex-column">
          <div>
            <v-img width="50%" max-width="200px" class="mx-auto my-4" src="/img/logo-blanco.png"></v-img>
          </div>
          <div class="white--text text-center my-5 h1">
            <span class="text-h3 font-weight-light">Ide</span>
            <span class="text-h3">App</span>
          </div>
        </v-col>

        <v-col cols="12" sm="6">
          <div class="mx-4">
            <h2 class="ml-4 white--text font-weight-light">Inicia Sesion</h2>
          </div>
          <v-form ref="form" v-model="valid" @submit.prevent="login" class="mx-5">
            <v-container>
              <v-row dense>
                <v-col cols="12">
                  <v-text-field
                    ref="email"
                    dark
                    label="Email"
                    outlined
                    type="email"
                    :rules="emailRules"
                    v-model="email"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    dark
                    v-model="password"
                    outlined
                    label="Contraseña"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    name="input-10-1"
                    hint="At least 8 characters"
                    :rules="passwordRules"
                    counter
                    required
                    @click:append="show = !show"
                  ></v-text-field>
                </v-col>
                <v-col class="text-center">
                  <v-btn outlined dark x-large type="submit" class="mb-3">Iniciar Sesion</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <div class="text-center">
            <v-btn
              text
              x-small
              router
              to="/signup"
              class="white--text caption font-weight-light"
            >No tienes una cuenta? Registrate</v-btn>
            <br />
            <a
              href="/forgotPassword"
              class="white--text caption font-weight-light"
            >Olvidaste tu contraseña?</a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.login {
  background-image: linear-gradient(to right bottom, #dd2c00, #d81b60, #ff1744);
  width: 100%;
  height: 100%;
}
</style>

<script>
import axios from "axios";
export default {
  name: "Login",
  data: () => ({
    text: "",
    snackbar: false,
    valid: false,
    email: "",
    password: "",
    show: false,
    passwordRules: [
      v => !!v || "Contraseña es requerida",
      v =>
        (v && v.length >= 8) || "La contraseña debe tener mas de 8 caracteres."
    ],
    emailRules: [
      v => !!v || "E-mail es requerido",
      v => /.+@.+\..+/.test(v) || "E-mail debe ser valido"
    ]
  }),
  methods: {
    login() {
      axios
        .post("api/users/login", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          if (response.data.status == "success") {
            localStorage.setItem("username", response.data.data.user.name);
            localStorage.setItem("email", response.data.data.user.email);
            localStorage.setItem("photo", response.data.data.user.photo);
            localStorage.setItem("id", response.data.data.user.id);
            localStorage.setItem("chats", response.data.data.user.chats);
            // this.$root.user.name = response.data.data.user.name;
            // this.$root.user.email = response.data.data.user.email;
            // this.$root.user.photo = response.data.data.user.photo;
            // this.$root.user.id = response.data.data.user.id;
            // this.$root.user.chats = response.data.data.user.chats;
            this.$router.push("/");
          }
        })
        .catch(err => {
          this.$refs.email.focus();
          this.snackbar = true;
          this.text = err.response.data.message;
        });
    }
  }
};
</script>
