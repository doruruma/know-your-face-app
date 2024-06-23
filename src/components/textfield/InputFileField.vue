<template>
  <div :class="containerStyles">
    <v-file-input
      v-model="model"
      :label="label"
      :hint="hint"
      :color="color"
      :variant="variant"
      :prepend-icon="null"
      :error-messages="errorMsg"
      @click:clear="onClear"
      accept="image/*">
      <template v-if="icon !== ''" v-slot:prepend-inner>
        <v-icon
          :color="errorMsg !== '' ? 'danger' : iconColor"
          :icon="icon" />
      </template>
    </v-file-input>
  </div>
</template>

<script setup>
const model = defineModel()
const emit = defineEmits(['clear'])
defineProps({
  variant: {
    type: String,
    default: 'outlined'
  },
  label: {
    type: String,
    default: ""
  },
  color: {
    type: String,
    default: 'primary'
  },
  icon: {
    type: String,
    default: ''
  },
  iconColor: {
    type: String,
    default: 'primary'
  },
  hint: {
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

const onClear = () => {
  emit('clear')
}
</script>

<style lang="scss" scoped></style>