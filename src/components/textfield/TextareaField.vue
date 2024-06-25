<template>
  <v-textarea
    :class="containerStyles"
    v-model="model"
    :label="label"
    :readonly="readonly"
    :disabled="disabled"
    :clearable="clearable"
    :placeholder="placeholder"
    :hint="hint"
    :type="type"
    :color="color"
    :variant="variant"
    :error-messages="errorMsg" />
</template>

<script setup>
const model = defineModel()

defineProps({
  readonly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'outlined'
  },
  color: {
    type: String,
    default: 'primary'
  },
  label: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  icon: {
    type: String,
    default: ''
  },
  iconColor: {
    type: String,
    default: 'primary'
  },
  appendIcon: {
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
</script>

<style lang="scss" scoped></style>