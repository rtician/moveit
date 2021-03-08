import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { ChallengeContext } from './ChallengesContext';

interface CountdownContextData {
    hasFinished: boolean,
    isActive: boolean,
    minutes: number
    seconds: number,
    resetCountdown: () => void,
    startCountdown: () => void
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider ({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengeContext)

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
    }

    function decreaseTime() {
        if (isActive === true){
            if (time > 0) {
                countdownTimeout = setTimeout(() => {
                    setTime(time - 1);
                }, 1000)
            } else if (time === 0) {
                setHasFinished(true);
                setIsActive(false);
                startNewChallenge();
            }
        }
    }

    useEffect(() => {
        decreaseTime();
    }, [isActive, time])

    return (
        <CountdownContext.Provider
            value={{
                hasFinished,
                isActive,
                minutes,
                resetCountdown,
                seconds,
                startCountdown
            }}
        >
            {children}
        </CountdownContext.Provider>
    );
}
