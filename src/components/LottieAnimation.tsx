import React from 'react';
import Lottie from 'react-lottie-player';
import { animated, useTransition } from 'react-spring';
import { useCurrentFrame } from 'remotion';

import animationData from '../lotties/doctorLab.json';

export default function App(Props: { play: boolean; animeObj: any }) {
  const frame = useCurrentFrame();

  return (
    <animated.div>
      <Lottie
        animationData={Props.animeObj || animationData}
        // play={frame > 10 && frame < 90 ? true : false}
        play={true}
        style={{
          width: 250,
          height: 200,
          position: 'absolute',
          bottom: 30,
          left: 40,
        }}
      />
    </animated.div>
  );
}
