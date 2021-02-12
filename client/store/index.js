export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async nuxtServerInit(context) {
    await context.dispatch("authentication/getLoggedUser");
  },
};
