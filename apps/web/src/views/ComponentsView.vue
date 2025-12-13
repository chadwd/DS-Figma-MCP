<script setup lang="ts">
import GuaranteedSale from '@/components/GuaranteedSale.vue'

const buttonVariants: Array<{ label: string; color: string; variant: 'flat' | 'elevated' | 'outlined' | 'text' | 'plain' }> = [
  { label: 'Primary', color: 'primary', variant: 'flat' },
  { label: 'Secondary', color: 'secondary', variant: 'flat' },
  { label: 'Elevated', color: 'primary', variant: 'elevated' },
  { label: 'Outlined', color: 'primary', variant: 'outlined' },
  { label: 'Text', color: 'primary', variant: 'text' },
]

const guaranteedSaleVariants = [
  {
    title: 'Center Aligned (Default)',
    props: {
      align: 'Center' as const,
      hasDateTime: true,
      status: 'Accepted' as const,
      priceValue: '22,500',
    },
  },
  {
    title: 'Left Aligned',
    props: {
      align: 'Left' as const,
      hasDateTime: true,
      status: 'Accepted' as const,
      priceValue: '22,500',
    },
  },
  {
    title: 'Available Status',
    props: {
      align: 'Center' as const,
      hasDateTime: true,
      status: 'Available' as const,
      priceValue: '22,500',
    },
  },
  {
    title: 'No DateTime',
    props: {
      align: 'Center' as const,
      hasDateTime: false,
      status: 'Accepted' as const,
      priceValue: '22,500',
    },
  },
  {
    title: 'Expired Status',
    props: {
      align: 'Center' as const,
      hasDateTime: true,
      status: 'Expired' as const,
      priceValue: '22,500',
    },
  },
  {
    title: 'Custom Price',
    props: {
      align: 'Center' as const,
      hasDateTime: true,
      status: 'Accepted' as const,
      priceValue: '45,000',
    },
  },
]
</script>

<template>
  <v-container fluid>
    <v-row class="mb-8" dense>
      <v-col cols="12">
        <h1 class="text-h4 mb-2">Components</h1>
        <p class="text-body-1 text-medium-emphasis">
          Example gallery for design system components. Explore variants and configurations for each component.
        </p>
      </v-col>
    </v-row>

    <!-- Guaranteed Sale Component -->
    <v-row dense class="mb-8">
      <v-col cols="12" class="mb-4">
        <h2 class="text-subtitle-1 text-uppercase text-medium-emphasis mb-3">
          Guaranteed Sale
        </h2>
      </v-col>

      <v-col cols="12">
        <v-card variant="outlined" rounded="lg">
          <v-card-text>
            <div class="text-body-2 text-medium-emphasis mb-6">
              The Guaranteed Sale component displays a guaranteed offer with customizable alignment, pricing, status variants, and optional date/time information.
            </div>

            <div class="grid gap-6">
              <div
                v-for="variant in guaranteedSaleVariants"
                :key="variant.title"
                class="flex flex-col gap-4"
              >
                <div>
                  <p class="text-body-2 text-medium-emphasis mb-3 font-medium">
                    {{ variant.title }}
                  </p>
                  <GuaranteedSale v-bind="variant.props" />
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Buttons Component -->
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
                v-for="variant in buttonVariants"
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

.gap-6 {
  gap: 24px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}
</style>
