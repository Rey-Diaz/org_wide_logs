
import PropTypes from 'prop-types';
import styles from './EventCard.module.css'; // Ensure you have this CSS module

const EventCard = ({ eventData, onClose }) => {
    const renderEventData = () => {
        return Object.entries(eventData).map(([key, value], index) => {
            if (typeof value === 'object' && value !== null) {
                return (
                    <div key={index}>
                        <strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong>
                        <ul className={styles.subList}>
                            {Object.entries(value).map(([subKey, subValue], subIndex) => (
                                <li key={subIndex}>
                                    <strong>{subKey.replace(/_/g, ' ').toUpperCase()}:</strong> {subValue}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            } else {
                return <p key={index}><strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong> {value}</p>;
            }
        });
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2>Event Details</h2>
                <button onClick={onClose} className={styles.closeButton}>X</button>
            </div>
            <div className={styles.cardBody}>
                {renderEventData()}
            </div>
        </div>
    );
};

EventCard.propTypes = {
    eventData: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default EventCard;
