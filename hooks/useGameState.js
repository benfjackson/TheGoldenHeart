import { useState, useEffect, useMemo } from 'react';
import { saveGameState, clearGameState } from '../services/appStorage';

function usePlayerHistory(initialLife) {
  const [history, setHistory] = useState([initialLife]);

  const updateHistory = (life) => {
    if (
      life !== undefined &&
      history.length > 0 &&
      life !== history[history.length - 1]
    ) {
      setHistory((prev) => [...prev, life]);
    }
  };

  const resetHistory = () => setHistory([initialLife]);
  const loadHistory = (historyToLoad) => setHistory(historyToLoad);

  return [history, updateHistory, resetHistory, loadHistory];
}

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

function useCounters(initialCounters = []) {
  const [counters, setCounters] = useState(() =>
    initialCounters.map((c) => ({ ...c, id: c.id || uuidv4() }))
  );

  const updateCounter = (id, newCount) => {
    setCounters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, count: newCount } : c))
    );
  };

  const resetCounter = (id) => {
    setCounters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, count: c.initialCount } : c))
    );
  };

  const addCounter = (counter) => {
    const newCounter = { ...counter, id: uuidv4() };
    setCounters((prev) => [...prev, newCounter]);
  };

  const removeCounter = (id) => {
    setCounters((prev) => prev.filter((c) => c.id !== id));
  };

  const clearCounters = () => setCounters([]);

  const enrichedCounters = useMemo(
    () =>
      counters.map((c) => ({
        ...c,
        setCount: (newCount) => updateCounter(c.id, newCount),
        resetCount: () => resetCounter(c.id)
      })),
    [counters]
  );

  return {
    counters: enrichedCounters,
    rawState: counters,
    setCounters,
    addCounter,
    removeCounter,
    clearCounters
  };
}

export default function useGameState() {
  const [numPlayers, setNumPlayers] = useState(null);
  const [skinID, setSkinID] = useState(null);
  const [startingLife, setStartingLife] = useState(null);

  const [player1Life, setPlayer1Life] = useState(startingLife);
  const [player2Life, setPlayer2Life] = useState(startingLife);
  const [player3Life, setPlayer3Life] = useState(startingLife);
  const [player4Life, setPlayer4Life] = useState(startingLife);

  const [
    player1History,
    updatePlayer1History,
    resetPlayer1History,
    loadPlayer1History
  ] = usePlayerHistory(startingLife);
  const [
    player2History,
    updatePlayer2History,
    resetPlayer2History,
    loadPlayer2History
  ] = usePlayerHistory(startingLife);
  const [
    player3History,
    updatePlayer3History,
    resetPlayer3History,
    loadPlayer3History
  ] = usePlayerHistory(startingLife);
  const [
    player4History,
    updatePlayer4History,
    resetPlayer4History,
    loadPlayer4History
  ] = usePlayerHistory(startingLife);

  const {
    counters,
    rawState: countersState,
    setCounters,
    addCounter,
    removeCounter,
    clearCounters
  } = useCounters();

  // Watch life changes and track history
  useEffect(() => {
    updatePlayer1History(player1Life);
  }, [player1Life]);
  useEffect(() => {
    updatePlayer2History(player2Life);
  }, [player2Life]);
  useEffect(() => {
    updatePlayer3History(player3Life);
  }, [player3Life]);
  useEffect(() => {
    updatePlayer4History(player4Life);
  }, [player4Life]);

  useEffect(() => {
    saveGame();
  }, [player1Life, player2Life, player3Life, player4Life, countersState]);

  const initialiseGame = (initNumPlayers, initSkinID, initStartingLife) => {
    setNumPlayers(initNumPlayers);
    setSkinID(initSkinID);
    setStartingLife(initStartingLife);

    setPlayer1Life(initStartingLife);
    setPlayer2Life(initStartingLife);
    setPlayer3Life(initStartingLife);
    setPlayer4Life(initStartingLife);

    loadPlayer1History([initStartingLife]);
    loadPlayer2History([initStartingLife]);
    loadPlayer3History([initStartingLife]);
    loadPlayer4History([initStartingLife]);

    clearCounters();
  };

  const loadGame = (gameState) => {
    const { player1Life, player2Life, player3Life, player4Life } =
      gameState.lives;
    const { player1History, player2History, player3History, player4History } =
      gameState.histories;

    setPlayer1Life(player1Life);
    setPlayer2Life(player2Life);
    setPlayer3Life(player3Life);
    setPlayer4Life(player4Life);

    loadPlayer1History(player1History);
    loadPlayer2History(player2History);
    loadPlayer3History(player3History);
    loadPlayer4History(player4History);

    setCounters(gameState.countersState);
    setNumPlayers(gameState.numPlayers);
    setSkinID(gameState.skinID);
    setStartingLife(gameState.startingLife);
  };

  const saveGame = () => {
    const lives = {
      player1Life,
      player2Life,
      player3Life,
      player4Life
    };
    const histories = {
      player1History,
      player2History,
      player3History,
      player4History
    };
    saveGameState({
      lives,
      histories,
      countersState,
      numPlayers,
      skinID,
      startingLife
    });
  };

  const resetGame = () => {
    resetPlayer1History();
    resetPlayer2History();
    resetPlayer3History();
    resetPlayer4History();

    setPlayer1Life(startingLife);
    setPlayer2Life(startingLife);
    setPlayer3Life(startingLife);
    setPlayer4Life(startingLife);

    clearGameState();

    setCounters((prev) =>
      prev.map(({ counterName, initialCount, id }) => ({
        counterName,
        initialCount,
        count: initialCount,
        id
      }))
    );
  };

  const lives = { player1Life, player2Life, player3Life, player4Life };
  const setLives = {
    setPlayer1Life,
    setPlayer2Life,
    setPlayer3Life,
    setPlayer4Life
  };
  const histories = {
    player1History,
    player2History,
    player3History,
    player4History
  };

  const counterControl = {
    counters,
    addCounter,
    removeCounter,
    clearCounters
  };

  return {
    lives,
    setLives,
    histories,
    counterControl,

    loadGame,
    saveGame,
    resetGame,
    initialiseGame,

    numPlayers,
    skinID,
    startingLife
  };
}
