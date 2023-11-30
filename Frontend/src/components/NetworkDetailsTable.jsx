
import PropTypes from 'prop-types';

function NetworkDetailsTable({ data }) {
    return (
        <div>
            <h2>Network Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Client MAC</th>
                        <th>Client User ID</th>
                        <th>First Seen</th>
                        <th>Last Seen</th>
                        <th>Network ID</th>
                        <th>WAP Name</th>
                        <th>MR Device Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.client_mac}>
                            <td>{item.client_mac}</td>
                            <td>{item.client_user_id}</td>
                            <td>{item.client_timestamps.first_seen}</td>
                            <td>{item.client_timestamps.last_seen}</td>
                            <td>{item.network_id}</td>
                            <td>{item.wap_name}</td>
                            <td>{item.mr_device_name}</td>
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

