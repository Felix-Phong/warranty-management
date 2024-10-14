import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface StatusChange {
    status: string;
    actions_taken: string[];
    changed_by: {
      _id: string;
      name: string; // Giả sử kỹ thuật viên có tên
    };
    date: string;
    notes?: string;
    _id:string;
}

interface WarrantyHistory {
    _id?:string,
    status_changes?:StatusChange[];
}

interface StatusChangeFormProps {
    warrantyHistory?: WarrantyHistory | null;
    onClose: () => void;
}

const StatusChangeForm: React.FC<StatusChangeFormProps> = ({warrantyHistory,onClose}) =>{
    const [formData,setFormData] = useState<WarrantyHistory | null>(null)

    useEffect(() =>{
        if(warrantyHistory) {
            setFormData(warrantyHistory);
        }
    },[warrantyHistory])

    return (
        <Modal show={!!warrantyHistory} onHide ={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Status change detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {formData && formData.status_changes && formData.status_changes.length > 0 ? (
                    <div>
                         {formData.status_changes.map((change) => (
                            <div key={change._id}>
                                <p><strong>Status:</strong> {change.status}</p>
                                <p><strong>Actions Taken:</strong> {change.actions_taken.join(', ')}</p>
                                <p><strong>Changed by:</strong> {change.changed_by ? change.changed_by.name : 'Unknown'}</p>
                                <p><strong>Date:</strong> {new Date(change.date).toLocaleString()}</p>
                                <p><strong>Notes:</strong> {change.notes || 'No notes'}</p>
                                <hr />
                            </div>
                        ))}
                    </div>
                ): (
                    <p>No data available</p>
                )
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant ="secondary" type = "submit">Add action</Button>
            </Modal.Footer>
        </Modal>
    );
}



export default StatusChangeForm;