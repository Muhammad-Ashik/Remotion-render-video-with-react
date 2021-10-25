import { Player, PlayerRef } from '@remotion/player';
import React, {
  Fragment,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Sequence } from 'remotion';

import animationData from '../../lotties/doctorLab.json';
import BottomBox from '../Components/BottomBox';
import SideRail from '../Components/sideRail';
import { Transition } from '../Components/Transition';
import VideoComponent from '../Components/VideoComponent';
import LottieAnimation from '../LottieAnimation';

let lottie: any;

const MyComposition = (props: { play: boolean; animeObj: any }) => {
  return (
    <Fragment>
      <Sequence from={0} durationInFrames={350}>
        <VideoComponent playVideo={props.play} />
      </Sequence>
      <Sequence from={55} durationInFrames={126}>
        <Transition type="in">
          <Transition type="out">
            <LottieAnimation animeObj={lottie} play={props.play} />
          </Transition>
        </Transition>
      </Sequence>
      <Sequence from={65} durationInFrames={127}>
        <Transition type="in">
          <Transition type="out">
            <BottomBox />
          </Transition>
        </Transition>
      </Sequence>
      <Sequence from={45} durationInFrames={125}>
        <Transition type="in">
          <Transition type="out">
            <SideRail />
          </Transition>
        </Transition>
      </Sequence>
      {/*<AnimatedImage playVideo={props.play} />*/}
    </Fragment>
  );
};

function PlayerComponent() {
  const playerRef = useRef<PlayerRef>(null);
  const [play, setPlay] = useState(false);
  const [img, setImg] = useState<any>();
  const [text, setText] = useState<any>();
  const [animeObj, setAnimeObj] = useState<any>(animationData);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.addEventListener('play', () => {
        setPlay(true);
      });

      playerRef.current.addEventListener('pause', () => {
        setPlay(false);
      });

      playerRef.current.addEventListener('seeked', (e) => {
        console.log('seeked to ' + e.detail.frame);
      });
      playerRef.current.addEventListener('timeupdate', (e) => {
        console.log('time has updated to ' + e.detail.frame);
      });
    }
  }, []);

  useEffect(() => {
    setAnimeObj(JSON.stringify(animationData));
    console.log(animeObj, 'JSON');
  }, [animeObj]);

  const handleChange = (event: any) => {
    console.log(animeObj, 'inside handle change');
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function () {
      setImg(reader.result);
      // debugger;
      const newAnimeObj = { ...JSON.parse(animeObj) };
      // newAnimeObj.assets[0].p = reader.result;
      newAnimeObj.assets[0].p = reader.result;
      newAnimeObj.assets[1].p = reader.result;
      newAnimeObj.assets[3].layers[0].t.d.k[0].s.t = text;
      // newAnimeObj.assets[3].p = reader.result;
      // newAnimeObj.assets[2].p = reader.result;
      console.log(reader.result, 'reader.result');
      setAnimeObj(newAnimeObj);
      lottie = newAnimeObj;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    console.log(event.target.files[0]);
    // setImg(URL.createObjectURL(event.target.files[0]));
  };

  const handleTextChange = (event: any) => {
    setText(event.target.value);
  };

  const submitTextChange = () => {
    const newAnimeObj = { ...JSON.parse(animeObj) };
    // newAnimeObj.assets[0].p = reader.result;
    newAnimeObj.assets[3].layers[0].t.d.k[0].s.t = text;
    // newAnimeObj.assets[3].p = reader.result;
    // newAnimeObj.assets[2].p = reader.result;
    setAnimeObj(newAnimeObj);
    lottie = newAnimeObj;
  };

  return (
    <div>
      <br />
      <input type="file" onChange={handleChange} />
      <img style={{ width: 100 }} src={img} />
      <label>
        Name:
        <input type="text" value={text} onChange={handleTextChange} />
      </label>
      <button onClick={submitTextChange}>Submit</button>
      <br />
      <br />
      <Player
        ref={playerRef}
        durationInFrames={30 * 10}
        compositionWidth={800}
        compositionHeight={450}
        fps={30}
        component={() => MyComposition({ play, animeObj })}
        controls={true}
        showVolumeControls={true}
        allowFullscreen={true}
        clickToPlay={true}
        loop
        spaceKeyToPlayOrPause={true}
        style={{ backgroundColor: '#46e891' }}
        // Many other optional props are available.
      />
    </div>
  );
}

export default PlayerComponent;
