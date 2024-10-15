import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {  updateWarrantyHistory } from '../services/warrantyHistoryService';
import { useAuth } from '../context/AuthContext';

interface ActionFormProps {
    warrantyRegisID: string; 
    onClose: () => void;
    onSave: () => void;
}

const ActionForm: React.FC<ActionFormProps> = ({ warrantyRegisID, onClose, onSave }) => {
    const { user } = useAuth();
    const [newStatus, setNewStatus] = useState<string>('');
    const [statusOptions, setStatusOptions] = useState<string[]>([]);
    const [actionsTaken, setActionsTaken] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


    useEffect(() => {
        const options = ["under_repair", "returned_to_customer", "sent_to_manufacturer"];
        setStatusOptions(options);
    }, []);

    const handleSubmit = async () => {
        // Kiểm tra nếu user hoặc technicianID không tồn tại
        if (!user?.id) {
            console.error("No technician ID found");
            return;
        }

        const technicianID = user.id;

        const historyData = {
            updated_by: technicianID, // ID của kỹ thuật viên
            status_changed: newStatus, // Trạng thái mới
            change_date: new Date(), // Ngày thay đổi
            actions_taken: actionsTaken, // Các hành động đã thực hiện
            notes: notes, // Ghi chú
        };

        setIsSubmitting(true);

        try {
            await updateWarrantyHistory(warrantyRegisID, technicianID, newStatus); // Gọi API để cập nhật lịch sử bảo hành
            onSave(); // Gọi hàm onSave sau khi cập nhật thành công
        } catch (error) {
            console.error("Error updating warranty history", error);
        } finally {
            setIsSubmitting(false); // Kết thúc quá trình gửi
        }
    };

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="statusSelect">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)} // Cập nhật newStatus khi chọn
                        >
                            <option value="">Select status</option>
                            {statusOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="actionsTaken">
                        <Form.Label>Actions Taken</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter actions (comma separated)"
                            value={actionsTaken}
                            onChange={(e) => setActionsTaken(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="notes">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="updateDate">
                        <Form.Label>Update Date</Form.Label>
                        <Form.Control type="text" value={new Date().toLocaleString()} readOnly />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting || !newStatus}>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ActionForm;
