import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string,
    amount: number
}

interface ChallengeContextData {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    activeChallenge: Challenge,
    levelUp: () => void;
    startNewChallenge: () => void;
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

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge)
    }

    return (
        <ChallengeContext.Provider
            value={{
                level,
                levelUp,
                challengesCompleted,
                currentXP,
                startNewChallenge,
                activeChallenge,
            }}
        >
            {children}
        </ChallengeContext.Provider>
    );
}
