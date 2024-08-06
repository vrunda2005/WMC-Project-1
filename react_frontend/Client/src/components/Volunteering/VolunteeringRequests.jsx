// src/components/VolunteerRequests.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VolunteerRequests = () => {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('/api/volunteers');
                console.log('Response data:', response.data); // Check the structure here
                // Ensure that the response data is an array
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
