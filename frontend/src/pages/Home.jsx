// frontend/src/pages/Home.jsx

import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLinks } from '../context/linksContext';

const Home = () => {
    const { links, removeLink } = useLinks();

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await axios.get('/api/social-links/userId');
                response.data.forEach(link => addLink(link));
            } catch (error) {
                console.error('Error fetching social links:', error);
            }
        };

        fetchLinks();
    }, []);

    const handleDelete = async (linkId) => {
        try {
            await axios.delete(`/api/social-links/${linkId}`);
            removeLink(linkId); // Update state after successful deletion
        } catch (error) {
            console.error('Error deleting link:', error);
        }
    };

    return (
        <div>
            <h1>Social Links</h1>
            <div>
                {links.map((link) => (
                    <div key={link._id} style={{ marginBottom: '10px' }}>
                        <button
                            onClick={() => window.open(link.url, '_blank')}
                            style={{ padding: '10px 20px', marginRight: '10px' }}
                        >
                            {link.name}
                        </button>
                        <button onClick={() => handleDelete(link._id)} style={{ padding: '10px 20px' }}>Delete</button>
                        {/* <Link to={`/edit/${link._id}`} style={{ textDecoration: 'none' }}>
                            <button style={{ padding: '10px 20px' }}>Edit</button>
                        </Link> */}
                    </div>
                ))}
            </div>
            <Link to="/edit/new" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '10px 20px', marginTop: '20px' }}>Add New Link</button>
            </Link>
        </div>
    );
};

export default Home;
