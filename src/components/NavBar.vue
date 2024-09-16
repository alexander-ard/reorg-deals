<template>
  <nav class="navbar">
    <div class="navbar__brand">
      <a href="https://reorg.com/" class="navbar__item">R</a>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  align-items: center;
  background-color: var(--color-accent);
  display: flex;
  height: var(--header-height);

  a {
    color: var(--color-white);
    cursor: pointer;
    text-decoration: none;
  }

  &__brand {
    background: var(--color-brand);
    font-size: 38px;
    font-weight: 600;
    line-height: 59px;
    padding: 0 20px 0 17px;
  }

  &__menu {
    display: flex;
    gap: 30px;
    margin: auto;
  }

  &__item {
    color: var(--color-white);
  }
}
</style>
