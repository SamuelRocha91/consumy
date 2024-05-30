import { ref } from 'vue';

const quantity = ref(0);

export const useSharedRefs = () => {
  return {
    quantity
  };
};
