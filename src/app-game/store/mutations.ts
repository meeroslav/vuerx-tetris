import { MutationTree } from 'vuex';
import { generateBlock, generateScene, Scene, State } from './state';
import { invertShape, mergeBlockToBoard, moveBlock, removeFullRows, rotateBlock } from '../common/game-logic';
import { INIT, Keys } from '@/app-game/common/constants';

export function sceneReducer(scene: Scene, action: string): Scene {
  let result;

  switch (action) {
    case INIT:
      return generateScene();
    case Keys.Space:
      result = rotateBlock(scene);
      return result || scene;
    case Keys.ArrowRight:
      result = moveBlock(scene, 1, 0);
      return result || scene;
    case Keys.ArrowLeft:
      result = moveBlock(scene, -1, 0);
      return result || scene;
    case Keys.ArrowDown:
      result = moveBlock(scene, 0, 1);
      if (result) {
        return result;
      }
      if (scene.block.y >= 0) {
        const board = mergeBlockToBoard(scene);
        return {
          board: removeFullRows(board), // remove lines if possible
          block: generateBlock(), // generate new block
        };
      }
      return {
        ...scene,
        block: {
          ...scene.block,
          shape: invertShape(scene.block.shape),
        },
      };
    default:
      return scene;
  }
}

export const mutations: MutationTree<State> = {
  [INIT](state: State) {
    state.scene = sceneReducer(state.scene, INIT);
  },
  [Keys.Space](state: State) {
    state.scene = sceneReducer(state.scene, Keys.Space);
  },
  [Keys.ArrowRight](state: State) {
    state.scene = sceneReducer(state.scene, Keys.ArrowRight);
  },
  [Keys.ArrowLeft](state: State) {
    state.scene = sceneReducer(state.scene, Keys.ArrowLeft);
  },
  [Keys.ArrowDown](state: State) {
    state.scene = sceneReducer(state.scene, Keys.ArrowDown);
  },
};
