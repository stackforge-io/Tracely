import React, { useEffect, useState } from 'react';
import FilterBar from "../components/FilterBar";
import RequestTable from "../components/RequestTable";
import RequestModal from "../components/RequestModal";
import './TrackRoomItem.css';

function TrackRoomItem() {
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({ status: 'All' });
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, [filters]);

  const fetchRequests = async () => {
    // Replace with API call
    const data = await fetch('/api/requests') // Or mock data
      .then(res => res.json())
      .catch(() => []);

    const filtered = data.filter(req => {
      if (filters.status && filters.status !== 'All') {
        return req.status === filters.status;
      }
      return true;
    });

    setRequests(filtered);
  };

  return (
    <div className="App">
      <h1>Track Room Item Requests</h1>
      <p>View and manage item requests with status filtering</p>
      <FilterBar setFilters={setFilters} />
      <RequestTable data={requests} onView={setSelectedRequest} />
      {selectedRequest && (
        <RequestModal request={selectedRequest} onClose={() => setSelectedRequest(null)} />
      )}
    </div>
  );
}

export default TrackRoomItem;