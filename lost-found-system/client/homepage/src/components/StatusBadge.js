import React from 'react';

const StatusBadge = ({ status }) => {
  const colors = {
    Pending: 'red',
    Approved: 'orange',
    Delivered: 'green',
    Rejected: 'gray',
    Cancelled: 'black'
  };
  return <span style={{ color: colors[status] || 'blue' }}>{status}</span>;
};

export default StatusBadge;