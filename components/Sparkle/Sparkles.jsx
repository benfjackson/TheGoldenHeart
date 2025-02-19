import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Sparkle from './Sparkle';

const generateSparkle = () => ({
  id: String(Math.random()),
  size: Math.random() * 20 + 10,
  style: {
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`
  }
});

const Sparkles = ({ on, children }) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!on) {
        setSparkles([]);
      } else {
        setSparkles((prev) => {
          const newSparkle = generateSparkle();
          return [...prev, newSparkle].slice(-10); // Keep only last 10 sparkles
        });
      }
    }, 500);

    return () => clearInterval(interval);
  }, [on]);

  //   if (!on) return children;

  return (
    <View style={styles.container}>
      {sparkles.map((sparkle) => (
        <Sparkle key={sparkle.id} size={sparkle.size} style={sparkle.style} />
      ))}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  content: {
    position: 'relative',
    zIndex: 1
  }
});

export default Sparkles;
