<template>
  <main id="content">
    <button @click="login">Log in</button>
  </main>
</template>
<script>
  import { useAuth0 } from '@auth0/auth0-vue';
  const { loginWithRedirect } = useAuth0();
  const login = () => {
    loginWithRedirect();
  };
</script>
