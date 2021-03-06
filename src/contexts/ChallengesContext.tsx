import { createContext, useState, ReactNode } from 'react';
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
    levelUp: () => void,
    resetChallenge: () => void,
    startNewChallenge: () => void
}

interface ChallengeProviderProps {
    children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({ children }: ChallengeProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentXP, setCurrentXP] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge)
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    return (
        <ChallengeContext.Provider
            value={{
                activeChallenge,
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
