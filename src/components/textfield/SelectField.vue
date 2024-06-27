<template>
  <div :class="containerStyles">
    <v-select
      v-model="model"
      :disabled="disabled"
      :color="color"
      :label="label"
      :items="computedItems"
      :itemTitle="itemTitle"
      :itemValue="itemValue"
      :variant="variant"
      :errorMessages="errorMsg"
      :clearable="clearable"
      @update:modelValue="onValueChange"
    >
      <template v-slot:item="{ props, item }">
        <v-list-item
          v-bind="props"
          :disabled="!item.value"
        />
      </template>
    </v-select>
  </div>
</template>

<script setup>
import { computed } from "vue"

const model = defineModel()
const props = defineProps({
  variant: {
    type: String,
    default: "outlined",
  },
  label: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "primary",
  },
  items: {
    type: Array,
    default: Array,
  },
  itemTitle: {
    type: String,
    default: "",
  },
  itemValue: {
    type: String,
    default: "",
  },
  errorMsg: {
    type: String,
    default: "",
  },
  placeHolder: {
    type: String,
    default: "Item",
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  containerStyles: {
    type: String,
    default: "mb-4",
  },
})
const emit = defineEmits(["change"])

const computedItems = computed(() => {
  const result = props.items
  result.unshift({ id: null, name: `Pilih ${props.placeHolder}` })
  return result
})

const onValueChange = (value) => {
  emit("change", value)
}
</script>

<style lang="scss" scoped></style>
