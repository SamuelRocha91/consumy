<script setup lang="ts">
</script>
<template>
    <div class="container mt-5">
    <div class="card">
        <div class="card-header">
            <h3>Informações de perfil</h3>
        </div>
        <div class="card-body">
            <form>
                <div class="form-group text-center">
                    <img src="" alt="Profile Image" class="img-thumbnail" style="width: 150px; height: 150px;">
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" value="Samuel Rocha" readonly>
                </div>
                <div class="form-group">
                    <label for="cep">CEP</label>
                    <input type="text" class="form-control" id="cep" value="40000-000" readonly>
                </div>
                <div class="form-group">
                    <label for="state">State</label>
                    <input type="text" class="form-control" id="state" value="Bahia" readonly>
                </div>
                <div class="form-group">
                    <label for="city">City</label>
                    <input type="text" class="form-control" id="city" value="Salvador" readonly>
                </div>
                <div class="form-group">
                    <label for="address">Address</label>
                    <input type="text" class="form-control" id="address" value="Rua Travasso do Meio, 27, Bonfim" readonly>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" value="samuel@example.com" readonly>
                </div>
                <div class="form-group text-center">
                    <button type="button" class="btn btn-primary mr-2">Alterar Dados</button>
                    <button type="button" class="btn btn-secondary">Alterar Senha</button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>