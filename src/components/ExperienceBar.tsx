import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    const { currentXP, experienceToNextLevel } = useContext(ChallengeContext);

    const percentToNextLevel = Math.round(currentXP * 100) / experienceToNextLevel;

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }}>
                    <span className={styles.currentXP} style={{ left: `${percentToNextLevel}%` }}>
                        {currentXP} xp
                    </span>
                </div>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    );
}
