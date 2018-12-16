import { define } from 'osagai'
import styles from './styles.css'

function Loader() {
  return () => `
    <div class="${styles.loader}">
      <svg viewBox="0 0 32 32" width="32" height="32">
        <circle class="${styles.loader__spinner}" cx="16" cy="16" r="14" fill="none"></circle>
      </svg>
    </div>
  `
}

define('weather-loader', Loader)