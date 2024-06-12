<script setup lang="ts">
  import { shallowRef, computed } from 'vue';

  interface Props {
    name: string;
    size?: string;
  }

  const props = defineProps<Props>();

  let iconComponent = shallowRef<null | any>(null);

  const loadIcon = async (name: string) => {
    try {
      const iconPath = `./${name}.vue`;
      const module = await import(/* @vite-ignore */ iconPath);
      iconComponent.value = module.default;
    } catch (error) {
      console.error(`Failed to load icon component: ${name}`, error);
      iconComponent.value = null;
    }
  };

  if (props.name) {
    loadIcon(props.name);
  }

  const iconClass = computed(() => {
    switch (props.size) {
      case 'sm':
        return 'icon sm';
      case 'md':
        return 'icon md';
      case 'lg':
        return 'icon lg';
      case 'xl':
        return 'icon xl';
      default:
        return 'icon md';
    }
  });
</script>

<template>
  <component
    :is="iconComponent"
    :class="iconClass"
  />
</template>

<style scoped>
  .icon {
    display: inline-block;
    vertical-align: middle;
  }

  .icon.sm {
    max-height: 16px;
    max-width: 16px;
  }

  .icon.md {
    max-height: 24px;
    max-width: 24px;
  }

  .icon.lg {
    max-height: 32px;
    max-width: 32px;
  }

  .icon.xl {
    max-height: 48px;
    max-width: 48px;
  }
</style>
