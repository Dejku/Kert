<template>
  <div class="column gap-10">
    <header class="row justify-between text-size-7">
      Wykorzystany urlop <span>4 dni</span>
    </header>
    <div class="column q-px-sm text-weight-300 text-size-6 gap-10">
      <header class="row flex-center gap-10">
        <div>W tym</div>
        <hr class="col-grow rounded-borders--big bg-outline no-border" />
      </header>
      <section class="column q-px-xs gap-5">
        <div class="row justify-between">
          Urlop wypoczynkowy <span>3 dni</span>
        </div>
        <div class="row justify-between">Na żądanie <span>1 dni</span></div>
        <div class="row justify-between">Siła wyższa <span>5 godzin</span></div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
span {
  color: var(--onSurface);
  opacity: 0.75;
  font-weight: 200;
}

hr {
  height: 1px;
}
</style>
