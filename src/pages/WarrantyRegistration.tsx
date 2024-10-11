import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createWarrantyRegistration, getAllWarrantyRegistrations, deleteWarrantyRegistration } from '../services/warrantyRegistrationService';
import { Button, Form, Modal } from 'react-bootstrap'; // Import Modal
import { WarrantyRegistration as WarrantyRegistrationType } from '../types/index'; // Ensure this is renamed if there’s a conflict
import Header from '../components/Header';
import './WarrantyRegistration.css'; // Optional: For styling

const WarrantyRegistrationPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();

    const [registrationData, setRegistrationData] = useState<WarrantyRegistrationType>({
        product_id: productId || '',
        customer_id: '',
        received_date: new Date().toISOString(),
        current_status: 'pending',
        notes: '',
    });

    const [registrations, setRegistrations] = useState<WarrantyRegistrationType[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false); // State to show/hide modal
    const [selectedIdToDelete, setSelectedIdToDelete] = useState<string | null>(null); // Store the ID to be deleted

    // Fetch all warranty registrations
    const fetchRegistrations = async () => {
        try {
            const data = await getAllWarrantyRegistrations();
            setRegistrations(data);
        } catch (error) {
            console.error('Error fetching registrations:', error);
            setErrorMessage('Failed to fetch warranty registrations.');
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRegistrationData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createWarrantyRegistration(registrationData);
            fetchRegistrations(); // Refresh the list after successful submission
            setRegistrationData({
                product_id: productId || '',
                customer_id: '',
                received_date: new Date().toISOString(),
                current_status: 'pending',
                notes: '',
            });
        } catch (error) {
            console.error('Error registering warranty:', error);
        }
    };

    // Open confirmation modal and set the ID to delete
    const handleDeleteClick = (id: string) => {
        setSelectedIdToDelete(id); // Save the ID of the item to delete
        setShowConfirmModal(true); // Show confirmation modal
    };

    // Perform the delete operation after confirmation
    const confirmDelete = async () => {
        if (!selectedIdToDelete) return; // If there's no selected ID, return

        try {
            await deleteWarrantyRegistration(selectedIdToDelete);
            fetchRegistrations(); // Refresh the list after deletion
            setShowConfirmModal(false); // Close the modal after delete
            setSelectedIdToDelete(null); // Reset the ID after deletion
        } catch (error) {
            console.error('Error deleting warranty registration:', error);
            setErrorMessage('Failed to delete warranty registration.');
        }
    };

    // Cancel the delete operation
    const cancelDelete = () => {
        setShowConfirmModal(false); // Hide the modal
        setSelectedIdToDelete(null); // Reset the ID
    };

    return (
        <div>
            <Header />
            <div className="warranty-registration-container">
                <h2>Các Đăng Ký Bảo Hành Hiện Có</h2>
                <div className="registration-cards">
                    {registrations.map((registration) => (
                        <div key={registration._id} className="registration-card">
                            <p><strong>Product:</strong> {registration.product_id}</p>
                            <p><strong>Customer:</strong> {registration.customer_id}</p>
                            <p><strong>Received Date:</strong> {new Date(registration.received_date).toLocaleDateString()}</p>
                            <p><strong>Status:</strong> {registration.current_status}</p>
                            {registration.notes && <p><strong>Notes:</strong> {registration.notes}</p>}
                            <button onClick={() => handleDeleteClick(registration._id!)} className="delete-button">Xóa</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for confirming delete */}
            <Modal show={showConfirmModal} onHide={cancelDelete} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Bạn có chắc chắn muốn xóa đăng ký bảo hành này không?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete}>Hủy</Button>
                    <Button variant="danger" onClick={confirmDelete}>Xóa</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default WarrantyRegistrationPage;
