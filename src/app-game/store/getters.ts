import { GetterTree } from 'vuex';
import { Scene, State } from './state';

export const getters: GetterTree<State, any> = {
  scene(state: State): Scene {
    return state.scene;
  },
};
