import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ButtonBox from '../ButtonBox.vue';

describe('ButtonBox', () => {
  test('renders correctly with icon and text', () => {
    const wrapper = mount(ButtonBox, {
      props: {
        icon: '/path/to/icon.png',
        text: 'Click me',
        alt: 'Icon alt text',
        type: 'primary'
      }
    });

    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('img').attributes('src')).toBe('/path/to/icon.png');
    expect(wrapper.find('img').attributes('alt')).toBe('Icon alt text');
    expect(wrapper.find('span').text()).toBe('Click me');
  });

  test('emits click event when clicked', async () => {
    const wrapper = mount(ButtonBox);
    await wrapper.trigger('click');

    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  test('renders without icon when not provided', () => {
    const wrapper = mount(ButtonBox, {
      props: {
        text: 'No Icon'
      }
    });
    expect(wrapper.find('img').exists()).toBe(false);
  });

  test('uses default alt text when alt prop is not provided', () => {
    const wrapper = mount(ButtonBox, {
      props: {
        icon: '/path/to/icon.png'
      }
    });
    expect(wrapper.find('img').attributes('alt')).toBe('Button icon');
  });
});
