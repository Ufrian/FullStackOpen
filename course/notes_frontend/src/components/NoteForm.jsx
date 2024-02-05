const NoteForm = ({ addNote, newNote, handleChange, handleLogOut}) => {
  return (
    <div>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleChange}
          />
        <button type="submit">save</button>
      </form>
      <button type="submit" onClick={handleLogOut}>logout</button>
    </div>
  )
}


export default NoteForm