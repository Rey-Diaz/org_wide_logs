import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdClose, MdHouse, MdPageview, MdVpnKey } from 'react-icons/md'; // Import icons from react-icons
import styles from './Sidebar.module.css';

function Sidebar({ isOpen, toggleSidebar }) {
    return (
        <div className={isOpen ? styles.sidePanelOpen : styles.sidePanelClosed}>
            <button onClick={toggleSidebar} className={styles.closeButton}>
                <MdClose />
            </button>
            <h1 className={styles.header}>Page Links</h1>
            <Link to="/" className={styles.link}>
                <span className={styles.icon}><MdHouse /></span> Home
            </Link>
            <Link to="/page1" className={styles.link}>
                <span className={styles.icon}><MdPageview /></span> Page 1
            </Link>
            <Link to="/page2" className={styles.link}>
                <span className={styles.icon}><MdPageview /></span> Page 2
            </Link>
            <Link to="/OrgTable" className={styles.link}>
                <span className={styles.icon}><MdVpnKey /></span> API Key
            </Link>
            {/* Other links */}
        </div>
    );
}

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
