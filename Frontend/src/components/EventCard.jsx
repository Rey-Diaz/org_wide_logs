
import PropTypes from 'prop-types';
import styles from './EventCard.module.css'; // Ensure you have this CSS module

const EventCard = ({ eventData, onClose }) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2>Event Details</h2>
                <button onClick={onClose} className={styles.closeButton}>X</button>
            </div>
            <div className={styles.cardBody}>
                {/* Display event data here */}
                <p><strong>Occurred At:</strong> {eventData.occurred_at}</p>
                <p><strong>Network ID:</strong> {eventData.network_id}</p>
                <p><strong>Event Type:</strong> {eventData.type}</p>
                <p><strong>Description:</strong> {eventData.description}</p>
                {/* Add more fields as needed */}
            </div>
        </div>
    );
};

EventCard.propTypes = {
    eventData: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default EventCard;
