import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { fetchOrganizations } from '../services/merakiService';
import styles from './OrgList.module.css';

function OrgList({ apiKey, setSelectedOrg }) {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadOrganizations = async () => {
            try {
                if (!apiKey) {
                    // Handle the case where the API key is missing
                    setError('API key is missing.');
                    return;
                }

                const data = await fetchOrganizations(apiKey);
                setOrganizations(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadOrganizations();
    }, [apiKey]);

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
                {organizations.map((org) => (
                    <li key={org.id} onClick={() => handleOrgClick(org.id)} className={styles.orgItem}>
                        {org.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Add prop validation
OrgList.propTypes = {
    apiKey: PropTypes.string.isRequired, // Specify the type as string and mark it as required
    setSelectedOrg: PropTypes.func.isRequired, // Specify the type as function and mark it as required
};

export default OrgList;
