<template>
  <div class="component">
      <div class="float-right">
        <input class="button button-clear" type="submit" value="-> Back To Write Your Note" @click="toAddNote">
      </div>
       <h3 class="center">List Of Notes</h3>
        <table>
            <thead>
                <tr>
                    <th>From</th>
                    <th>Send To</th>
                    <th>Note</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="index" v-for="(note,index) in listNote">
                    <td>{{note.from}}</td>
                    <td>{{note.sendTo}}</td>
                    <td>{{note.note}}</td>
                    <td>
                        <button class="button button-outline button-small" @click="deleteList(index)">Delete</button>
                    </td>
                </tr>        
            </tbody>
        </table>
  </div>
</template>

<script>
import useListNote from '../cmp-fun/ListNoteTable'

export default {
    props:{
        toSection:{
            type:Function,
            required:true
        },
        listNote:{
            type:Array,
            required:true
        },
        deleteNote:{
            type:Function,
            required:true
        }
    },
    setup(props){
       return useListNote(props)
    }
}
</script>

<style scoped>
.button-small {
  font-size: .8rem;
  height: 2.8rem;
  line-height: 2.8rem;
  padding: 0 1.5rem;
}
</style>