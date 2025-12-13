<script setup lang="ts">
import { computed } from 'vue'

type AlignVariant = 'Center' | 'Left'
type StatusVariant =
  | 'Available'
  | 'Requested'
  | 'Accepted'
  | 'Expired'
  | 'Not Available'

const props = withDefaults(
  defineProps<{
    priceValue?: string
    align?: AlignVariant
    hasDateTime?: boolean
    status?: StatusVariant
    dateUpdated?: string
    timeUpdated?: string
    dateExpires?: string
    hasTooltip?: boolean
  }>(),
  {
    priceValue: '22,500',
    align: 'Center',
    hasDateTime: true,
    status: 'Accepted',
    dateUpdated: 'Nov 3, 2025',
    timeUpdated: '10:55:04',
    dateExpires: 'Nov 3, 2025',
    hasTooltip: true,
  }
)

const statusClasses = computed(() => {
  const baseClasses =
    'inline-flex items-center px-3 h-6 rounded border text-xs font-medium whitespace-nowrap'

  switch (props.status) {
    case 'Available':
    case 'Requested':
    case 'Accepted':
      return (
        baseClasses +
        ' border-[#99dbc8] bg-[#f3fcf9] text-[#2d7654]'
      )
    case 'Expired':
    case 'Not Available':
      return (
        baseClasses +
        ' border-[#ffcdd2] bg-[#ffebee] text-[#c62828]'
      )
    default:
      return baseClasses
  }
})

const statusLabel = computed(() => {
  switch (props.status) {
    case 'Available':
      return 'Offer Available'
    case 'Accepted':
      return 'Accepted'
    case 'Requested':
      return 'Requested'
    case 'Expired':
      return 'Expired'
    case 'Not Available':
      return 'Not Available'
    default:
      return props.status
  }
})
</script>

<template>
  <div
    v-if="align === 'Left'"
    class="w-80 bg-white border border-[#cfd8dc] rounded-lg p-4 flex flex-col gap-3"
  >
    <!-- Header Section -->
    <div class="flex flex-col gap-1">
      <!-- Title -->
      <div class="flex items-center gap-1">
        <span class="text-sm font-medium text-gray-900">Guaranteed Offer</span>
        <span v-if="hasTooltip" class="text-xs text-gray-600">ⓘ</span>
      </div>

      <!-- Price -->
      <div class="text-3xl font-medium text-gray-900">
        $<span>{{ priceValue }}</span>
      </div>

      <!-- Status Badge -->
      <div :class="statusClasses">
        {{ statusLabel }}
      </div>
    </div>

    <!-- DateTime Section -->
    <div v-if="hasDateTime" class="flex flex-col gap-1 text-sm">
      <!-- Updated -->
      <div class="flex items-center gap-1 text-gray-600">
        <span class="text-xs">🕐</span>
        <span class="whitespace-nowrap">Updated: {{ dateUpdated }}</span>
        <span class="whitespace-nowrap">| {{ timeUpdated }} a.m. EST</span>
      </div>

      <!-- Expires -->
      <div class="flex items-center gap-1 text-gray-600">
        <span class="text-xs">📅</span>
        <span class="whitespace-nowrap">Expires: {{ dateExpires }}</span>
      </div>
    </div>

    <!-- Footer Actions -->
    <div class="flex gap-3 items-center pt-2 border-t border-[#cfd8dc]">
      <button
        class="flex-1 bg-[#616161] text-white font-bold uppercase text-xs py-2 px-4 rounded-full hover:bg-[#4a4a4a] transition-colors"
      >
        Primary Action
      </button>
      <button
        class="flex-1 text-gray-900 font-bold uppercase text-xs py-2 px-4 rounded-full hover:bg-gray-100 transition-colors border border-gray-300"
      >
        Secondary Action
      </button>
    </div>
  </div>

  <div
    v-else
    class="w-80 bg-white border border-[#cfd8dc] rounded-lg p-4 flex flex-col gap-3"
  >
    <!-- Header Section -->
    <div class="flex flex-col gap-1 items-center text-center">
      <!-- Title -->
      <div class="flex items-center gap-1 justify-center">
        <span class="text-sm font-medium text-gray-900">Guaranteed Offer</span>
        <span v-if="hasTooltip" class="text-xs text-gray-600">ⓘ</span>
      </div>

      <!-- Price -->
      <div class="text-3xl font-medium text-gray-900">
        $<span>{{ priceValue }}</span>
      </div>

      <!-- Status Badge -->
      <div :class="statusClasses">
        {{ statusLabel }}
      </div>
    </div>

    <!-- DateTime Section -->
    <div v-if="hasDateTime" class="flex flex-col gap-1 text-sm text-center">
      <!-- Updated -->
      <div class="flex items-center gap-1 text-gray-600 justify-center">
        <span class="text-xs">🕐</span>
        <span class="whitespace-nowrap">Updated: {{ dateUpdated }}</span>
        <span class="whitespace-nowrap">| {{ timeUpdated }} a.m. EST</span>
      </div>

      <!-- Expires -->
      <div class="flex items-center gap-1 text-gray-600 justify-center">
        <span class="text-xs">📅</span>
        <span class="whitespace-nowrap">Expires: {{ dateExpires }}</span>
      </div>
    </div>

    <!-- Footer Actions -->
    <div class="flex gap-3 items-center justify-center pt-2 border-t border-[#cfd8dc]">
      <button
        class="bg-[#616161] text-white font-bold uppercase text-xs py-2 px-6 rounded-full hover:bg-[#4a4a4a] transition-colors"
      >
        Primary Action
      </button>
      <button
        class="text-gray-900 font-bold uppercase text-xs py-2 px-6 rounded-full hover:bg-gray-100 transition-colors border border-gray-300"
      >
        Secondary Action
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Ensure icon colors are respected */
:deep(.v-icon) {
  color: inherit;
}
</style>
