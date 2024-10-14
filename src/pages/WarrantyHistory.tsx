    import React, { useEffect, useState } from 'react';
    import { Table,Button,Form,Row,Col} from 'react-bootstrap';
    import {getAllWarrantyHistorys} from '../services/warrantyHistoryService';
    import Header from '../components/Header';
    import StatusChangeForm from './StatusChangesDetail';
    interface Product {
        name:string;
        product_id: string;
        quantity: number;
    }
    interface User {
        user_id:string;
        full_name:string;
    }

    interface WarrantyRegistration {
        _id:string;
        received_date:string;
        current_status:string;
        notes:string;
    }

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
        _id:string;
        registration_id: WarrantyRegistration;
        product_id:Product;
        technician_id: User;
        status_changes:StatusChange[];
        createdAt:string;
        updatedAt:string;
    }

    const WarrantyHistoryList: React.FC = () => {
        const [WarrantyHistories,setWarrantyHistories] = useState<WarrantyHistory[]>([]);
        const [filteredHistories, setFilteredHistories] = useState<WarrantyHistory[]>([]);
        const [selectedHistory,setSelectedHistory] = useState<WarrantyHistory | null>(null);
        const [showModal,setShowModal] = useState<boolean>(false);
        const [startDate,setStartDate] = useState<string>('');
        const [endDate,setEndDate] = useState<string>('');

        useEffect(() =>{
            fetchWarrantyHistory();
        },[]);

        const fetchWarrantyHistory = async () => {
            const WarrantyHistoryData = await getAllWarrantyHistorys();
            setWarrantyHistories(WarrantyHistoryData);
            setFilteredHistories(WarrantyHistoryData);
        }
        
        const handleShowDetail = (History : WarrantyHistory) => {
        
            console.log(History);
            setSelectedHistory(History);
            setShowModal(true);
        };
        
        const handleCloseModal =() =>{
            setShowModal(false);
            setSelectedHistory(null);
        };

        const filterWarrantyHistories = () => {
            const start = startDate ? new Date(startDate) : null; // Nếu không có ngày bắt đầu, đặt là null
            const end = endDate ? new Date(endDate) : null; // Nếu không có ngày kết thúc, đặt là null
            
            const filtered = WarrantyHistories.filter((history) => {
                const createdAt = new Date(history.createdAt);
                const isAfterStart = !start || createdAt >= start; 
                const isBeforeEnd = !end || createdAt <= end;
                return isAfterStart && isBeforeEnd; // Trả về true nếu lịch sử bảo hành nằm trong khoảng
            });
    
            setFilteredHistories(filtered); // Cập nhật danh sách đã lọc
        };

        return (
            <div>
                <Header/>
                    <h2>Warranty History</h2>
                    <Form className ="mb-3">
                        <Row className = "mb-3  d-flex align-items-end">
                            <Col>
                                <Form.Group controlId = "startDate">
                                <Form.Label>Start Date:</Form.Label>
                                <Form.Control 
                                type="date"
                                value = {startDate}
                                onChange = {(e) => setStartDate(e.target.value)}
                                />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId = "endDate">
                                <Form.Label>End Date:</Form.Label>
                                <Form.Control 
                                type="date"
                                value = {endDate}
                                onChange = {(e) => setEndDate(e.target.value)}
                                />
                                </Form.Group>
                            </Col>
                            <Col>
                            <Button
                                variant="primary"
                                onClick={filterWarrantyHistories}
                                className="ml-2"
                            >
                                Filter
                            </Button>
                            </Col>
                        </Row>
                    </Form>
                    {WarrantyHistories.length ===0 ? (
                        <p>No warranty history available</p>
                    ) :(
                        <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product</th> 
                            <th>Requirement</th>
                            <th>Registration Date</th>
                            <th>Status Changes</th>
                            <th>Create At</th>
                            <th>Update At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHistories.map((History) => (
                            <tr key={History._id}>
                                <td>{History._id}</td>
                                <td>{History.product_id?.name}</td>
                                <td>{History.registration_id.current_status}</td>
                                <td>{History.registration_id.received_date}</td>
                                <td>
                                <Button variant="primary" onClick ={() => handleShowDetail(History)}>Detail</Button>
                                </td>
                                <td>{History.createdAt}</td>
                                <td>{History.updatedAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                    )
                    }
                    <StatusChangeForm
                    warrantyHistory={selectedHistory}
                    onClose={handleCloseModal}
                />
            </div>
        )
    };



    export default WarrantyHistoryList;