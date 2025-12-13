<script setup lang="ts">
const variants: Array<{ label: string; color: string; variant: 'flat' | 'elevated' | 'outlined' | 'text' | 'plain' }> = [
  { label: 'Primary', color: 'primary', variant: 'flat' },
  { label: 'Secondary', color: 'secondary', variant: 'flat' },
  { label: 'Elevated', color: 'primary', variant: 'elevated' },
  { label: 'Outlined', color: 'primary', variant: 'outlined' },
  { label: 'Text', color: 'primary', variant: 'text' },
]
</script>

<template>
  <v-container fluid>
    <v-row class="mb-8" dense>
      <v-col cols="12">
        <h1 class="text-h4 mb-2">Components</h1>
        <p class="text-body-1 text-medium-emphasis">
          Example gallery for base components. Start here with primitives like buttons, inputs, and chips.
        </p>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" class="mb-4">
        <h2 class="text-subtitle-1 text-uppercase text-medium-emphasis mb-3">
          Buttons
        </h2>
      </v-col>

      <v-col cols="12" md="8">
        <v-card variant="outlined" rounded="lg">
          <v-card-text>
            <div class="text-body-2 text-medium-emphasis mb-4">
              These examples are wired to Vuetify's built-in button component but can be extended or
              wrapped in your own design-system `DsButton` component.
            </div>

            <div class="d-flex flex-wrap gap-3">
              <v-btn
                v-for="variant in variants"
                :key="variant.label + variant.variant"
                :color="variant.color"
                :variant="variant.variant"
                class="mr-3 mb-3"
              >
                {{ variant.label }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.gap-3 {
  gap: 12px;
}
</style>
