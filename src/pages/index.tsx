import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css';

interface HomeProps {
    level: number,
    currentXP: number,
    challengesCompleted: number
}

export default function Home(props: HomeProps) {
    return (
        <ChallengeProvider
            level={props.level}
            currentXP={props.currentXP}
            challegensCompleted={props.challengesCompleted}
        >
            <div className={styles.container}>
                <Head>
                    <title>Início | move.it</title>
                </Head>

                <ExperienceBar />

                <CountdownProvider>
                    <section>
                        <div>
                            <Profile />
                            <CompletedChallenges />
                            <Countdown />
                        </div>
                        <div>
                            <ChallengeBox />
                        </div>
                    </section>
                </CountdownProvider>
            </div>
        </ChallengeProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { level, currentXP, challengesCompleted } = ctx.req.cookies;

    return {
        props: {
            level: Number(level),
            currentXP: Number(currentXP),
            challengesCompleted: Number(challengesCompleted)
        }
    }
}
