<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProfileData from '@/components/ProfileData.vue';
import FormProfile from '@/components/FormProfile.vue';
import { useSharedRefs } from '@/utils/useSharedRefs';
import { createStorage } from '@/utils/storage';

const isFormPassword = ref(false);
const isEdit = ref(false);
const quantity = useSharedRefs().quantity;
const storage = createStorage(true);

const managerPages = (param = 'update') => {
  isEdit.value = !isEdit.value;
  if (param == 'update') {
    isFormPassword.value = false;
  } else {
    isFormPassword.value = true;
  }
};

onMounted(() => {
  const data = storage.get('cart') || '[]';
  const dataParsed = JSON.parse(data);
  if (dataParsed) {
    quantity.value = dataParsed
      .reduce((acc: any, curr: any) => acc + curr.quantity, 0);;
  }
});
</script>
<template>
  <FormProfile 
  :handleClick="managerPages"
   v-if="isEdit" :isFormPassword="isFormPassword"
    />
  <ProfileData v-else :handleClick="managerPages" />
</template>

<style scoped>
</style>