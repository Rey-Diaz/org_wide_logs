// Frontend/src/components/EventsTable.jsx
import PropTypes from 'prop-types';
import styles from './EventsTable.module.css'; // You need to create this CSS module

function EventsTable({ events }) {
    return (
        <div>
            <h2>Network Events</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Occurred At</th>
                        <th>Network ID</th>
                        <th>Event Type</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Client ID</th>
                        <th>Client Description</th>
                        <th>Client MAC</th>
                        <th>Device Serial</th>
                        <th>Device Name</th>
                        <th>SSID Number</th>
                        <th>Event Data</th>
                    </tr>
                </thead>
                <tbody>
    {events.map((event, index) => (
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
            {/* Render eventData as a JSON string or format as needed */}
            <td>{JSON.stringify(event.event_data)}</td>
        </tr>
    ))}
</tbody>
            </table>
        </div>
    );
}

EventsTable.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EventsTable;
