
import PropTypes from 'prop-types';
import styles from './Card.module.css';

function Card({ children }) {
    return <div className={styles.card}>{children}</div>;
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Card;
