import { useState, useEffect } from 'react';
import { fetchOrganizations } from '../services/merakiService';
import NetworkList from './NetworkList'; // Import the NetworkList component
import styles from './OrgList.module.css';

function OrgList() {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedOrg, setSelectedOrg] = useState(null); // State to track the selected organization

    useEffect(() => {
        const loadOrganizations = async () => {
            try {
                const data = await fetchOrganizations();
                setOrganizations(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadOrganizations();
    }, []);

    const handleOrgClick = (orgId) => {
        setSelectedOrg(orgId); // Set the selected organization when clicked
    };

    if (loading) {
        return <div>Loading organizations...</div>;
    }

    if (error) {
        return <div>Error loading organizations: {error}</div>;
    }

    return (
        <div>
            <h2>Organizations</h2>
            <ul>
            {organizations.map(org => (
                <li key={org.id} onClick={() => handleOrgClick(org.id)} className={styles.orgItem}>
                    {org.name}
                </li>
                    
                ))}
            </ul>
            {selectedOrg && <NetworkList orgId={selectedOrg} />} {/* Render NetworkList if an organization is selected */}
        </div>
    );
}

export default OrgList;
