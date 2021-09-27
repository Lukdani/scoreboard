const generatePrizeEmoji = (averagePerHole) => {
  let emoji = '🥉';

  // Switching over true so I can do comparisons in case statements;
  switch (true) {
    case averagePerHole === 0:
      emoji = '🥉';
      break;
    case averagePerHole < 3:
      emoji = '🏆';
      break;
    case averagePerHole < 5:
      emoji = '🏅';
      break;
    case averagePerHole < 7:
      emoji = '🥈';
      break;
    default:
      emoji = '🥉';
      break;
  }
  return emoji;
};

export default generatePrizeEmoji;
