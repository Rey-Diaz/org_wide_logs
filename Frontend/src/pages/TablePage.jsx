import { useState } from 'react';
import Card from '../components/Card';
import OrgList from '../components/OrgList'; // Import OrgList component
import NetworkList from '../components/NetworkList'; // Import NetworkList component
import styles from './TablePage.module.css';
import { setApiKey as setApiKeyInBackend } from '../services/merakiService';

function TablePage() {
    const [apiKey, setApiKeyState] = useState('');
    const [selectedOrg, setSelectedOrg] = useState(null); // State to track the selected organization
    const [apiKeySubmitted, setApiKeySubmitted] = useState(false); // State to track if the API key has been submitted

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await setApiKeyInBackend(apiKey); // Send the API key to the backend
            alert('API Key set successfully');
            setApiKeySubmitted(true); // Mark API key as submitted
        } catch (error) {
            alert('Failed to set API key: ' + error.message);
        }
    };

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
                <Card>
                    <NetworkList orgId={selectedOrg} />
                </Card>
            )}
        </div>
    );
}

export default TablePage;
