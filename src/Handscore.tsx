import React from 'react';
import './Handscore.css';




// ฟังก์ชันสำหรับคำนวณคะแนนเมื่อมีการ์ด 3 ใบ
const calculateRankSetScore = (rank: string): number => {
  if (rank === 'A') {
    return 35;
  } else {
    return 32.5;
  }
};


// ฟังก์ชันสำหรับคำนวณคะแนนของมือการ์ด
const getHandScore = (hand: string): { [key: string]: number } | number => {
  if (!hand.trim()) {
    return {};
  }

  const upperCaseHand = hand.toUpperCase();
  const cards = upperCaseHand.split(' ');
  const suitScores: { [key: string]: number } = {
    S: 0,
    C: 0,
    D: 0,
    H: 0,
  };

  for (const card of cards) {
    const suit = card.charAt(0);
    const rank = card.slice(1);

    if (['J', 'Q', 'K'].includes(rank)) {
      suitScores[suit] += 10;
    } else if (rank === 'A') {
      suitScores[suit] += 11;
    } else {
      suitScores[suit] += parseInt(rank, 10);
    }
  }

  const rankCount: { [key: string]: number } = {};
  for (const card of cards) {
    const rank = card.slice(1);
    rankCount[rank] = (rankCount[rank] || 0) + 1;
  }
  for (const rank in rankCount) {
    if (rankCount[rank] === 3) {
      const rankSetScore = calculateRankSetScore(rank);
      return rankSetScore;
    }
  }

  return suitScores;
};

const HandScoreCalculator: React.FC = () => {
  const [hand, setHand] = React.useState('');
  const [score, setScore] = React.useState<{ [key: string]: number } | number | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHand(event.target.value);
  };

  const handleSubmit = () => {
    if (!hand.trim()) { // แจ้ง Alert บังคับให้ใส่ข้อมูล 
        alert('Please enter a hand.');
        return;
      }
    const handScore = getHandScore(hand);
    setScore(handScore);
  };


    // ฟังก์ชันสำหรับแสดงผลคะแนนของแต่ละสำรับที่คำนวณได้  
    const renderScoreDetails = (scoreDetails: { [key: string]: number } | null | undefined): JSX.Element => {
        if (!scoreDetails) {
          return <p className='text-p'>Score details are not available.</p>;
        }

    return (
      <div>
        <p className='text-p'>Score values for each suit:</p>
        {Object.keys(scoreDetails).map((suit) => (
          <p className='text-p' key={suit}>
            {suit}: {scoreDetails[suit]}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Enter the cards in your hand.</h1>
      <p>hearts(H), clubs(C), diamonds(D) or spades(S)</p>
      <p>Ex. S8 S10 CA</p>
      <input type="text" value={hand} onChange={handleChange} className='input'/>
      <button onClick={handleSubmit} className='btn'>Calculate Score</button>
      {typeof score === 'number' ? (
        <p className='text-p'>Hand Score: {score}</p>
      ) : (
        renderScoreDetails(score as { [key: string]: number })
      )}
    </div>
  );
};

export default HandScoreCalculator;
