<template>
  <div :class="containerStyles">
    <v-date-input
      :color="color"
      v-model="model"
      cancel-text="Batal"
      :label="label"
      :variant="variant"
      :error-messages="errorMsg"
      :prepend-icon="null"
      prepend-inner-icon="mdi-calendar"
      readonly
      @update:model-value="onValueChange"
      :clearable="clearable" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const model = ref(null)
const emit = defineEmits([
  'onValueChange'
])

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
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
  icon: {
    type: String,
    default: 'mdi-calendar'
  },
  errorMsg: {
    type: String,
    default: ''
  },
  clearable: {
    type: Boolean,
    default: false
  },
  containerStyles: {
    type: String,
    default: 'mb-4'
  }
})

const onValueChange = value => {
  emit('onValueChange', value)
}

watch(props, () => {
  if (props.value !== '')
    model.value = new Date(props.value)
})
</script>

<style lang="scss" scoped></style>