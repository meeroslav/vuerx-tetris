import Vue from 'vue';
import Vuex from 'vuex';
import { store } from './app-game/store';

Vue.use(Vuex);

export default new Vuex.Store(store);
