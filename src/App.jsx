import { useState, useEffect } from 'react'
import NoteForm from './components/NoteForm'

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem('notes')) || []
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [favoriteOnly, setFavoriteOnly] = useState(false)

  console.log(favoriteOnly)

  let filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (favoriteOnly) {
    filteredNotes = filteredNotes.filter(note => note.favorite)
  }

  const addNote = (note) => {
    setNotes([...notes, {
      id: crypto.randomUUID(),
      title: note.title,
      content: note.content,
      favorite: false
    }])
  }

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const toggleFavorite = (noteId) => {
    const note = notes.find(n => n.id === noteId)

    if (!note) return

    note.favorite = !note.favorite
    setNotes([...notes])
  }

  const removeNote = (noteId) => {
    const updatedNotes = notes.filter(n => n.id !== noteId)
    setNotes(updatedNotes)
  }

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <NoteForm addNote={addNote} />
        </div>
        <div className="col-12 col-lg-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Notlarda ara..."
                  className="form-control"
                />
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="favoriteOnlyCheckbox"
                    onChange={(e) => setFavoriteOnly(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="favoriteOnlyCheckbox">
                    Sadece favorileri göster
                  </label>
                </div>
              </div>

              <h5 className="card-title mb-3">Notlar</h5>
              {filteredNotes.length === 0 ? (
                <div className="alert alert-secondary" role="alert">
                  Henüz bir not yok.
                </div>
              ) : (
                <div className="row row-cols-1 gy-3">
                  {filteredNotes.map((note) => (
                    <div className="col" key={note.id}>
                      <div className="card shadow-sm">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start">
                            <h6 className="card-subtitle mb-2 fw-bold">{note.title}</h6>
                            {note.favorite && (
                              <span className="badge text-bg-warning">Favori</span>
                            )}
                          </div>
                          <p className="card-text mb-3">{note.content}</p>
                          <button
                            className={`btn btn-outline-${note.favorite ? 'warning' : 'primary'} btn-sm`}
                            onClick={() => toggleFavorite(note.id)}
                          >
                            {note.favorite ? 'Favoriden Kaldır' : 'Favori Yap'}
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm ms-2"
                            onClick={() => removeNote(note.id)}
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
