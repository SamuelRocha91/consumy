<script setup lang="ts"> 
import { onBeforeMount, onMounted, ref } from 'vue';
import consumer from '../utils/cable'; 
import { Auth } from '@/utils/auth';

const auth = new Auth();
const currentUser = ref(auth.currentUser());

const { id } = defineProps<{ id: number }>();

let subscription: any;

const messages = ref<any[]>([]);
const newMessage = defineModel('newMessage', {default: ''});
const sendMessage = () => {
  if (newMessage.value.trim() === '') return;
  subscription.perform('speak', { message: newMessage.value, email: currentUser.value?.email });
  newMessage.value = '';
};

const visible = ref(false);
  
onMounted(() => {

  subscription = consumer.subscriptions.create(

    { channel: 'ChatChannel', order_id: id},
    {

      connected: (): void => {

        console.log('Connected to chat channel');

      },

      disconnected: ():void => {

        console.log('Disconnected from chat channel');

      },

      received: (data: any):void => {
        console.log(data);
        messages.value.push(data);
      },

    }

  );
}); 

onBeforeMount(() => {
  if (subscription) {
    subscription.unsubscribe();
  }
});

</script> 
<template>
  <div class="container chat-room"> 
      <div @click="visible = !visible" class="chat-btn">Chat</div>
    <div v-if="visible">
      <div class="area-text">
        <div id="messages" class="border rounded p-3 mb-3 overflow-auto" style="height: 70vh;">
          <div v-for="(data, index) in messages" :key="index" class="mb-2">
            <p class="mb-1 font-weight-bold">{{ data.user }}</p>
            <p class="mb-1">{{ data.message }}</p>
          </div>
        </div>
      </div>
      <div class="message-send">
        <div class="input-group send-message">
          <input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            placeholder="Type a message..."
            class="form-control"
          >
          <div class="input-group-append">
            <button @click.prevent="sendMessage" class="btn btn-primary">Send</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-room {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.area-text {
  flex: 1;
  width: 100%;
  height: 50%;
}

.message-send {
  width: 100%;
}

.chat-btn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 32px;
  text-decoration: none; 
  transition: background-color 0.3s, transform 0.2s;
}

.chat-btn:hover {
  background-color: #0056b3;
}

.chat-btn:active {
  transform: scale(0.98);
}

.send-message {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}

.message-send {
  width: 100%;
}

#messages {
  background-color: #f8f9fa;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  overflow-y: auto;
  height: 70vh;
}

.message {
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  max-width: 80%;
}

.message.user {
  background-color: #007bff;
  color: white;
  margin-left: auto;
}

.message.other {
  background-color: #e9ecef;
  color: black;
  margin-right: auto;
}

.send-message {
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: #f8f9fa;
  border-top: 1px solid #ccc;
}


.send-message button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .chat-btn {
    font-size: 24px;
    padding: 8px;
  }

  .send-message {
    flex-direction: column;
  }

  .send-message input {
    border-radius: 5px;
    margin-bottom: 5px;
  }

  .send-message button {
    border-radius: 5px;
    width: 100%;
  }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.message {
  animation: fadeIn 0.3s ease-in;
}

</style>
