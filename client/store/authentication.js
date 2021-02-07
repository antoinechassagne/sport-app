export const state = () => ({
  loggedUser: null,
});

export const getters = {
  loggedUser: (state) => state.loggedUser,
};

export const mutations = {
  SET_LOGGED_USER(state, loggedUser) {
    state.loggedUser = loggedUser;
  },
};

export const actions = {
  loginUser(context, credentials) {},
  logoutUser(contexnt) {},
  fetchLoggedUser(context, userId) {
    // @TODO
  },
};
