import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);

    const [modalContent, setModalContent] = useState(null)

    return (
        <LayoutContext.Provider value={{
            showModal,
            setShowModal,
            modalContent,
            setModalContent,


        }}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayout = () => useContext(LayoutContext);