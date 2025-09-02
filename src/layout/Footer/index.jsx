import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.copyright}>
                        © 2024 LeetCode Clone. All rights reserved.
                    </div>
                    <div className={styles.links}>
                        <a href="#">Help Center</a>
                        <a href="#">Jobs</a>
                        <a href="#">Bug Bounty</a>
                        <a href="#">Terms</a>
                        <a href="#">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;