import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { fetchNetworks } from '../services/merakiService';

function NetworkList({ orgId }) {
    const [networks, setNetworks] = useState([]);
    const [selectedNetworks, setSelectedNetworks] = useState(new Set());
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState('');
    const [selectAllChecked, setSelectAllChecked] = useState(false); // Checkbox for "Select All"

    useEffect(() => {
        const loadNetworks = async () => {
            try {
                setLoading(true); // Set loading to true when fetching data
                const networkData = await fetchNetworks(orgId);
                setNetworks(networkData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // Set loading to false when data fetching is complete
            }
        };

        if (orgId) {
            loadNetworks();
        }
    }, [orgId]);

    useEffect(() => {
        // Update selectedNetworks based on selectAllChecked
        if (selectAllChecked) {
            const allNetworkIds = networks.map((network) => network.id);
            setSelectedNetworks(new Set(allNetworkIds));
        } else {
            setSelectedNetworks(new Set());
        }
    }, [selectAllChecked, networks]);

    const handleCheckboxChange = (networkId) => {
        setSelectedNetworks((prev) => {
            const updatedSet = new Set(prev);
            if (updatedSet.has(networkId)) {
                updatedSet.delete(networkId);
            } else {
                updatedSet.add(networkId);
            }
            return updatedSet;
        });
    };

    if (loading) {
        return (
            <div>
                <p>Loading networks...</p>
            </div>
        ); // Display loading message while fetching data
    }

    if (error) {
        return <div>Error loading networks: {error}</div>;
    }

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={selectAllChecked}
                    onChange={() => setSelectAllChecked(!selectAllChecked)}
                />{' '}
                Select All
            </label>
            {networks.map((network) => (
                <div key={network.id}>
                    <input
                        type="checkbox"
                        checked={selectedNetworks.has(network.id)}
                        onChange={() => handleCheckboxChange(network.id)}
                    />
                    {network.name}
                </div>
            ))}
        </div>
    );
}

// Add prop validation
NetworkList.propTypes = {
    orgId: PropTypes.string.isRequired, // Specify the type as string and mark it as required
};

export default NetworkList;
