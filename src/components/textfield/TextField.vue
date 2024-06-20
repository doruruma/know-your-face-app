<template>
  <div :class="containerStyles">
    <v-text-field
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
      :error-messages="errorMsg"
      @click="onClick"
      @click:clear="onClear">
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
  'appendInnerOnClick',
  'click',
  'clear'
])
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

const appendInnerOnClick = () => {
  emit('appendInnerOnClick')
}

const onClick = () => {
  emit('click')
}

const onClear = () => {
  emit('clear')
}
</script>

<style lang="scss" scoped></style>