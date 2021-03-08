<template>
  <kinesis-container class="relative overflow-hidden outer-wrapper">
    <g-image
      :immediate="true"
      src="~/assets/img/header/swish_4.png"
      data-sampler="planeTexture"
      class="w-100 layer-img"
    />
    <kinesis-element
      :strength="10"
      type="depth"
      class="absolute  left-0 layer-img"
    >
      <g-image
        :immediate="true"
        src="~/assets/img/header/swish_3.png"
        data-sampler="planeTexture"
      />
    </kinesis-element>
    <kinesis-element
      :strength="15"
      type="depth"
      class="absolute  left-0 layer-img"
    >
      <g-image
        :immediate="true"
        src="~/assets/img/header/swish_2.png"
        data-sampler="planeTexture"
      />
    </kinesis-element>
    <kinesis-element
      :strength="20"
      type="depth"
      class="absolute  left-0 layer-img"
    >
      <g-image
        :immediate="true"
        src="~/assets/img/header/swish_1.png"
        data-sampler="planeTexture"
      />
    </kinesis-element>
    <div class="logo z-30 w-100">
      <Logo />
    </div>
    <div class="logo logo-shadow z-30 w-100">
      <Logo />
    </div>
  </kinesis-container>
</template>

<script>
export default {};
</script>

<style  lang="scss">
.outer-wrapper {
  @media (max-width: 1024px) {
    height: 300px;
  }
  //height: 80vh;
}
.layer-img {
  top: 0;
  max-height: 100%;
  width: auto;
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
</style>
