// frontend/src/context/linksContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';

const LinksContext = createContext();

export const useLinks = () => useContext(LinksContext);

export const LinksProvider = ({ children }) => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const storedLinks = JSON.parse(localStorage.getItem('links'));
        if (storedLinks) {
            setLinks(storedLinks);
        }
    }, []);

    const persistLinks = (updatedLinks) => {
        localStorage.setItem('links', JSON.stringify(updatedLinks));
        setLinks(updatedLinks);
    };

    const addLink = (newLink) => {
        const updatedLinks = [...links, newLink];
        persistLinks(updatedLinks);
    };

    const removeLink = (linkId) => {
        const updatedLinks = links.filter(link => link._id !== linkId);
        persistLinks(updatedLinks);
    };

    return (
        <LinksContext.Provider value={{ links, addLink, removeLink }}>
            {children}
        </LinksContext.Provider>
    );
};
