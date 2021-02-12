<template>
  <fragment>
    <Heading level="1">Se connecter</Heading>
    <form @submit="login">
      <div class="flex flex-col">
        <label for="email">Email :</label>
        <input
          v-model="email"
          id="email"
          type="text"
          placeholder="Saisissez votre adresse email"
          required
          class="border-2 border-indigo-400 rounded p-1"
        />
      </div>
      <div class="flex flex-col my-2">
        <label for="password">Mot de passe :</label>
        <input
          v-model="password"
          id="password"
          type="password"
          placeholder="Saisissez votre mot de passe"
          required
          class="border-2 border-indigo-400 rounded p-1"
        />
      </div>
      <button
        type="submit"
        @click.prevent="login"
        class="border-2 border-indigo-400 rounded p-1 my-2"
        :disabled="loading"
      >
        <template v-if="loading">Connexion...</template>
        <template v-else>Se connecter</template>
      </button>
    </form>
  </fragment>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Heading from "@/components/texts/Heading";

export default {
  name: "PageLogin",
  middleware: ["guest"],
  components: {
    Heading,
  },
  data() {
    return {
      email: null,
      password: null,
    };
  },
  computed: {
    ...mapGetters({
      loading: "authentication/loading",
      error: "authentication/error",
      loggedUser: "authentication/loggedUser",
    }),
  },
  methods: {
    ...mapActions({
      loginUser: "authentication/loginUser",
    }),
    login() {
      this.loginUser({ email: this.email, password: this.password }).then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>
