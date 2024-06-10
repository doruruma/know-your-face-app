<template>

  <div class="mb-4">
    <v-text-field
      :label="label"
      :hint="hint"
      :type="type"
      v-model="model"
      color="primary"
      variant="outlined"
      :error-messages="errorMsg">
      <template v-slot:prepend-inner>
        <v-icon
          :color="errorMsg !== '' ? 'danger' : iconColor"
          :icon="icon" />
      </template>
    </v-text-field>
  </div>

</template>

<script setup>

const model = defineModel()

defineProps({
  label: {
    type: String,
    default: 'label'
  },
  hint: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  value: {
    type: String,
    default: 'label'
  },
  icon: {
    type: String,
    default: ''
  },
  iconColor: {
    type: String,
    default: 'primary'
  },
  errorMsg: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss" scoped></style>