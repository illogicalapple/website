<template>
  <main id="content">
    <button @click="useAuth0().loginWithRedirect()">Log in</button>
  </main>
</template>
<script setup>
  import { useAuth0 } from '@auth0/auth0-vue';
</script>
