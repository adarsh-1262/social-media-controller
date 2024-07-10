// frontend/src/pages/EditLink.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useLinks } from '../context/linksContext';

const EditLink = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addLink } = useLinks();
    const [link, setLink] = useState({ name: '', url: '' });

    useEffect(() => {
        if (id !== 'new') {
            axios.get(`/api/social-links/${id}`)
                .then(response => setLink(response.data))
                .catch(error => console.log(error));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLink({ ...link, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id === 'new') {
            // Replace user with actual user identification
            axios.post('/api/social-links', { ...link, user: 'userId' })
                .then(response => {
                    addLink(response.data);
                    navigate('/');
                })
                .catch(error => console.log(error));
        } else {
            axios.put(`/api/social-links/${id}`, link)
                .then(() => navigate('/'))
                .catch(error => console.log(error));
        }
    };

    const handleDelete = () => {
        axios.delete(`/api/social-links/${id}`)
            .then(() => navigate('/'))
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h1>{id === 'new' ? 'Add New Link' : 'Edit Link'}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={link.name} onChange={handleChange} required />
                </label>
                <label>
                    URL:
                    <input type="url" name="url" value={link.url} onChange={handleChange} required />
                </label>
                <button type="submit">Save</button>
                {/* {id !== 'new' && <button type="button" onClick={handleDelete}>Delete</button>} */}
            </form>
        </div>
    );
};

export default EditLink;
