export type SidebarItem = {
  id: string;
  label: string;
  icon: string;
  href: string;
};

export const useSidebarStore = defineStore("useSidebarStore", () => {
  const sidebarItems = ref<SidebarItem[]>([]);
  const loading = ref(false);

  if (import.meta.server) {
    loading.value = true;
  }

  return {
    sidebarItems,
    loading,
  };
});
