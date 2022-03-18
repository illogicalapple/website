<template>
  <main id="content">
    <button @click="loginWithRedirect()">Log in</button>
  </main>
</template>
<script setup>
  import { useAuth0 } from '@auth0/auth0-vue'
  const { loginWithRedirect } = useAuth0();
  alert(loginWithRedirect.toString());
</script>
