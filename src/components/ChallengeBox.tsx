import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
    const { activeChallenge } = useContext(ChallengeContext);

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                  <div className={styles.challengeActive}>
                      <header>Ganhe {activeChallenge.amount}xp</header>
                      <main>
                          <img src={`icons/${activeChallenge.type}.svg`} alt="" />
                          <strong>Novo desafio</strong>
                          <p>{activeChallenge.description}</p>
                      </main>
                      <footer>
                          <button
                              type="button"
                              className={styles.challengeFailedButton}
                          >
                              Falhei
                          </button>
                          <button
                              type="button"
                              className={styles.challengeSucceededButton}
                          >
                              Completei
                          </button>
                      </footer>
                  </div>
            ) : (
                <div className={styles.challengeInactive}>
                    <strong>Finalize um ciclo para receber um desagio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up" />
                        Avance de level completando desafios.
                    </p>
                </div>
            ) }
        </div>
    );
}