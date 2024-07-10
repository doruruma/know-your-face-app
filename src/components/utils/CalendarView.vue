<template>
  <v-calendar
    text="Hari ini"
    locale="id"
    v-model="value"
    :events="computedData"
    :view-mode="type"
    :weekdays="weekday"
  />
</template>

<script setup>
import { computed, ref } from "vue"
import { useDate } from "vuetify"

const props = defineProps({
  data: {
    type: Array,
    default: Array,
  },
})

const type = ref("month")
const weekday = ref([0, 1, 2, 3, 4, 5, 6])
const value = ref(new Date())
const colors = ref([
  "blue",
  "indigo",
  "deep-purple",
  "cyan",
  "green",
  "orange",
  "grey darken-1",
])
const { startOfDay, endOfDay } = useDate()

const random = (a, b) => {
  return Math.floor((b - a + 1) * Math.random()) + a
}

const computedData = computed(() => {
  const result = []
  props.data.map((value) => {
    result.push({
      title: value.name,
      start: startOfDay(new Date(value.date)),
      end: endOfDay(new Date(value.date)),
      color: colors.value[random(0, colors.value.length - 1)],
    })
  })
  return result
})
</script>

<style lang="scss" scoped></style>
