import { useState, useEffect } from 'react';
import { saveGameState, clearGameState } from '../services/appStorage';

export default function useGameState() {
  //Game info: num players, skinID, starting life
  const [numPlayers, setNumPlayers] = useState(null);
  const [skinID, setSkinID] = useState(null);
  const [startingLife, setStartingLife] = useState(null);

  const [player1Life, setPlayer1Life] = useState(startingLife);
  const [player2Life, setPlayer2Life] = useState(startingLife);
  const [player3Life, setPlayer3Life] = useState(startingLife);
  const [player4Life, setPlayer4Life] = useState(startingLife);

  function usePlayerHistory(initialLife) {
    const [history, setHistory] = useState([initialLife]);

    const updateHistory = (life) => {
      if (
        life !== undefined &&
        history.length > 0 &&
        life !== history[history.length - 1]
      ) {
        setHistory((prevHistory) => [...prevHistory, life]);
      }
    };

    const resetHistory = () => setHistory([startingLife]);
    const loadHistory = (historyToLoad) => setHistory(historyToLoad);

    return [history, updateHistory, resetHistory, loadHistory];
  }

  // Usage for each player
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

  // Usage within useEffect for each player
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

  //array of counter objects of the form
  // { counterName: str, count: int, initialCount: int}

  // const [countersState, setCountersState] = useState([]);
  // const counters = countersState.map((counter, i) => {
  //   const { counterName, count, initialCount } = counter;
  //   const setCount = (newCount) => {
  //     //Set the counter.count stored in counterState to newCount
  //     // const newState = countersState[i].count

  //     setCountersState((prevState) => {
  //       prevState[i].count = newCount;
  //     });
  //   };
  //   const resetCount = () => {
  //     setCountersState((prevState) => {
  //       prevState[i].count = initialCount;
  //     });
  //   };
  //   return { counterName, count, setCount, resetCount };
  // });

  const [countersState, setCountersState] = useState([]);

  const counters = countersState.map((counter, i) => {
    const { counterName, count, initialCount } = counter;

    const setCount = (newCount) => {
      setCountersState((prevState) => {
        // Create a copy of the previous state
        const newState = [...prevState];

        // Update the count of the specific counter
        newState[i] = { ...newState[i], count: newCount };

        return newState;
      });
    };

    const resetCount = () => {
      setCountersState((prevState) => {
        // Create a copy of the previous state
        const newState = [...prevState];

        // Reset the count of the specific counter to its initial value
        newState[i] = { ...newState[i], count: initialCount };

        return newState;
      });
    };

    return { counterName, count, setCount, resetCount };
  });

  const addCounter = (counter) => {
    setCountersState([...countersState, counter]);
  };
  const removeCounter = (counterName) => {
    setCountersState((prevState) => {
      prevState.filter((counter) => counter.counterName !== counterName);
    });
  };

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

    setCountersState([]);
    // resetGame();
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
    setCountersState(gameState.countersState);

    setNumPlayers(gameState.numPlayers);
    setSkinID(gameState.skinID);
    setStartingLife(gameState.startingLife);
  };
  const saveGame = () => {
    //NEEDS TO SAVE THE SKIN TOO
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
    console.log('resetting game with: ', startingLife);
    resetPlayer1History();
    resetPlayer2History();
    resetPlayer3History();
    resetPlayer4History();
    setPlayer1Life(startingLife);
    setPlayer2Life(startingLife);
    setPlayer3Life(startingLife);
    setPlayer4Life(startingLife);

    clearGameState();

    setCountersState((prevState) =>
      prevState.map((preResetCounter) => {
        return {
          counterName: preResetCounter.counterName,
          initialCount: preResetCounter.initialCount,
          count: preResetCounter.initialCount
        };
      })
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
    clearCounters: () => setCountersState([])
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
