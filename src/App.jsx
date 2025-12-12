import { useState } from 'react'
import NoteForm from './components/NoteForm'

function App() {
  const [notes, setNotes] = useState([
    {
      title: 'Örnek Not',
      content: 'Bu, not alma uygulamanız için bir örnek nottur.'
    },
  ])

  const addNote = (note) => {
    setNotes([...notes, note])
  }

  return (
    <>
      <NoteForm addNote={addNote} />

      <h2>Notlar</h2>
      {notes.map((note, index) => (
        <div key={index}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </>
  )
}

export default App
