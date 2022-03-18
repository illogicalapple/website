<template>
  <main id="content">
    <button @click="login">Log in</button>
  </main>
</template>
<script>
  import { useAuth0 } from '@auth0/auth0-vue';
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  const login = () => {
    try {loginWithRedirect();} catch(e) {console.log(e.message)}
    console.log('success');
    console.log(user);
  };
</script>
