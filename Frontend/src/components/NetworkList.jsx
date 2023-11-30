import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { fetchNetworks } from '../services/merakiService';

function NetworkList({ orgId }) {
    const [networks, setNetworks] = useState([]);
    const [selectedNetworks, setSelectedNetworks] = useState(new Set());

    useEffect(() => {
        const loadNetworks = async () => {
            const networkData = await fetchNetworks(orgId);
            setNetworks(networkData);
        };

        if (orgId) {
            loadNetworks();
        }
    }, [orgId]);

    const handleCheckboxChange = (networkId) => {
        setSelectedNetworks(prev => {
            const updatedSet = new Set(prev);
            if (updatedSet.has(networkId)) {
                updatedSet.delete(networkId);
            } else {
                updatedSet.add(networkId);
            }
            return updatedSet;
        });
    
    };
    

    return (
        <div>
            {networks.map(network => (
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
