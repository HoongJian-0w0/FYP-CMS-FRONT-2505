<template>
  <template v-for="menu in menuList" :key="menu.path">
    <!-- If the menu has children (sub-menu) -->
    <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path">
      <template #title>
        <el-icon>
          <component :is="menu.meta.icon" />
        </el-icon>
        <span class="menu-title">{{ menu.meta.title }}</span>
      </template>
      <!-- Recursive rendering of sub-menu -->
      <menu-item :menuList="menu.children" />
    </el-sub-menu>

    <!-- If the menu has no children (regular menu item) -->
    <el-menu-item v-else :index="menu.path">
      <el-icon>
        <component :is="menu.meta.icon" />
      </el-icon>
      <template #title>{{ menu.meta.title }}</template>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
defineProps(['menuList'])
</script>

<style scoped lang="scss"></style>
