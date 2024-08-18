import { App } from "vue";
import ActionMessage from "./ActionMessage.vue";
import ActionSection from "./ActionSection.vue";

export default {
  install(App) {
    Vue.component("ActionMessage", ActionMessage);
    Vue.component("ActionSection", ActionSection);
  },
};

export { ActionMessage };
