import React, { useState, useEffect } from 'react';
import type { Votes, VoteType } from '../../types/votes';
import { CafeInfo } from '../CafeInfo/CafeInfo';
import { VoteOptions } from '../VoteOptions/VoteOptions';
import { VoteStats } from '../VoteStats/VoteStats';
import { Notification } from '../Notification/Notification';
import css from './App.module.css';

const DEFAULT_VOTES: Votes = {
  good: 0,
  neutral: 0,
  bad: 0,
};

export const App: React.FC = () => {
  const [votes, setVotes] = useState<Votes>(() => {
    const savedVotes = localStorage.getItem('cafe-votes');
    return savedVotes ? JSON.parse(savedVotes) : DEFAULT_VOTES;
  });

  useEffect(() => {
    localStorage.setItem('cafe-votes', JSON.stringify(votes));
  }, [votes]);

  const handleVote = (type: VoteType): void => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [type]: prevVotes[type] + 1,
    }));
  };

  const resetVotes = (): void => {
    setVotes(DEFAULT_VOTES);
  };

  const totalVotes = votes.good + votes.neutral + votes.bad;

  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      
      <VoteOptions 
        onVote={handleVote} 
        onReset={resetVotes} 
        canReset={totalVotes > 0} 
      />

      {totalVotes > 0 ? (
        <VoteStats 
          votes={votes} 
          totalVotes={totalVotes} 
          positiveRate={positiveRate} 
        />
      ) : (
        <Notification />
      )}
    </div>
  );
};
