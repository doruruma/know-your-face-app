<template>
  <div :class="`${containerStyles} d-flex align-center`">
    <v-date-input
      readonly
      v-model="model"
      cancelText="Batal"
      :allowedDates="allowedDates"
      :hideDetails="hideDetails"
      :color="color"
      :label="label"
      :variant="variant"
      :errorMessages="errorMsg"
      :prependIcon="null"
      prependInnerIcon="mdi-calendar"
      @update:model-value="onValueChange"
      :clearable="clearable"
    />
    <v-btn
      v-if="dismissable"
      class="ml-2"
      color="red"
      size="small"
      icon="mdi-close"
      variant="text"
      @click="onDismiss"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue"

const model = ref(null)
const emit = defineEmits(["onValueChange", "dismiss"])

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  allowedDates: {
    type: Boolean || Array,
    default: true,
  },
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
  icon: {
    type: String,
    default: "mdi-calendar",
  },
  errorMsg: {
    type: String,
    default: "",
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  dismissable: {
    type: Boolean,
    default: false,
  },
  hideDetails: {
    type: Boolean,
    default: false,
  },
  containerStyles: {
    type: String,
    default: "mb-4",
  },
})

const onValueChange = (value) => {
  emit("onValueChange", value)
}

const onDismiss = () => {
  emit("dismiss")
}

watch(props, () => {
  if (props.value !== "") model.value = new Date(props.value)
})
</script>

<style lang="scss" scoped></style>
