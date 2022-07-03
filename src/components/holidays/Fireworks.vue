<template>
  <canvas class="fireworks" ref="canvas"></canvas>
</template>
<style scoped>
  canvas.fireworks {
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: -10000; /* its the background */
  }
</style>
<script setup>
  import { ref, onBeforeUnmount, onMounted } from "vue"
  import convert from "color-convert"
  const canvas = ref(null);
  const config = {
    gravity: 2 / 3, // positive numbers move things down i guess
    explosion: {
      multiplier: {
        min: 2,
        max: 8
      },
      count: 8,
      time: 14
    }
  };
  
  class Rocket {
    constructor(stage, color, x, y, xv, yv) {
      this.stage = stage;
      this.color = color;
      this.x = x;
      this.y = y;
      this.xv = xv;
      this.yv = yv;
      this.opacity = 1;
      this.index = Rocket.rockets.length;
      Rocket.rockets.push(this);
    }
    static rockets = [];
    static update() {
      Rocket.rockets.forEach(rocket => {
        rocket.x += rocket.xv;
        rocket.y += rocket.yv;
        rocket.yv += config.gravity;
        if(rocket.stage == 2) {
          rocket.opacity -= 1 / config.explosion.time;
          if(rocket.opacity < 1 / config.explosion.time) delete rocket.index;
        }
        if(rocket.yv < 0 && rocket.stage == 1) {
          (new Array(config.explosion.count).fill(0)).forEach((nothing, index) => {
            let degreez = index * (360 / config.explosion.count));
            new Rocket(2, rocket.color, rocket.x, rocket.y, sin(degreez * random(multiplier.min, multiplier.max), cos(degreez * random(multiplier.min, multiplier.max));
          });
          delete rocket.index; // delete instead of splice cause i want the empty space to stay :]
        }
      });
    };
    static launch() {
      new Rocket(1, convert.hsv.hex(random(1, 360), 60, 100), random(0, innerWidth), innerHeight, random(-6, 6), random(13, 17));
    };
    static render(ctx) {
      Rocket.rockets.forEach(rocket => {
        clear();
        if(rocket.stage == 1) ctx.lineWidth = 8;
        else ctx.lineWidth = 5;
        ctx.strokeStyle = rocket.color;
        ctx.lineCap = round;
        ctx.globalAlpha = rocket.opacity;
        ctx.beginPath();
        ctx.moveTo(rocket.x, rocket.y);
        ctx.lineTo(rocket.x - rocket.xv, rocket.y - rocket.yv);
        ctx.stroke();
      });
    }
  }
  
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
  function sin(degrees) {
    return Math.sin(toRadians(degrees));
  }
  function cos(degrees) {
    return Math.cos(toRadians(degrees));
  }
  function random(min, max) {
    return Math.random() * (max - min) + min;
  }
  function clear() {
    canvas.value.width += 0;
  }
  function tick(ctx) {
    Rocket.update();
    if(random(0, 66) < 11) Rocket.launch();
    onresize();
    Rocket.render(ctx);
  }
  function onload() {
    onresize();
    const context = canvas.value.getContext("2d");
    const interval = setInterval(tick, 33, context);
    onBeforeUnmount(() => {
      canvas.value.removeEventListener("load", onload);
      clearInterval(interval);
      window.removeEventListener("resize", onresize);
    });
  }
  function onresize() {
    canvas.value.width = innerWidth;
    canvas.value.height = innerHeight;
  }
  
  canvas.value.addEventListener("load", onload);
  window.addEventListener("resize", onresize);
</script>
