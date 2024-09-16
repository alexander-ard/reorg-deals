<template>
  <div class="search-box">
    <input
      type="text"
      v-model="searchQuery"
      @input="onInput"
      @keydown="onKeyDown"
      placeholder="Search..."
      class="search-box__input"
    />
    <ButtonBox :type="'primary'" :icon="searchIcon" @click="onSearch"> </ButtonBox>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const searchQuery = ref('');
import searchIcon from '@/components/icons/search.svg';
import ButtonBox from './ButtonBox.vue';

const emit = defineEmits(['search']);

const onSearch = () => {
  emit('search', searchQuery.value);
};

const onKeyDown = (event) => {
  if (event.key === 'Enter') {
    onSearch();
  }
};
</script>

<style lang="scss" scoped>
.search-box {
  align-items: center;
  display: flex;

  &__input {
    border: var(--border-secondary);
    border-radius: var(--border-radius-default);
    box-sizing: border-box;
    height: 30px;
    width: 100%;
  }
}
</style>
