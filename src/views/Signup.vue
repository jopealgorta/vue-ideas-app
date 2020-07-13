<template>
  <div class="signup d-flex align-center justify-center">
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
            <v-img width="50%" max-width="200px" class="mx-auto my-4" src="/logo-blanco.png"></v-img>
          </div>
          <div class="white--text text-center mb-3 h1">
            <span class="text-h3 font-weight-light">Ide</span>
            <span class="text-h3">App</span>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="mx-4">
            <h2 class="ml-4 white--text font-weight-light">Crea tu cuenta!</h2>
          </div>
          <v-form ref="form" v-model="valid" @submit.prevent="signup" class="mx-5">
            <v-container>
              <v-row dense>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="user.name"
                    dark
                    label="Nombre"
                    :rules="[v => !!v || 'Nombre es requerido']"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    ref="email"
                    v-model="user.email"
                    dark
                    label="Email"
                    :rules="emailRules"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    dark
                    outlined
                    label="Contraseña"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    :rules="passwordRules"
                    hint="At least 8 characters"
                    counter
                    @click:append="show = !show"
                    v-model="user.password"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    dark
                    outlined
                    label="Confirmar contraseña"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    :rules="passwordRules"
                    hint="At least 8 characters"
                    counter
                    @click:append="show = !show"
                    v-model="user.passwordConfirm"
                    required
                  ></v-text-field>
                </v-col>
                <v-col class="text-center">
                  <v-btn type="submit" outlined dark x-large class="mb-3">Registrarse</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.signup {
  background-image: linear-gradient(to right bottom, #dd2c00, #d81b60, #ff1744);
  width: 100%;
  height: 100%;
}
.logo {
  width: 20%;
}
</style>

<script>
import axios from "axios";
export default {
  name: "Signup",
  data: () => ({
    text: "",
    snackbar: false,
    valid: false,
    user: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: ""
    },
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
    signup() {
      this.$refs.form.validate();
      if (this.valid) {
        let user = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          confirmPassword: this.user.passwordConfirm
        };
        // if (this.user.photo) user.photo = this.user.photo;
        axios
          .post("api/users/signup", user)
          .then(response => {
            if (response.data.status == "success") {
              this.$router.push("/");
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
            }
          })
          .catch(err => {
            this.$refs.email.focus();
            this.snackbar = true;
            this.text = err.response.data.message;
          });
      }
    }
  }
};
</script>
