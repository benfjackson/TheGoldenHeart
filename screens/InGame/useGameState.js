import { useState, useEffect } from 'react';
import { saveGameState } from '../../services/appStorage';

export default function useGameState(numPlayers = 2, startingLife = 20) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [guest, setGuest] = useState(gameState.guest || false);

  const [life, setLife] = useState(gameState.life);
  const [guestLife, setGuestLife] = useState(gameState.guestLife);
  const [history, setHistory] = useState(gameState.history || []);
  const [activeCounters, setActiveCounters] = useState(
    gameState.activeCounters || []
  );
  const [reset, setReset] = useState(false);

  //array of counter objects of the form
  // { counterName: str, count: int, initialCount: int}

  const [countersState, setCountersState] = useState([]);

  const counters = countersState.map((counter, i) => {
    const { count, initialCount } = counter;
    const setCount = (newCount) => {
      //Set the counter.count stored in counterState to newCount
      // const newState = countersState[i].count

      setCountersState((prevState) => {
        prevState[i].count = newCount;
      });
    };
    return { count, setCount };
  });

  useEffect(() => {
    setHistory([...history, life]);
  }, [life]);

  useEffect(() => {
    if (history.length > 1 || activeCounters.length > 0) {
      saveGameState({
        life,
        history,
        guest,
        guestLife,
        activeCounters,
        skinID
      });
    }
  }, [life, history, guest, guestLife, activeCounters]);

  const loadGameState = (gameState) => {};

  return { loadGameState };
}
