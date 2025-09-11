<script setup lang="ts">
const isSidebarOpen = ref(true);

onMounted(() => {
  isSidebarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", isSidebarOpen.value.toString());
}
</script>

<template>
  <div class="flex-1 flex">
    <div
      class="bg-base-100 transition-all duration-300"
      :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }"
    >
      <div
        class="flex hover:cursor-pointer hover:bg-base-200 p-2"
        :class="{ 'justify-end': isSidebarOpen, 'justify-center': !isSidebarOpen }"
        @click="toggleSidebar"
      >
        <Icon v-if="isSidebarOpen" name="tabler:chevron-left" size="32" />
        <Icon v-else name="tabler:chevron-right" size="32" />
      </div>
      <div class="flex flex-col">
        <SidebarButton
          to="/dashboard"
          icon="tabler:map"
          label="Locations"
          :show-label="isSidebarOpen"
        />
        <SidebarButton
          to="/dashboard/add"
          icon="tabler:circle-plus-filled"
          label="Add Location"
          :show-label="isSidebarOpen"
        />
        <div class="divider" />
        <SidebarButton
          to="/sign-out"
          icon="tabler:logout-2"
          label="Sign out"
          :show-label="isSidebarOpen"
        />
      </div>
    </div>
    <div class="flex-1" />
  </div>
</template>
