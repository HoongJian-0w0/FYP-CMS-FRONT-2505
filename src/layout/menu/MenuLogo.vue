<template>
  <div class="logo">
    <transition name="fade" mode="out-in">
      <img
        v-if="isCollapse"
        key="favicon"
        class="favicon"
        src="@/assets/image/apclub-favicon.svg"
      />
      <img v-else key="black" src="@/assets/image/apclub-black.svg" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { useMenuStore } from '@/store/menu'
import { computed } from 'vue'

const store = useMenuStore()
const isCollapse = computed(() => store.getCollapse)
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  width: 100%;
  height: 60px;
  text-align: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    height: 50px;
  }

  .favicon {
    margin-top: -15px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
