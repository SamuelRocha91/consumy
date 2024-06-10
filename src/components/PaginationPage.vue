<script setup lang="ts">
</script>
<template>
  <nav>
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" @click.prevent="changePage(currentPage - 1)" href="#">Anterior</a>
      </li>
      <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
        <a class="page-link" @click.prevent="changePage(page)" href="#">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" @click.prevent="changePage(currentPage + 1)" href="#">Próxima</a>
      </li>
    </ul>
  </nav>
</template>