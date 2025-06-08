<template>
  <MenuLogo />
  <div class="menubar">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      unique-opened
      router
    >
      <MenuItem :menuList="menuList" />
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import MenuItem from '@/layout/menu/MenuItem.vue'
import MenuLogo from '@/layout/menu/MenuLogo.vue'
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '@/store/menu'

const store = useMenuStore()
const route = useRoute()

const isCollapse = computed(() => store.getCollapse)

const defaultActive = computed(() => {
  const { path } = route
  return path
})

let menuList = reactive([
  {
    path: '/dashboard',
    component: '/views/cms/user/dashboard/dashboard',
    name: 'Dashboard',
    meta: {
      title: 'Dashboard',
      icon: 'HomeFilled',
      roles: ['cms:dashboard'],
    },
  },
  {
    path: '/cms',
    component: 'Layout',
    name: 'cms',
    meta: {
      title: 'System Management',
      icon: 'Setting',
      roles: ['cms:manage'],
    },
    children: [
      {
        path: '/cms/userList',
        component: '/views/cms/user/userList',
        name: 'userList',
        meta: {
          title: 'User Management',
          icon: 'UserFilled',
          roles: ['cms:user'],
        },
      },
      {
        path: '/cms/roleList',
        component: '/views/cms/role/roleList',
        name: 'roleList',
        meta: {
          title: 'Role Management',
          icon: 'Wallet',
          roles: ['cms:role'],
        },
      },
      {
        path: '/cms/menuList',
        component: '/views/cms/menu/menuList',
        name: 'menuList',
        meta: {
          title: 'Menu Management',
          icon: 'Menu',
          roles: ['cms:menu'],
        },
      },
    ],
  },
])
</script>

<style lang="scss" scoped>
.menubar {
  margin-top: 20px;
}

.menu-vertical {
  width: 230px;
  min-height: 400px;
  border-right: none;
  font-family: var(--font-family-base);
}

:deep(.el-menu) {
  border-right: none !important;
  transition: width 0.8s ease !important;
}

:deep(.el-sub-menu .el-sub-menu__title) {
  color: var(--el-text-color-primary) !important;
}

:deep(.el-menu-item) {
  color: var(--el-text-color-primary);
  font-weight: 400;
  .el-icon {
    margin-right: 8px;
  }
}

:deep(.el-menu-item.is-active) {
  color: var(--el-color-primary) !important;
  background: linear-gradient(90deg, #00c6ff, #0072ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

:deep(.is-opened .el-menu-item) {
  background-color: #fff !important;
}

:deep(.el-menu-item:hover) {
  background-color: #fff !important;
}
</style>
