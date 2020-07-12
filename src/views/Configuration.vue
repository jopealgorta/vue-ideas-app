<template>
  <div class="config">
    <v-snackbar top v-model="snackbar" timeout="4000">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-card class="ma-3 pa-4" flat outlined>
      <v-container>
        <h5 class="text-h5 grey--text">Mis datos</h5>
        <v-row>
          <v-form class="data-form" v-model="valid">
            <v-col cols="12">
              <v-text-field
                v-model="name"
                filled
                :counter="10"
                :rules="nameRules"
                label="Name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="email" filled :rules="emailRules" label="E-mail" required></v-text-field>
            </v-col>
            <v-row class="mx-1">
              <v-col cols="2">
                <v-avatar size="50">
                  <v-img :src="`/img/${userPhoto}`" />
                </v-avatar>
              </v-col>
              <v-col cols="10">
                <v-file-input
                  filled
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon
                  append-icon="mdi-camera"
                  label="Foto"
                  type="file"
                  v-model="photo"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn
                color="success"
                class="mr-4"
                :loading="loading"
                @click.prevent="updateData"
              >Guardar Cambios</v-btn>
            </v-card-actions>
          </v-form>
        </v-row>
      </v-container>
    </v-card>
    <v-card class="ma-3 pa-4" flat outlined>
      <v-container>
        <h5 class="text-h5 grey--text">Cambiar contraseña</h5>
        <v-row>
          <v-form class="data-form" v-model="valid2">
            <v-col cols="12">
              <v-text-field
                filled
                v-model="currentPassword"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="show1 ? 'text' : 'password'"
                label="Contraseña actual"
                hint="Al menos 8 caracteres"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                filled
                v-model="password"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="show2 ? 'text' : 'password'"
                label="Nueva contraseña"
                hint="Al menos 8 caracteres"
                counter
                @click:append="show2 = !show2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                filled
                v-model="confirmPassword"
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="show3 ? 'text' : 'password'"
                label="Confirme la nueva contraseña"
                hint="Debe coincidir con la anterior"
                counter
                @click:append="show3 = !show3"
              ></v-text-field>
            </v-col>
            <v-card-actions>
              <v-btn
                color="success"
                class="mr-4"
                :loading="loading2"
                @click.prevent="updatePassword"
              >Cambiar contraseña</v-btn>
            </v-card-actions>
          </v-form>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Configuration",
  data: () => ({
    valid: true,
    name: "",
    email: "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
    userPhoto: "",
    photo: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    passwordRules: [
      v => !!v || "Contraseña es requerida",
      v =>
        (v && v.length >= 8) || "La contraseña debe tener mas de 8 caracteres."
    ],
    show1: false,
    valid2: true,
    show2: false,
    show3: false,
    text: "",
    snackbar: false,
    loading: false,
    loading2: false
  }),
  mounted() {
    this.name = this.$root.user.name;
    this.email = this.$root.user.email;
    this.userPhoto = this.$root.user.photo;
  },
  methods: {
    async updateData() {
      this.loading = true;
      const data = new FormData();
      data.append("name", this.name);
      data.append("email", this.email);
      data.append("photo", this.photo);
      try {
        const res = await axios.patch("api/users/updateMe", data);
        if (res.data.status === "success") {
          this.loading = false;
          this.snackbar = true;
          this.text = "Datos actualizados satisfactoriamente!";
          this.$root.user.name = this.name;
          this.$root.user.email = this.email;
          this.$root.user.photo = res.data.data.photo;
          this.userPhoto = res.data.data.photo;
        }
      } catch (err) {
        this.loading = false;
        this.snackbar = true;
        this.text = err.message;
      }
    },
    async updatePassword() {
      this.loading2 = true;
      const data = {
        currentPassword: this.currentPassword,
        password: this.password,
        confirmPassword: this.confirmPassword
      };
      try {
        const res = await axios.patch("api/users/updatePassword", data);
        if (res.data.status === "success") {
          this.loading2 = false;
          this.snackbar = true;
          this.text = "Contraseña cambiada con exito";
        }
      } catch (err) {
        this.loading2 = false;
        this.snackbar = true;
        this.text = err.message;
      }
    }
  }
};
</script>
<style scoped>
.data-form {
  width: 100%;
}
</style>