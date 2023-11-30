import { useState } from 'react';
import Card from '../components/Card';
import OrgList from '../components/OrgList'; // Import OrgList component
import styles from './ApiKeyPage.module.css';
import { setApiKey as setApiKeyInBackend } from '../services/merakiService';

function ApiKeyPage() {
    const [apiKey, setApiKeyState] = useState('');
    const [showOrgList, setShowOrgList] = useState(false); // State to control OrgList display

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await setApiKeyInBackend(apiKey); // Send the API key to the backend
            alert('API Key set successfully');
            setApiKeyState('');
            setShowOrgList(true); // Show OrgList on successful API key submission
        } catch (error) {
            alert('Failed to set API key: ' + error.message);
            setShowOrgList(false); // Optionally reset the state if there is an error
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
                    <button type="submit" className={styles.submitBtn}>Submit</button>
                </form>
            </Card>
            {showOrgList && (
                <Card>
                    <OrgList />
                </Card>
            )}
        </div>
    );
}

export default ApiKeyPage;
