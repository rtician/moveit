import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string,
    amount: number
}

interface ChallengeContextData {
    activeChallenge: Challenge,
    challengesCompleted: number,
    currentXP: number,
    experienceToNextLevel: number,
    level: number,
    completeChallenge: () => void,
    levelUp: () => void,
    resetChallenge: () => void,
    startNewChallenge: () => void
}

interface ChallengeProviderProps {
    children: ReactNode;
    level: number,
    currentXP: number,
    challengesCompleted: number
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({ children, ...rest }: ChallengeProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentXP, setCurrentXP] = useState(rest.currentXP ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentXP', String(currentXP));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentXP, challengesCompleted])

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount} xp`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return
        }

        const { amount } = activeChallenge;
        let finalXP = currentXP + amount;

        if (finalXP >= experienceToNextLevel) {
            finalXP = finalXP - experienceToNextLevel;
            levelUp();
        }

        setCurrentXP(finalXP);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengeContext.Provider
            value={{
                activeChallenge,
                completeChallenge,
                challengesCompleted,
                currentXP,
                experienceToNextLevel,
                level,
                levelUp,
                resetChallenge,
                startNewChallenge
            }}
        >
            {children}
        </ChallengeContext.Provider>
    );
}
