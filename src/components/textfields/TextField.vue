<template>

  <v-text-field
    class="mb-4"
    :label="label"
    :hint="hint"
    :type="type"
    v-model="model"
    color="primary"
    variant="outlined">
    <template v-slot:prepend-inner>
      <v-icon
        :color="iconColor"
        :icon="icon" />
    </template>
  </v-text-field>

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
  }
})

</script>

<style lang="scss" scoped></style>