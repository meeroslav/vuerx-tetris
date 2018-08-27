<template>
  <canvas id="gameCanvas">
  </canvas>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BOARD_HEIGHT, BOARD_WIDTH, CELL_SIZE, GAME_SPEED, GAP_SIZE, Keys } from './common/constants';
import { renderGameOver, renderScene } from './common/renderer';
import { Scene } from './store/state';
import { isGameOver } from './common/game-logic';

@Component({})
export default class AppGame extends Vue {
  private canvasCtx!: CanvasRenderingContext2D;
  private interval!;

  public mounted() {
    const canvas = this.$el as HTMLCanvasElement;
    canvas.width = BOARD_WIDTH * (CELL_SIZE + GAP_SIZE) - GAP_SIZE;
    canvas.height = BOARD_HEIGHT * (CELL_SIZE + GAP_SIZE) - GAP_SIZE;
    this.canvasCtx = canvas.getContext('2d') as CanvasRenderingContext2D;

    this.initGame();
  }

  public beforeDestroy() {
    this.cleanup();
  }

  private initGame() {
    // wait for animation frame
    window.requestAnimationFrame(() => {
      renderScene(this.canvasCtx, this.$store.state.scene);
    });
    this.interval = setInterval(() => {
      this.$store.commit(Keys.ArrowDown);
    }, GAME_SPEED);
    document.addEventListener('keydown', this.keySubscription.bind(this), true);

    // render on every move
    this.$store.watch(state => state.scene, (scene: Scene) => {
      if (isGameOver(scene)) {
        window.requestAnimationFrame(() => {
          renderGameOver(this.canvasCtx);
        });
        this.cleanup();
      } else {
        window.requestAnimationFrame(() => {
          renderScene(this.canvasCtx, scene);
        });
      }
    });
  }

  private keySubscription(event: KeyboardEvent) {
    const key = Keys[event.code];
    if (key!!) {
      this.$store.commit(key);
    }
  }

  private cleanup() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    document.removeEventListener('keydown', this.keySubscription.bind(this), true)
  }
}
</script>

<style scoped lang="scss">
</style>
