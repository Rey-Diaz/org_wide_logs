
import PropTypes from 'prop-types';
import styles from './NetworkDetailsTable.module.css';

function NetworkDetailsTable({ data }) {
    return (
        <div>
            <h2>Network Details</h2>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr className={styles.tr}>
                        <th className={styles.th}>Client MAC</th>
                        <th className={styles.th}>Client User ID</th>
                        <th className={styles.th}>First Seen</th>
                        <th className={styles.th}>Last Seen</th>
                        <th className={styles.th}>Network ID</th>
                        <th className={styles.th}>WAP Name</th>
                        <th className={styles.th}>MR Device Name</th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {data.map((item) => (
                        <tr key={item.client_mac} className={styles.tr}>
                            <td className={styles.td}>{item.client_mac}</td>
                            <td className={styles.td}>{item.client_user_id}</td>
                            <td className={styles.td}>{item.client_timestamps.first_seen}</td>
                            <td className={styles.td}>{item.client_timestamps.last_seen}</td>
                            <td className={styles.td}>{item.network_id}</td>
                            <td className={styles.td}>{item.wap_name}</td>
                            <td className={styles.td}>{item.mr_device_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Add prop validation
NetworkDetailsTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NetworkDetailsTable;
