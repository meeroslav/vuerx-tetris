import { generateState } from '@/app-game/store/state';
import { mutations } from '@/app-game/store/mutations';
import { getters } from '@/app-game/store/getters';

export const store = {
  state: generateState(),
  getters,
  mutations,
};
