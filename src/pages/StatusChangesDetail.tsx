import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface StatusChange {
    status: string;
    actions_taken: string[];
    changed_by: string;
    date: string;
    notes?: string;
    _id:string;
}
interface User {
    user_id:string;
    full_name:string;
}

interface WarrantyHistory {
    _id?:string,
    technician_id: User;
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
            console.log('Warranty History:', warrantyHistory);
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
                     {formData.status_changes.map((change) => {
                         console.log('Change:', change); // Đặt ở đây để in ra từng change
                         return (
                             <div key={change._id}>
                                 <p><strong>Status:</strong> {change.status}</p>
                                 <p><strong>Actions Taken:</strong> {change.actions_taken.join(', ')}</p>
                                 <p><strong>Date:</strong> {new Date(change.date).toLocaleString()}</p>
                                 <p><strong>Notes:</strong> {change.notes || 'No notes'}</p>
                                 <p><strong>Changed by:</strong> {change.changed_by}</p>
                                 <hr />
                             </div>
                         );
                     })}
                 </div>
                    
                ): (
                    <p>No data available</p>
                )
                }
            </Modal.Body>
        </Modal>
    );

    
}



export default StatusChangeForm;