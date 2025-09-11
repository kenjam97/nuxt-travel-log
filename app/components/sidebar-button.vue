<script setup lang="ts">
const { to, icon, label, showLabel } = defineProps<{
  to: string;
  icon: string;
  label: string;
  showLabel: boolean;
}>();

const route = useRoute();
</script>

<template>
  <div
    class="tooltip-right"
    :class="{ tooltip: !showLabel }"
    :data-tip="showLabel ? undefined : label"
  >
    <NuxtLink
      class="flex flex-nowrap whitespace-nowrap gap-2 p-2 hover:bg-base-300 hover:cursor-pointer"
      :class="{
        'bg-base-200': route.path === to,
        'justify-start': showLabel,
        'justify-center': !showLabel,
      }"
      :to="to"
    >
      <Icon :name="icon" size="24" />
      <Transition name="grow">
        <span v-if="showLabel">
          {{ label }}
        </span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style scoped>
.grow-enter-active {
  animation: grow 0.1s;
}
.grow-leave-active {
  animation: grow 0.1s reverse;
}
@keyframes grow {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
