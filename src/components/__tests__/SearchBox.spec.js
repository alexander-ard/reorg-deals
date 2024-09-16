import { shallowMount } from '@vue/test-utils';
import SearchBox from '../SearchBox.vue';
import { describe, test, expect } from 'vitest';

describe('SearchBox.vue', () => {
  const wrapper = shallowMount(SearchBox);

  test('renders correctly', () => {
    expect(wrapper.find('input').exists()).toBe(true);
  });

  test('updates searchQuery on input', async () => {
    const input = wrapper.find('input');

    await input.setValue('test');
    expect(wrapper.vm.searchQuery).toBe('test');
  });

  test('emits search event with searchQuery onSearch', async () => {
    const input = wrapper.find('input');
    wrapper.vm.onSearch();
    await input.setValue('test');

    expect(wrapper.emitted('search')).toBeTruthy();
    expect(wrapper.emitted('search')[0]).toEqual(['test']);
  });

  test('emits search event with searchQuery on Enter key press', async () => {
    const input = wrapper.find('input');

    await input.setValue('test');
    await input.trigger('keydown', { key: 'Enter' });

    expect(wrapper.emitted('search')).toBeTruthy();
    expect(wrapper.emitted('search')[0]).toEqual(['test']);
  });
});
