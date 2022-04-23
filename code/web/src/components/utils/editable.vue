<template>
  <p contenteditable ref="editableEl" @input="input" />
</template>

<script lang="ts" setup>
import {
  defineProps,
  withDefaults,
  ref,
  onMounted,
  defineEmits,
  watch,
} from "vue";

const editableEl = ref<HTMLParagraphElement>();
const txt = ref<string>("");

interface Props {
  value: string;
}

const props = withDefaults(defineProps<Props>(), { value: "" });
const emit = defineEmits<{
  (e: "input", value: string): void;
}>();

onMounted(() => {
  if (!editableEl.value) return;
  editableEl.value.innerText = props.value;
});

const input = () => {
  if (editableEl.value) txt.value = editableEl.value.innerText;
};
watch(txt, (data) => emit("input", data));
</script>

<style lang="scss" scoped></style>
