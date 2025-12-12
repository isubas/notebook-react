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
        <div className="card mb-3">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Not Başlığı"
                        />
                        <label htmlFor="title">Not Başlığı</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Not İçeriği"
                            style={{ height: '120px' }}
                        ></textarea>
                        <label htmlFor="content">Not İçeriği</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Not Ekle</button>
                </form>
            </div>
        </div>
    )
}
