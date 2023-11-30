
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Card from '../components/Card';

function Home() {
    return (
        <div className={styles.centeredcontainer}>
            {/* Top Card */}
            <Card className={styles.home}>
                <h1>Welcome to the Meraki APP Template</h1>
                <p>This is a sample home page for your app.</p>
                <p>Feel free to customize and add more content here.</p>
            </Card>

            {/* Three Equal-Sized Cards */}
            <div className={styles.cardContainer}>
                <Card className={styles.card}>
                    <h2>Card 1</h2>
                    <p>Description for Card 1.</p>
                    <Link to="/page1" className={styles.link}>
                        Go to Page 1
                    </Link>
                </Card>

                <Card className={styles.card}>
                    <h2>Card 2</h2>
                    <p>Description for Card 2.</p>
                    <Link to="/page2" className={styles.link}>
                        Go to Page 2
                    </Link>
                </Card>

                <Card className={styles.card}>
                    <h2>Card 3</h2>
                    <p>Description for Card 3.</p>
                    <Link to="/apikey" className={styles.link}>
                        Go to API Key Page
                    </Link>
                </Card>
            </div>
        </div>
    );
}

export default Home;
