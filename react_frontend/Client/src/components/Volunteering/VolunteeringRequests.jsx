import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VolunteerRequests = () => {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('/api/volunteers');
                console.log(response);
                
                if (Array.isArray(response.data)) {
                    setRequests(response.data);
                } else {
                    console.error('Unexpected data format:', response.data);
                    setError('Unexpected data format.');
                }
            } catch (error) {
                console.error('Error fetching volunteer requests:', error);
                setError('Error fetching volunteer requests.');
            }
        };
    
        fetchRequests();
    }, []);
    

    const handleApprove = async (id) => {
        try {
            await axios.post(`/api/volunteers/${id}/approve`);
            setRequests(prevRequests =>
                prevRequests.map(request =>
                    request._id === id ? { ...request, status: 'Approved' } : request
                )
            );
        } catch (error) {
            console.error('Error approving request:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.post(`/api/volunteers/${id}/reject`);
            setRequests(prevRequests =>
                prevRequests.map(request =>
                    request._id === id ? { ...request, status: 'Rejected' } : request
                )
            );
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Volunteer Requests</h2>
            {requests.length > 0 ? (
                <ul className="space-y-4">
                    {requests.map((request) => (
                        <li key={request._id} className="p-4 bg-gray-800 text-white rounded shadow">
                            <p><strong>Name:</strong> {request.name}</p>
                            <p><strong>Email:</strong> {request.email}</p>
                            <p><strong>Message:</strong> {request.message}</p>
                            <p><strong>Status:</strong> {request.status}</p>
                            {request.status === 'Pending' && (
                                <div className="mt-2">
                                    <button
                                        onClick={() => handleApprove(request._id)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mr-2"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(request._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No volunteer requests found.</p>
            )}
        </div>
    );
};

export default VolunteerRequests;
