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
        <option :value="user" :key="user" v-for="user in allUsers">{{ user }} </option>
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

export default {
  data(){
    return{
      placeholder:'',
      allUsers:[],
      inputNote:'',
      minNote:10,
      username:'',
      selectedUser:''
    }
  },
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
  computed:{
    isDisable:function(){
      return !(this.inputNote.length > this.minNote && this.selectedUser !== '');
    }
  },
  methods:{
    toListNote(){
      this.toSection({section:'on-note'})
    },
    addNote(){
      this.sendNote({
        from:this.username,
        sendTo:this.selectedUser, 
        note:this.inputNote
      })
      this.selectedUser = ''
      this.inputNote = ''
    },
    logOutNow(){
      this.logoutMethod()
    }
  },
  mounted(){
    this.username = Users[localStorage.getItem('username')]['name']
    this.placeholder = `life-and-death Note From ${this.username}`
    this.allUsers = Object.keys(Users)
      .filter(user => user !== localStorage.getItem('username'))
      .map(user => Users[user]['name'])
  }
}
</script>

<style scoped>
.button-black {
  background-color: black;
  border-color: black;
}
</style>