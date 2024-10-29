import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.clockContainer}>
      <Text style={styles.clockText}>{time.toLocaleDateString()}</Text>
      <Text style={styles.clockText}>{time.toLocaleTimeString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  clockContainer: {
    alignItems: 'center',
    padding: 10,
  },
  clockText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Clock;
