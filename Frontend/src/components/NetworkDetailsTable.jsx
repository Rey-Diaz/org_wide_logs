import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './NetworkDetailsTable.module.css';

function NetworkDetailsTable({ data }) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [searchQuery, setSearchQuery] = useState('');

    const sortedAndFilteredData = useMemo(() => {
        return [...data]
            .filter(item => {
                // Assuming you want to search across all string fields
                return Object.values(item).some(value =>
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
    }, [data, sortConfig, searchQuery]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div>
            <h2>Network Details</h2>
            <input
                type="text"
                placeholder="Search network details..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchBar}
            />
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr className={styles.tr}>
                        <th className={styles.th} onClick={() => requestSort('client_mac')}>Client MAC</th>
                        <th className={styles.th} onClick={() => requestSort('client_user_id')}>Client User ID</th>
                        <th className={styles.th} onClick={() => requestSort('first_seen')}>First Seen</th>
                        <th className={styles.th} onClick={() => requestSort('last_seen')}>Last Seen</th>
                        <th className={styles.th} onClick={() => requestSort('network_id')}>Network ID</th>
                        <th className={styles.th} onClick={() => requestSort('wap_name')}>WAP Name</th>
                        <th className={styles.th} onClick={() => requestSort('mr_device_name')}>MR Device Name</th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {sortedAndFilteredData.map((item, index) => (
                        <tr key={index} className={styles.tr}>
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

NetworkDetailsTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NetworkDetailsTable;
