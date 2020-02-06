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
export default {
  name: 'RefrigeratorLoginForm',
  props: {
    loginMethod: {
      type:Function,
      required:true
    }
  },
  data(){
    return{
      username:'',
      password:'',
      minUsername:5,
      minPassword:5
    }
  },
  computed:{
    isDisable:function(){
      return !(this.username.length > this.minUsername && this.password.length > this.minPassword)
    }
  },
  methods:{
    loginForm(){
      this.loginMethod({username:this.username,password:this.password})
      this.username = ''
      this.password = ''
    }
  }
}
</script>

<style scoped>
</style>