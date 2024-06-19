<template>
  <div :class="containerStyles">
    <v-text-field
      v-model="model"
      :label="label"
      :hint="hint"
      :type="type"
      :color="color"
      :variant="variant"
      :error-messages="errorMsg">
      <template v-if="icon !== ''" v-slot:prepend-inner>
        <v-icon
          :color="errorMsg !== '' ? 'danger' : iconColor"
          :icon="icon" />
      </template>
      <template v-if="appendIcon !== ''" v-slot:append-inner>
        <v-icon
          @click="appendInnerOnClick"
          :color="iconColor"
          :icon="appendIcon" />
      </template>
    </v-text-field>
  </div>
</template>

<script setup>
const model = defineModel()
const emit = defineEmits([
  'appendInnerOnClick'
])
defineProps({
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

const appendInnerOnClick = () => {
  emit('appendInnerOnClick')
}
</script>

<style lang="scss" scoped></style>