import { createStore } from "vuex";

export default createStore({
  state: {
    set: ""
  },
  getters: {
    getData() {
      console.log("mutations:getData");
      return sessionStorage.getItem("data");
    }
  },
  mutations: {
    SET_DATA(state,payload) {
      state.set = payload.set;
      sessionStorage.setItem("set", state.set);
    }
  },
  actions: {
  }
});
