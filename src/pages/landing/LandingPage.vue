<template>
  <q-page>
    <transition name="modal-slide">
      <section
        v-if="isShowed"
        class="column flex-center absolute-bottom q-px-md q-py-lg bg-surface gap-xl"
        style="border-radius: 25px 25px 0 0"
      >
        <header
          class="absolute absolute-center hug bg-background rounded-borders--circle"
          style="top: 0; border: 4px solid var(--surface)"
        >
          <img src="~src/assets/logos/logo_mdpi.png" />
        </header>

        <q-space />
        <q-space />

        <div class="column gap-md">
          <base-title title="Dołącz już teraz, aby móc:" />

          <ul class="column no-padding q-my-none q-mx-auto gap-xs text-size-6">
            <li>Zarządzać swoim urlopem</li>
            <li>Zapisywać rzeczy do zrobienia</li>
            <li>Udostępniać je innym</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
          </ul>
        </div>

        <div class="column items-center gap-sm">
          <base-button
            label="Stwórz konto"
            color="primary"
            transparent
            @click="router.push('/signup')"
          />
          <span class="text-bold">LUB</span>
          <base-button
            label="Zaloguj się"
            color="secondary"
            transparent
            @click="router.push('/login')"
          />
        </div>
      </section>
    </transition>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const isShowed = ref<boolean>(false);
const router = useRouter();

onMounted(() => {
  setTimeout(() => (isShowed.value = true), 250);
});
</script>

<style lang="scss" scoped>
ul {
  list-style: none;

  li::before {
    content: '\2022';
    display: inline-block;
    width: 1em;
    color: var(--onPrimaryContainer);
  }
}
</style>
