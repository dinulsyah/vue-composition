<template>
  <div id="app">
    <RefrigeratorLoginForm v-show="onPage === 'on-no-login'" :login-method="loginRefrigerator"/>
    <RefrigeratorNoteForm v-if="onPage === 'on-login'" :to-section="changeSection" :send-note="addNoteToList" :logout-method="logoutRefrigerator"/>
    <ListNoteTable v-show="onPage === 'on-note'" :to-section="changeSection" :list-note="noteList.data" :delete-note="deleteNote"/>
    <modal name="delete" width="70%" height="auto">
        Horay You Just Deleting One Note...
    </modal>
    <modal name="error-login" width="70%" height="auto">
        Sorry, your username/password was incorrect. Please double-check your username/password 
    </modal>
    <modal name="logout" width="70%" height="auto">
        You Have Sign Out, Come Back Anytime
    </modal>
  </div>
</template>

<script>
import RefrigeratorLoginForm from './components/RefrigeratorLoginForm.vue'
import RefrigeratorNoteForm from './components/RefrigeratorNoteForm.vue'
import ListNoteTable from './components/ListNoteTable'
import { reactive, ref, onMounted, watch } from '@vue/composition-api'
import { Users } from './users'

export default {
  name: 'app',
  components: {
    RefrigeratorLoginForm,
    RefrigeratorNoteForm,
    ListNoteTable
  },
   setup(props,context){
    let noteList = reactive({
      data:[]
    })

    const addNoteToList = ({from,sendTo,note}) => {
      noteList.data.push({
        from,
        sendTo,
        note
      })
    }

    const deleteNote = (index) => {
      noteList.data.splice(index,1)
      context.root.$modal.show('delete')
    }

    let onPage = ref(null)

    const changeSection = ({section}) => {
      onPage.value = section
      localStorage.setItem('section',section)
    }

    let username = ref('')

    const setLogin = (user_name) => {
      onPage.value = 'on-login';
      username.value = user_name;
      localStorage.setItem('section',onPage.value)
      localStorage.setItem('username',username.value)
    }

    const loginRefrigerator = ({username, password}) => {
        (Users[username] && Users[username]['password'] === password) 
        ? setLogin(username) 
        : modalShow()
    }

    let logoutState = ref(false)

    const logoutRefrigerator = () => {
        logoutState.value = true
    }

    const modalLogout = () => {
      context.root.$modal.show('logout')
    }

    watch(() => {
      if(logoutState.value){
        onPage.value = 'on-no-login'
        localStorage.clear()
        modalLogout()
        logoutState.value = false
      }
    })

    const modalShow = () => {
      context.root.$modal.show('error-login')
      //this.$modal.show('error-login')
    }

    onMounted(() => {
      (Users[localStorage.getItem('username')]) 
      ? (onPage.value = localStorage.getItem('section')) 
      : onPage.value = 'on-no-login'
    })

    return{
      noteList,
      onPage,
      loginRefrigerator,
      addNoteToList,
      deleteNote,
      changeSection,
      logoutRefrigerator
    }
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
