<template>
  <canvas id="gameCanvas">
  </canvas>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class AppGame extends Vue {
    private canvasCtx: CanvasRenderingContext2D;

    mounted() {
      const canvas = this.$el as HTMLCanvasElement;
      this.canvasCtx = canvas.getContext('2d');

      this.startGame(this.canvasCtx);
    }

    startGame(ctx: CanvasRenderingContext2D) {
      ctx.fillText('GAME OVER!?', 0, 0);
    }
  }
</script>

<style scoped lang="scss">
</style>
