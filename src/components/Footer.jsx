import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer>
            <div>
                <p>Copyright &copy; Abdullah Zeeshan 2024</p>
            </div>
            <div>
                <a href="https://github.com/4bdullah7eeshan" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </div>
        </footer>
    );
}

export default Footer;