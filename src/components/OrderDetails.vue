<script setup lang="ts"></script>
<template>
     <div class="container">
        <h1 class="my-4">Detalhes do Pedido #12345</h1>
        <div class="row">
            <div class="col-lg-8">
                <div class="order-details">
                    <h3>Informações do Pedido</h3>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Data do Pedido:</strong> 01/06/2024</li>
                        <li class="list-group-item"><strong>Status:</strong> Em Processamento</li>
                        <li class="list-group-item"><strong>Total:</strong> R$ 130,00</li>
                    </ul>
                </div>
                <div class="order-items">
                    <h3>Itens do Pedido</h3>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-md-8"><strong>Produto 1</strong></div>
                                <div class="col-md-2">Qtd: 2</div>
                                <div class="col-md-2">R$ 50,00</div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-md-8"><strong>Produto 2</strong></div>
                                <div class="col-md-2">Qtd: 1</div>
                                <div class="col-md-2">R$ 30,00</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="mt-4">
                    <a href="#" class="btn btn-secondary">Voltar para Meus Pedidos</a>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="order-summary">
                    <h3>Resumo do Pedido</h3>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Subtotal:</strong> R$ 120,00</li>
                        <li class="list-group-item"><strong>Frete:</strong> R$ 10,00</li>
                        <li class="list-group-item"><strong>Total:</strong> R$ 130,00</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>