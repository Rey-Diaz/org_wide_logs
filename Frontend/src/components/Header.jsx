import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link component
import { MdMenu } from 'react-icons/md';
import styles from './Header.module.css';

function Header({ toggleSidebar }) {
    return (
        <header className={styles.header}>
            <button onClick={toggleSidebar} className={styles.menuButton}>
                <MdMenu />
            </button>
            <Link to="/" className={styles.title}>
                Meraki App Template
            </Link>
        </header>
    );
}

Header.propTypes = {
    toggleSidebar: PropTypes.func.isRequired,
};

export default Header;
