<template>
  <div class="component">
    <h3 class="title">Vue Composition API</h3>
    <form @submit.prevent="loginForm">
    <fieldset>
      <label for="usernameField">Name</label>
      <input type="text" placeholder="Yuji Nishida" id="usernameField" v-model="username">
      <label for="passwordField">Password</label>
      <input type="password" placeholder="Super Secret Password" id="passwordField" v-model="password">
      <input class="button-primary float-right" type="submit" value="Start" :disabled="isDisable">
    </fieldset>
    </form>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'

export default {
  name: 'RefrigeratorLoginForm',
  props: {
    loginMethod: {
      type:Function,
      required:true
    }
  },
  setup(props){
    let username = ref('')
    let password = ref('')
    let minUsername = ref(5)
    let minPassword = ref(5)
    
    const loginForm = () => {
      props.loginMethod({username:username.value,password:password.value})
      username.value = ''
      password.value = ''
    }

    const isDisable = computed(() => {
       return !(username.value.length > minUsername.value && password.value.length > minPassword.value)
    })

    return{
      username,
      password,
      loginForm,
      isDisable
    }
  }
}
</script>

<style scoped>
</style>