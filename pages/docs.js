import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faCirclePlay,
  faCodeBranch,
  faEllipsis,
  faRedo
} from '@fortawesome/free-solid-svg-icons';

export default function Docs() {
    const [isActive, toggleActive] = useState(true);

    const handleToggle = () => {
        toggleActive(!isActive);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Hello World</title>
            </Head>
                <main className={styles.main}>
                    <div className={`nav-bar ${isActive ? "" : "active"}`}>
                    <div className="menu-icon" onClick={handleToggle}>
                    <div className="icon">
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                    </div>
                    <div className="menu-opts">
                    <a className="opt-link" href="https://github.com/clk1006/tetris" target="_blank" rel="noreferrer">
                        <div className="menu-opt">
                        <div className="icon">
                            <FontAwesomeIcon icon={faCodeBranch} />
                        </div>
                        <span>GitHub</span>
                        </div>
                    </a>
                    <a className="opt-link" href="./docs">
                        <div className="menu-opt">
                        <div className="icon">
                            <FontAwesomeIcon icon={faBook} />
                        </div>
                        <span>Docs</span>
                        </div>
                    </a>
                    <a className="opt-link play-btn" href="./">
                        <div className="menu-opt">
                        <div className="icon">
                            <FontAwesomeIcon icon={faCirclePlay} />
                        </div>
                        <span>Play Tetris</span>
                        </div>
                    </a>
                    </div>
                </div>

                <p>Guten Morgen</p>
            </main>
        </div>      
    );
};