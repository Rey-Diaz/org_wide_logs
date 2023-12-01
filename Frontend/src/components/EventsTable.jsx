import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './EventsTable.module.css';

function EventsTable({ events, onEventSelect }) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [searchQuery, setSearchQuery] = useState('');

    const sortedAndFilteredEvents = useMemo(() => {
        return [...events]
            .filter(event => {
                return Object.values(event).some(value =>
                    String(value).toLowerCase().includes(searchQuery.toLowerCase())
                );
            })
            .sort((a, b) => {
                if (sortConfig.key !== null) {
                    if (a[sortConfig.key] < b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                }
                return 0;
            });
    }, [events, sortConfig, searchQuery]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div>
            <h2>Network Events</h2>
            <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchBar}
            />
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th onClick={() => requestSort('occurred_at')}>Occurred At</th>
                        <th onClick={() => requestSort('network_id')}>Network ID</th>
                        <th onClick={() => requestSort('type')}>Event Type</th>
                        <th onClick={() => requestSort('description')}>Description</th>
                        <th onClick={() => requestSort('category')}>Category</th>
                        <th onClick={() => requestSort('client_id')}>Client ID</th>
                        <th onClick={() => requestSort('client_description')}>Client Description</th>
                        <th onClick={() => requestSort('client_mac')}>Client MAC</th>
                        <th onClick={() => requestSort('device_serial')}>Device Serial</th>
                        <th onClick={() => requestSort('device_name')}>Device Name</th>
                        <th onClick={() => requestSort('ssid_number')}>SSID Number</th>
                        <th>Event Details</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedAndFilteredEvents.map((event, index) => (
                        <tr key={index}>
                            <td>{event.occurred_at}</td>
                            <td>{event.network_id}</td>
                            <td>{event.type}</td>
                            <td>{event.description}</td>
                            <td>{event.category}</td>
                            <td>{event.client_id}</td>
                            <td>{event.client_description}</td>
                            <td>{event.client_mac}</td>
                            <td>{event.device_serial}</td>
                            <td>{event.device_name}</td>
                            <td>{event.ssid_number}</td>
                            <td>
                                <button 
                                    className={styles.expandButton} 
                                    onClick={() => onEventSelect(event)}>
                                    Expand
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

EventsTable.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object).isRequired,
    onEventSelect: PropTypes.func.isRequired,
};

export default EventsTable;
