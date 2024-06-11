<script setup lang="ts"></script>

<template>
  <div class="chat-wrapper flex flex-col h-full">
    <div class="chat-history flex-1 overflow-auto">
      <div class="chat chat-end">
        <div class="chat-header opacity-50 mr-2">
          Milan
        </div>
        <div class="chat-bubble">
          You underestimate my power!
        </div>
      </div>
      <div class="chat chat-end">
        <div class="chat-header opacity-50 mr-2">
          Milan
        </div>
        <div class="chat-bubble chat-bubble-success">
          You underestimate my power!
        </div>
      </div>
      <div class="chat chat-end">
        <div class="chat-header opacity-50 mr-2">
          Milan
        </div>
        <div class="chat-bubble chat-bubble-error">
          You underestimate my power!
        </div>
      </div>
      <div class="chat chat-end">
        <div class="chat-header opacity-50 mr-2">
          Milan
        </div>
        <div class="chat-bubble chat-bubble-error">
          You were the Chosen One!
        </div>
      </div>
    </div>
    <div class="chat-box mt-auto">
      <input
        type="text"
        placeholder="Type your guess here"
        class="input input-bordered input-sm w-full"
      >
    </div>
  </div>
</template>
