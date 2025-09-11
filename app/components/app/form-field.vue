<script setup lang="ts">
const { type = "text" } = defineProps<{
  label: string;
  name: string;
  type?: "text" | "number" | "textarea";
  error?: string;
  disabled?: boolean;
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ label }}
    </legend>
    <Field
      :as="type === 'textarea' ? 'textarea' : 'input'"
      :name="name"
      :type="type"
      :disabled="disabled"
      class="w-full"
      :class="{
        'input-error': error,
        'input': type === 'text' || type === 'number',
        'textarea': type === 'textarea' }"
    />
    <p v-if="error" class="label text-error">
      {{ error }}
    </p>
  </fieldset>
</template>
