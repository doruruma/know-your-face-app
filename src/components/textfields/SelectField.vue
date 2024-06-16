<template>
  <div :class="containerStyles">
    <v-select
      :color="color"
      v-model="model"
      :label="label"
      :items="computedItems"
      :item-title="itemTitle"
      :item-value="itemValue"
      :variant="variant"
      :error-messages="errorMsg">
      <template v-slot:item="{ props, item }">
        <v-list-item
          v-bind="props"
          :disabled="!item.value" />
      </template>
    </v-select>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const model = defineModel()
const props = defineProps({
  variant: {
    type: String,
    default: 'outlined'
  },
  label: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'primary'
  },
  items: {
    type: Array,
    default: Array
  },
  itemTitle: {
    type: String,
    default: ''
  },
  itemValue: {
    type: String,
    default: ''
  },
  errorMsg: {
    type: String,
    default: ''
  },
  containerStyles: {
    type: String,
    default: 'mb-4'
  }
})
const computedItems = computed(() => {
  const result = props.items
  result.unshift({ id: null, name: 'Pilih Posisi Pegawai' })
  return result
})
</script>

<style lang="scss" scoped></style>