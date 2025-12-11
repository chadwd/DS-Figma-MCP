<script setup lang="ts">
const colors = [
  { name: 'Primary', token: 'primary', class: 'bg-primary' },
  { name: 'Secondary', token: 'secondary', class: 'bg-secondary' },
  { name: 'Surface', token: 'surface', class: 'bg-surface' },
  { name: 'Error', token: 'error', class: 'bg-error' },
]

const typography = [
  { name: 'Display Large', class: 'text-h2', description: 'Hero / page title' },
  { name: 'Headline Medium', class: 'text-h4', description: 'Section heading' },
  { name: 'Body', class: 'text-body-1', description: 'Primary body copy' },
  { name: 'Caption', class: 'text-caption', description: 'Metadata / labels' },
]
</script>

<template>
  <v-container fluid>
    <v-row class="mb-8" align="stretch" dense>
      <v-col cols="12">
        <h1 class="text-h4 mb-2">Tokens</h1>
        <p class="text-body-1 text-medium-emphasis">
          Core design tokens exposed through the theme: color and typography examples shown below.
        </p>
      </v-col>
    </v-row>

    <v-row class="mb-6" dense>
      <v-col cols="12">
        <h2 class="text-subtitle-1 text-uppercase text-medium-emphasis mb-3">
          Color
        </h2>
      </v-col>

      <v-col
        v-for="color in colors"
        :key="color.token"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card rounded="lg" variant="outlined">
          <v-sheet
            :class="['token-swatch', color.class]"
            rounded="t-lg"
          />
          <v-card-text>
            <div class="text-subtitle-2">{{ color.name }}</div>
            <div class="text-caption text-medium-emphasis">token: {{ color.token }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <h2 class="text-subtitle-1 text-uppercase text-medium-emphasis mb-3">
          Typography
        </h2>
      </v-col>

      <v-col
        v-for="item in typography"
        :key="item.name"
        cols="12"
        md="6"
      >
        <v-card class="mb-3" variant="outlined" rounded="lg">
          <v-card-text>
            <div :class="[item.class, 'mb-1']">
              {{ item.name }}
            </div>
            <div class="text-body-2 text-medium-emphasis">
              {{ item.description }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.token-swatch {
  height: 96px;
}
</style>
