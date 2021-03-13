<template>
  <kinesis-container
    :event="event"
    class="relative overflow-hidden outer-wrapper-perspective"
  >
    <g-image
      src="~/assets/img/header/bg.png"
      class="w-100 layer-img"
    />
    <kinesis-element
      :strength="5"
      class="absolute  left-0 layer-img-wrapper"
    >
      <g-image
        class="layer-img"
        src="~/assets/img/header/bunny.png"
      />
    </kinesis-element>
    <kinesis-element
      :strength="-50"
      origin="top left"
      class="absolute left-0  layer-img-wrapper"
    >
      <g-image
        class="layer-img"
        src="~/assets/img/header/layer_y.png"
      />
    </kinesis-element>
    <kinesis-element
      :strength="5"
      class="absolute  left-0 layer-img-wrapper"
    >
      <g-image
        class="layer-img"
        src="~/assets/img/header/birdy.png"
      />
    </kinesis-element>
    <kinesis-element
      :strength="20"
      class="absolute layer-img-wrapper"
    >
      <g-image
        class="layer-img"
        src="~/assets/img/header/layer_g.png"
      />
    </kinesis-element>
    <kinesis-element
      :strength="5"
      class="absolute  left-0 layer-img-wrapper"
    >
      <g-image
        class="layer-img layer-center"
        src="~/assets/img/header/fish.png"
      />
    </kinesis-element>
    <kinesis-element
      :strength="2"
      class="absolute  left-0 layer-img-wrapper"
    >
      <g-image
        class="layer-img"
        src="~/assets/img/header/layer_b.png"
      />
    </kinesis-element>
    <kinesis-element
      :strength="90"
      type="rotate"
      class="absolute  left-0 layer-img-wrapper"
    >
      <g-image
        class="layer-img"
        src="~/assets/img/header/redstar.png"
      />
    </kinesis-element>

    <div class="logo z-30 w-100   ">
      <Logo />
    </div>
    <div class="logo logo-shadow z-30 w-100  ">
      <Logo />
    </div>
  </kinesis-container>
</template>

<script>
export default {
  data() {
    return {
      event: "move",
    };
  },
  mounted() {
    if (screen.width < 990) {
      this.event = "scroll";
    }
  },
};
</script>

<style scoped  lang="scss">
.outer-wrapper-perspective {
  // @media (max-width: 1024px) {
  //   height: 300px;
  // }
  height: 80vh;
  max-width: 100vw;
  position: relative;

  .layer-img-wrapper {
    top: -10vh;
    height: 100vh;
    width: 100vw;
    object-fit: cover;
    text-align: center;
  }
  .layer-img {
    object-fit: cover;
    height: 100vh;
    width: 100vw;
    max-width: auto;
  }
  .logo {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
    max-width: 100vw;
    height: auto;
    color: white;

    &.logo-shadow {
      transform: translateY(calc(-50% - 2px)) scale(1.03);
      mix-blend-mode: difference;
      filter: invert(1) grayscale(1) contrast(9);
    }
  }

  .logo svg {
    max-width: 100vw;
    width: 100vw;
    height: auto;
  }
}
</style>
