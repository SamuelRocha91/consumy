<script setup lang="ts">
</script>
<template>
<div class="container">
    <div class="filters-menu row">
        <div class="col-md-6 mb-3">
            <input
                id="search-item"
                class="form-control bg-input-2"
                placeholder="Busque pelo nome da loja"
                type="search"
            >
        </div>
        <div class="col-md-6 mb-3">
            <select
                id="category-filter"
                class="form-control select-box-2"
            >
                <option value="" disabled selected>
                    Filtrar por categoria
                </option>
                <option value="categoria">
                    Categoria
                </option>
            </select>
        </div>
    </div>
</div>
<div class="container">
    <div class="row">
        <div class="col-md-4">
            <div class="card card-store">
                <img src="https://via.placeholder.com/350x200" class="card-img-top" alt="Store Image">
                <div class="card-body">
                    <h5 class="card-title">Nome da Loja</h5>
                    <p class="card-text">Descrição breve da loja. Pode incluir informações sobre os produtos ou serviços oferecidos.</p>
                    <p class="card-text"><strong>Categoria:</strong> Alimentos</p>
                    <p class="card-text"><strong>Distância:</strong> 2 km</p>
                    <a href="#" class="btn btn-primary">Ver Produtos</a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style setup>
.filters-menu {
    margin: 20px 0;
}
.bg-input-2 {
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  padding: 10px;
  border-radius: .25rem;
}
.select-box-2 {
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  padding: 10px;
  border-radius: .25rem;
  width: 100%;
 }
 
.card-store {
    margin: 20px;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
