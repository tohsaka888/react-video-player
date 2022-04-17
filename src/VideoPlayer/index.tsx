import React, { useEffect, useRef } from "react";
import videojs, { VideoJsPlayer } from "video.js";
import 'video.js/dist/video-js.css';

// initialize video.js plugins
import "videojs-youtube";
import "videojs-landscape-fullscreen";

type Props = {
  options: videojs.PlayerOptions;
  onReady: (player: videojs.Player) => void;
  style?: React.CSSProperties;
};

const initialOptions: videojs.PlayerOptions = {
  controls: true,
  fluid: true,
  preload: "auto",
  autoplay: false,
  liveui: true,
  notSupportedMessage: "播放资源失效,请尝试换源播放",
  playbackRates: [0.5, 1, 1.5, 2],
  responsive: true,
  fill: true,
  controlBar: {
    volumePanel: {
      inline: false,
    },
    playToggle: true,
    remainingTimeDisplay: false,
  },
  userActions: {
    click: true,
  },
  // plugins: {
  //   airplay: {
  //     addButtonToControlBar: true,
  //   }
  // }
};

function VideoPlayer({ options = initialOptions, onReady, ...props }: Props) {
  const videoRef = useRef<HTMLVideoElement>();
  const playerRef = useRef<VideoJsPlayer & { landscapeFullscreen?: any }>();

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (!videoElement) {
        return;
      }

      playerRef.current = videojs(
        videoElement,
        { ...initialOptions, ...options },
        () => {
          if (onReady && playerRef.current) {
            onReady(playerRef.current);
          }
        }
      );

      playerRef.current.landscapeFullscreen({
        fullscreen: {
          enterOnRotate: true,
          exitOnRotate: true,
          alwaysInLandscapeMode: true,
          iOS: true,
        },
      });
    } else {
      if (options.autoplay) {
        playerRef.current.autoplay(options.autoplay);
      }
      if (options.sources) {
        playerRef.current.src(options.sources);
      }
    }
  }, [onReady, options]);

  return (
    <div {...props}>
      <div data-vjs-player>
        <video
          x-webkit-airplay="allow"
          ref={(ref) => {
            if (ref) {
              videoRef.current = ref;
            }
          }}
          className="video-js vjs-big-play-centered vjs-16-9 vjs-fluid vjs-playback-rate"
        />
      </div>
    </div>
  );
}

export default VideoPlayer;
