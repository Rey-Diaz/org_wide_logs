import { useState, useEffect } from 'react';
import Card from '../components/Card';
import OrgList from '../components/OrgList';
import NetworkList from '../components/NetworkList';
import NetworkDetailsTable from '../components/NetworkDetailsTable';
import styles from './TablePage.module.css';
import { setApiKey as setApiKeyInBackend } from '../services/merakiService';

function TablePage() {
    const [apiKey, setApiKeyState] = useState('');
    const [selectedOrg, setSelectedOrg] = useState(null);
    const [apiKeySubmitted, setApiKeySubmitted] = useState(false);
    const [selectedNetworks, setSelectedNetworks] = useState([]);
    const [networkDetails, setNetworkDetails] = useState([]);
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await setApiKeyInBackend(apiKey);
            alert('API Key set successfully');
            setApiKeySubmitted(true);
        } catch (error) {
            alert('Failed to set API key: ' + error.message);
        }
    };

    const fetchNetworkDetails = async () => {
        try {
            // Fetch network details only if there are selected networks
            if (selectedOrg && selectedNetworks.length > 0) {
                const response = await fetch('/networks/details', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ network_ids: selectedNetworks }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setNetworkDetails(data);
                } else {
                    throw new Error('Failed to fetch network details.');
                }
            }
        } catch (error) {
            console.error('Error fetching network details:', error);
        }
    };

    useEffect(() => {
        if (selectedOrg) {
            fetchNetworkDetails();
        }
    }, [selectedOrg, selectedNetworks]);

    return (
        <div className={styles.apiKeyContainer}>
            <Card>
                <form onSubmit={handleSubmit} className={styles.apiKeyForm}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>API Key:</label>
                        <input
                            type="text"
                            value={apiKey}
                            onChange={(e) => setApiKeyState(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <button type="submit" className={styles.submitBtn}>
                        Submit
                    </button>
                </form>
            </Card>
            {apiKeySubmitted && (
                <Card>
                    <OrgList apiKey={apiKey} setSelectedOrg={setSelectedOrg} />
                </Card>
            )}
            {selectedOrg && (
                <>
                    <Card>
                        <NetworkList
                            orgId={selectedOrg}
                            onNetworkSelectionChange={(selectedNetworks) => setSelectedNetworks(selectedNetworks)}
                        />
                    </Card>
                    <Card>
                        <NetworkDetailsTable data={networkDetails} />
                    </Card>
                </>
            )}
        </div>
    );
}

export default TablePage;
