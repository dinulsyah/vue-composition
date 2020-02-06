<template>
  <div>
  <input class="button-clear button-small float-right" type="submit" value="Log Out" @click="logOutNow">
  <div class="component">
    <input class="button button-clear" type="submit" value="---> See List Of Note <---" @click="toListNote">
    <h3 class="center">Send Your Note</h3>
    <form @submit.prevent="addNote">
    <fieldset>
      <label for="nameField">Send To</label>
      <select id="availableUser" v-model="selectedUser">
        <option value="" selected>Select Available User</option>
        <option :value="user" :key="user" v-for="user in allUsers.data">{{ user }} </option>
      </select>
      <label for="nameField">Note</label>
      <input type="text" :placeholder="placeholder" id="nameField" v-model="inputNote">
      <input class="button-black float-right" type="submit" value="Write" :disabled="isDisable">
    </fieldset>
    </form>
  </div>
  </div>
</template>

<script>
import { Users } from '../users';
import { reactive, ref, computed, onMounted } from '@vue/composition-api'

export default {
  name: 'RefrigeratorNoteForm',
  props:{
    toSection:{
      type:Function,
      required:true
    },
    sendNote:{
      type:Function,
      required:true
    },
    logoutMethod:{
      type:Function,
      required:true
    }
  },
  setup(props){
    let placeholder = ref('')

    let allUsers = reactive({
      data:[]
    })
    let selectedUser = ref('')

    let inputNote = ref('')
    let minNote = ref(10)

    const addNote = () => {
      props.sendNote({
        from:username.value,
        sendTo:selectedUser.value, 
        note:inputNote.value
      })
      selectedUser.value = ''
      inputNote.value = ''
    }

    let username = ref()

    const logOutNow = () => {
      props.logoutMethod()
    }

    const isDisable = computed(() => {
      return !(inputNote.value.length > minNote.value && selectedUser.value !== '');
    })

    const toListNote = () => {
      props.toSection({section:'on-note'})
    }

    onMounted(() => {
      username.value = Users[localStorage.getItem('username')]['name']
      placeholder.value = `life-and-death Note From ${username.value}`
      allUsers.data = Object.keys(Users)
        .filter(user => user !== localStorage.getItem('username'))
        .map(user => Users[user]['name'])
    })

    return {
      placeholder,
      allUsers,
      inputNote,
      selectedUser,
      isDisable,
      addNote,
      toListNote,
      logOutNow
    }
  }
}
</script>

<style scoped>
.button-black {
  background-color: black;
  border-color: black;
}
</style>