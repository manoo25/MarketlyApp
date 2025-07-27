import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';

export default function WaveDivider() {
  return (
    <View style={styles.container}>
      <Svg
        style={styles.wave}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <Path
          d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
          fill="#FFFF"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    overflow: 'hidden',
  },
  wave: {
    position: 'relative',
    display: 'flex',
    width: '100%', // بدلاً من calc(100% + 1.3px)
    height: 15,
  },
});