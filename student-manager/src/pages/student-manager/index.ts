import { defineCustomElement } from "vue";
import AppComponent from "./views/index.vue";

const Main = defineCustomElement(AppComponent);

customElements.define("student-manager-wc", Main);
