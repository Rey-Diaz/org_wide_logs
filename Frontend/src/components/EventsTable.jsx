import PropTypes from 'prop-types';
import styles from './EventsTable.module.css';

function EventsTable({ events }) {
    const handleEventClick = (eventData) => {
        console.log(eventData); // Placeholder for your event detail handling logic
    };

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
                        <th>Event Details</th> {/* Updated header */}
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
                            <td>
                                <button 
                                    className={styles.expandButton} 
                                    onClick={() => handleEventClick(event.event_data)}>
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
};

export default EventsTable;
