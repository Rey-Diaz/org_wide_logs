// Frontend/src/pages/EventsTablePage.jsx
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import OrgList from '../components/OrgList';
import NetworkList from '../components/NetworkList';
import EventsTable from '../components/EventsTable';
import { setApiKey as setApiKeyInBackend, fetchNetworkEvents } from '../services/merakiService';
import styles from './EventsTablePage.module.css'; // Ensure you have this CSS module

function EventsTablePage() {
    const [apiKey, setApiKeyState] = useState('');
    const [selectedOrg, setSelectedOrg] = useState(null);
    const [apiKeySubmitted, setApiKeySubmitted] = useState(false);
    const [selectedNetworks, setSelectedNetworks] = useState([]);
    const [events, setEvents] = useState([]);

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

    const fetchEvents = async () => {
        try {
            if (selectedNetworks.length > 0) {
                const eventsData = await Promise.all(selectedNetworks.map(networkId => 
                    fetchNetworkEvents(networkId)));
                setEvents(eventsData.flat());
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        if (apiKeySubmitted && selectedNetworks.length > 0) {
            fetchEvents();
        }
    }, [selectedNetworks, apiKeySubmitted]);

    return (
        <div className={styles.eventsTablePageContainer}>
            <div className={styles.apiKeySection}>
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
            </div>
            {apiKeySubmitted && (
                <div className={styles.orgNetworkSection}>
                    <Card>
                        <OrgList apiKey={apiKey} setSelectedOrg={setSelectedOrg} />
                    </Card>
                    {selectedOrg && (
                        <Card>
                            <NetworkList
                                orgId={selectedOrg}
                                onNetworkSelectionChange={setSelectedNetworks}
                            />
                        </Card>
                    )}
                </div>
            )}
            {selectedNetworks.length > 0 && (
                <div className={styles.eventsSection}>
                    <Card>
                        <EventsTable events={events} />
                    </Card>
                </div>
            )}
        </div>
    );
}

export default EventsTablePage;
