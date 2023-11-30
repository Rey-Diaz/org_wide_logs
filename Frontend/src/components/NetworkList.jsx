import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchNetworks } from '../services/merakiService';

function NetworkList({ orgId, onNetworkSelectionChange }) {
    const [networks, setNetworks] = useState([]);
    const [selectedNetworks, setSelectedNetworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadNetworks = async () => {
            try {
                setLoading(true);
                const networkData = await fetchNetworks(orgId);
                setNetworks(networkData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (orgId) {
            loadNetworks();
        }
    }, [orgId]);

    const handleCheckboxChange = (networkId) => {
        setSelectedNetworks((prevSelectedNetworks) => {
            if (prevSelectedNetworks.includes(networkId)) {
                return prevSelectedNetworks.filter((id) => id !== networkId);
            } else {
                return [...prevSelectedNetworks, networkId];
            }
        });
    };

    const handleSelectAllChange = () => {
        if (selectedNetworks.length === networks.length) {
            setSelectedNetworks([]);
        } else {
            const allNetworkIds = networks.map((network) => network.id);
            setSelectedNetworks(allNetworkIds);
        }
    };

    useEffect(() => {
        // Call the callback function to update selected networks when checkboxes change
        onNetworkSelectionChange(selectedNetworks);
    }, [selectedNetworks, onNetworkSelectionChange]);

    if (loading) {
        return (
            <div>
                <p>Loading networks...</p>
            </div>
        );
    }

    if (error) {
        return <div>Error loading networks: {error}</div>;
    }

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={selectedNetworks.length === networks.length}
                    onChange={handleSelectAllChange}
                />{' '}
                Select All
            </label>
            {networks.map((network) => (
                <div key={network.id}>
                    <input
                        type="checkbox"
                        checked={selectedNetworks.includes(network.id)}
                        onChange={() => handleCheckboxChange(network.id)}
                    />
                    {network.name}
                </div>
            ))}
        </div>
    );
}

NetworkList.propTypes = {
    orgId: PropTypes.string.isRequired,
    onNetworkSelectionChange: PropTypes.func.isRequired,
};

export default NetworkList;
