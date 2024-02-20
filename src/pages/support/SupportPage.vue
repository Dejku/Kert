<template>
  <q-page>
    <main class="column gap-md">
      <base-title
        :icon-left="iconStore.icon.arrowBack"
        title="Jak korzystać z kalendarza"
        back
      />

      <q-expansion-item
        class="bg-surface rounded-borders box-shadow"
        label="Spis treści"
        dense
      >
        <ol class="no-margin q-pb-sm" style="padding-left: 30px">
          <li>Lorem Ipsum</li>
          <li>Lorem Ipsum</li>
          <li>Lorem Ipsum</li>
        </ol>
      </q-expansion-item>

      <section class="column q-px-sm gap-md">
        <suspense>
          <img
            src="https://imag.unsplash.com/photo-1509021436665-8f07dbf5bf1d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHw%3D&w=1000&q=80"
            alt="Good book"
            class="rounded-borders box-shadow"
          />
          <template #fallback>
            <q-skeleton type="rect" />
          </template>
        </suspense>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus
          cras adipiscing enim eu turpis egestas.
        </p>

        <p>
          Consectetur adipiscing elit pellentesque habitant morbi tristique
          senectus et netus. Sapien et ligula ullamcorper malesuada proin libero
          nunc consequat interdum. Lacus sed turpis tincidunt id aliquet risus.
        </p>

        <base-badge :icon="iconStore.icon.info" class="text-size-4">
          <span class="text-bold">Wskazówka:</span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </base-badge>

        <p>
          Interdum velit laoreet id donec ultrices tincidunt. Odio euismod
          lacinia at quis risus sed vulputate odio. Dignissim enim sit amet
          venenatis urna cursus eget.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus
          cras adipiscing enim eu turpis egestas.
        </p>

        <p>
          Consectetur adipiscing elit pellentesque habitant morbi tristique
          senectus et netus. Sapien et ligula ullamcorper malesuada proin libero
          nunc consequat interdum. Lacus sed turpis tincidunt id aliquet risus.
        </p>

        <p>
          Interdum velit laoreet id donec ultrices tincidunt. Odio euismod
          lacinia at quis risus sed vulputate odio. Dignissim enim sit amet
          venenatis urna cursus eget.
        </p>
      </section>
    </main>
  </q-page>
</template>

<script setup lang="ts">
import { useIconStore } from 'stores/iconStore';
const iconStore = useIconStore();
</script>

<style lang="scss" scoped>
img {
  display: inline-block;
  font-family: Arial, sans-serif;
  font-weight: 300;
  line-height: 2;
  text-align: center;

  min-width: 300px;
  min-height: 50px;
  position: relative;
}

img::before {
  content: '';
  width: 100%;
  height: calc(100% + 10px);
  background-color: #ccc;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: -2px;
  transform: translateY(-50%);
}

img::after {
  content: '\2639'' ' attr(alt);

  font-size: 18px;
  color: rgb(100, 100, 100);

  display: block;
  position: absolute;
  z-index: 2;
  top: 5px;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
