<template>
  <div id="app">
    <RefrigeratorLoginForm v-show="onPage === 'on-no-login'" :login-method="loginRefrigerator"/>
    <RefrigeratorNoteForm v-if="onPage === 'on-login'" :to-section="changeSection" :send-note="addNoteToList"/>
    <ListNoteTable v-show="onPage === 'on-note'" :to-section="changeSection" :list-note="noteList" :delete-note="deleteNote"/>
    <modal name="delete" width="70%" height="auto">
        Horay You Just Deleting One Note...
    </modal>
    <modal name="error-login" width="70%" height="auto">
        Sorry, your username/password was incorrect. Please double-check your username/password 
    </modal>
  </div>
</template>

<script>
import RefrigeratorLoginForm from './components/RefrigeratorLoginForm.vue'
import RefrigeratorNoteForm from './components/RefrigeratorNoteForm.vue'
import ListNoteTable from './components/ListNoteTable'
import { Users } from './users'

export default {
  name: 'app',
  components: {
    RefrigeratorLoginForm,
    RefrigeratorNoteForm,
    ListNoteTable
  },
  data(){
    return{
      noteList:[],
      onPage: null
    }
  },
  methods:{
    loginRefrigerator({username, password}){
      (Users[username] && Users[username]['password'] === password) 
        ? this.setLogin(username) 
        : this.modalShow()
    },
    addNoteToList({from,sendTo,note}){
      this.noteList.push({
        from,
        sendTo,
        note
      })
    },
    deleteNote(index){
      this.noteList.splice(index,1)
      this.$modal.show('delete')
    },
    setLogin(username){
      this.onPage = 'on-login';
      this.username = username;
      localStorage.setItem('section',this.onPage)
      localStorage.setItem('username',this.username)
    },
    changeSection({section}){
      this.onPage = section
      localStorage.setItem('section',section)
    },
    modalShow(){
      this.$modal.show('error-login');
    }
  },
  created(){
    (Users[localStorage.getItem('username')]) 
      ? (this.onPage = localStorage.getItem('section')) 
      : this.onPage = 'on-no-login'
  }
}
</script>

<style>
.center{
  text-align: center;
}

.component{
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

</style>
