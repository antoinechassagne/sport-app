export const state = () => ({
  loading: false,
  error: null,
  loggedUser: null,
});

export const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  loggedUser: (state) => state.loggedUser,
};

export const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_LOGGED_USER(state, loggedUser) {
    state.loggedUser = loggedUser;
  },
};

export const actions = {
  getLoggedUser(context) {
    return new Promise((resolve) => {
      this.$axios.$get("/logged-user").then((user) => {
        context.commit("SET_LOGGED_USER", user);
        resolve();
      });
    });
  },
  loginUser(context, credentials) {
    return new Promise((resolve) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", true);
      this.$axios
        .$post("/login", {
          email: credentials.email,
          password: credentials.password,
        })
        .then((res) => {
          context.dispatch("fetchLoggedUser", res.userId).then(() => resolve());
        })
        .catch((error) => {
          context.commit("SET_ERROR", error);
        })
        .finally(() => {
          context.commit("SET_LOADING", false);
        });
    });
  },
  logoutUser(context) {
    return new Promise((resolve) => {
      this.$axios.$get("/logout").then(() => {
        context.commit("SET_LOGGED_USER", null);
        resolve();
      });
    });
  },
  fetchLoggedUser(context, userId) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      if (!userId) {
        return reject();
      }
      this.$axios
        .$get(`/users/${userId}`)
        .then((user) => {
          context.commit("SET_LOGGED_USER", user);
          resolve();
        })
        .catch((error) => {
          context.commit("SET_ERROR", error);
        });
    });
  },
};
