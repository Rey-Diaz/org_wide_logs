

function NetworkDetailsTable({ data }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Client MAC</th>
                    <th>User ID</th>
                    <th>First Seen</th>
                    <th>Last Seen</th>
                    <th>Network ID</th>
                    <th>WAP Name</th>
                    <th>MR Device Name</th>
                </tr>
            </thead>
            <tbody>
                {data.map((client, index) => (
                    <tr key={index}>
                        <td>{client.client_mac}</td>
                        <td>{client.client_user_id || 'N/A'}</td>
                        <td>{new Date(client.client_timestamps.first_seen).toLocaleString()}</td>
                        <td>{new Date(client.client_timestamps.last_seen).toLocaleString()}</td>
                        <td>{client.network_id}</td>
                        <td>{client.wap_name}</td>
                        <td>{client.mr_device_name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default NetworkDetailsTable;

