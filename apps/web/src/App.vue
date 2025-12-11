<script setup lang="ts">
import { RouterView } from 'vue-router'

const navItems = [
  {
    title: 'Overview',
    to: '/',
    icon: 'mdi-view-dashboard-outline',
  },
  {
    title: 'Tokens',
    to: '/tokens',
    icon: 'mdi-palette-outline',
  },
  {
    title: 'Components',
    to: '/components',
    icon: 'mdi-shape-outline',
  },
  {
    title: 'About',
    to: '/about',
    icon: 'mdi-information-outline',
  },
]
</script>

<template>
  <v-app>
    <v-navigation-drawer
      app
      permanent
      width="260"
    >
      <v-list lines="one" density="compact" nav>
        <v-list-subheader class="text-uppercase text-caption font-weight-bold">
          Design system
        </v-list-subheader>

        <v-list-item
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :title="item.title"
          :prepend-icon="item.icon"
          link
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      flat
      border="b"
    >
      <v-app-bar-title>Design System Docs</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container class="py-8" fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-application {
  min-height: 100vh;
}
</style>
