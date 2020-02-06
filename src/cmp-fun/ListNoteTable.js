export default function(props){
    const toAddNote = () => {
        props.toSection({section:'on-login'})
    }

    const deleteList = (index) => {
        props.deleteNote(index)
    }
    
    return {
        toAddNote,
        deleteList
    }
}