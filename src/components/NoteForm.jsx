import { useState } from "react";

const FORM_INITIAL_STATE = {
    title: '',
    content: ''
};

export default function NoteForm({ addNote }) {
    const [formData, setFormData] = useState(FORM_INITIAL_STATE);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title.trim() === '' || formData.content.trim() === '') {
            alert('Lütfen hem başlık hem de içerik alanlarını doldurun.');
            return;
        }
        addNote(formData);
        setFormData(FORM_INITIAL_STATE);
    }


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Not Başlığı:</label>
            <input type="text"
                placeholder="Başlık" id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="content">Not İçeriği:</label>
            <textarea placeholder="Bir not yazın..."
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
            ></textarea>
            <br />
            <button type="submit">Not Ekle</button>
        </form>
    )
}
