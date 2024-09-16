<template>
  <button
    @click="onClick"
    class="button-box"
    :class="{
      'button-box--secondary': type === 'secondary',
      'button-box--text-only': type === 'text-only'
    }"
  >
    <img v-if="icon" :src="icon" :alt="alt ?? 'Button icon'" :title="alt" />
    <span v-if="text">{{ text }}</span>
  </button>
</template>

<script setup>
const { icon } = defineProps({
  icon: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: false
  },
  alt: {
    type: String,
    required: false
  },
  type: {
    type: String,
    default: 'Primary',
    required: true,
    validator: (val) => {
      return ['primary', 'secondary', 'text-only'].includes(val);
    }
  }
});

const emit = defineEmits(['click']);

const onClick = () => {
  emit('click');
};
</script>

<style lang="scss" scoped>
.button-box {
  background-color: var(--color-accent-secondary);
  border: none;
  border-radius: var(--border-radius-default);
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: flex;
  gap: var(--space-half-x);
  height: 30px;
  margin: var(--space-half-x);
  padding: var(--space-1-x) var(--space-2-x);
  text-wrap: nowrap;

  &:hover {
    background-color: var(--color-accent-secondary-hover);
  }

  &--secondary {
    background-color: white;
    color: var(--color-accent-secondary);
  }

  &--text-only {
    background-color: transparent;
    border: 0;
    color: var(--color-accent-secondary);
    height: auto;
    margin: 0;
    padding: 0;

    &:hover {
      background-color: transparent;
    }
  }

  img {
    height: 15px;
  }
}
</style>
