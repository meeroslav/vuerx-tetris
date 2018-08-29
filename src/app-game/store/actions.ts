import { INIT, Keys } from '@/app-game/common/constants';
import { State } from '@/app-game/store/state';
import { ActionTree } from 'vuex';

export const actions: ActionTree<State, State> = {
  [INIT]({ commit }) {
    commit(INIT);
  },
  [Keys.Space]({ commit }) {
    commit(Keys.Space);
  },
  [Keys.ArrowRight]({ commit }) {
    commit(Keys.ArrowRight);
  },
  [Keys.ArrowLeft]({ commit }) {
    commit(Keys.ArrowLeft);
  },
  [Keys.ArrowDown]({ commit }) {
    commit(Keys.ArrowDown);
  },
};
