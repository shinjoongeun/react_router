import React,{ useState } from 'react';

const Modal = ({ selectedData, handleCancel, handleEditSubmit }) => {
    const [edited, setEdited] = useState(selectedData);

    const onCancel = () => {
        handleCancel();
    }

    const on
}