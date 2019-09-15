import { HobTypography } from "@components/HobTypography";
import styled from "@emotion/styled";
import React, { HTMLProps, useEffect, useReducer, useRef } from "react";

export interface IVideoProps {
  source?: string;
  mimeType?: string;
  showStop?: boolean;
  showMute?: boolean;
  showFullscreen?: boolean;
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .hob-video__controls {
    transition: opacity 300ms;
  }

  &.hob-video--playing {
    .hob-video__controls {
      opacity: 0;
    }
  }
  &.hob-video--playing:hover {
    .hob-video__controls {
      opacity: 1;
    }
  }

  video {
    width: 100%;
  }

  button {
    &:focus {
      border: none;
      outline: none;
    }
  }

  progress[value] {
    -webkit-appearance: none;
    appearance: none;
    -moz-appearance: none;
    height: 3.8125rem;

    /* For IE10 */
    color: var(--hob-color--light);

    &::-webkit-progress-bar {
      background-color: var(--hob-color--light);
    }

    &::-webkit-progress-value {
      background-color: var(--hob-color--gray);
    }
  }
`;

const PlayPause = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  .hob-typography {
    font-size: 2.5rem;
  }

  button {
    padding: 0.75rem 0.5625rem;
    display: flex;
    align-items: center;
    border: none;

    &:hover,
    &:focus {
      cursor: pointer;
    }

    svg {
      width: 1.5rem;
      margin-right: 1.25rem;
    }
  }
`;

const CurrentTime = styled(HobTypography)`
  padding-left: 0.625rem;
  position: absolute;
  bottom: 0.2rem;
  left: 0;
  z-index: 2;
  font-size: 2.5rem;
`;

const Progress = styled.progress`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const Volume = styled.div<{ volume: number }>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 7.0625rem;
  display: flex;
  justify-content: space-around;
  height: 3.8125rem;
  background: linear-gradient(
    to top,
    var(--hob-color--gray) ${({ volume }) => Math.floor((volume / 1) * 100)}%,
    var(--hob-color--light) ${({ volume }) => Math.floor((volume / 1) * 100)}%
  );

  &:after {
    position: absolute;
    content: "";
    display: none;
    width: 100%;
    height: 100%;
  }

  button {
    font-size: 2.5rem;
    border: none;
    background: none;
  }
`;

const Video = styled.video``;

interface State {
  currentTime: number;
  duration: number;
  fullscreenEnabled: boolean;
  isFullscreen: boolean;
  paused: boolean;
  volume: number;
}

const initialState: State = {
  currentTime: 0,
  duration: 0,
  fullscreenEnabled: false,
  isFullscreen: false,
  paused: true,
  volume: 0
};

type Action =
  | { type: "SET_CURRENT_TIME"; payload: number }
  | { type: "SET_DURATION"; payload: number }
  | { type: "SET_FULL_SCREEN_ENABLED"; payload: boolean }
  | { type: "SET_FULL_SCREEN"; payload: boolean }
  | { type: "SET_PAUSED"; payload: boolean }
  | { type: "SET_VOLUME"; payload: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FULL_SCREEN_ENABLED":
      return {
        ...state,
        fullscreenEnabled: action.payload
      };

    case "SET_FULL_SCREEN":
      return {
        ...state,
        isFullscreen: action.payload
      };

    case "SET_DURATION":
      return {
        ...state,
        duration: action.payload
      };

    case "SET_CURRENT_TIME":
      return {
        ...state,
        currentTime: action.payload
      };

    case "SET_PAUSED":
      return {
        ...state,
        paused: action.payload
      };

    case "SET_VOLUME":
      return {
        ...state,
        volume: action.payload
      };

    default:
      return state;
  }
};

export const HobVideo: React.FC<IVideoProps & HTMLProps<HTMLVideoElement>> = ({
  source,
  mimeType,
  showMute = false,
  showFullscreen = false,
  showStop = false,
  children
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const withVideo = (fn: (v: HTMLVideoElement) => void) => (): void => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    return fn(video);
  };

  type VideoControl = (v: HTMLVideoElement) => void;

  const playPause: VideoControl = video => {
    if (video.paused || video.ended) {
      dispatch({ type: "SET_PAUSED", payload: false });
      video.play();
    } else {
      dispatch({ type: "SET_PAUSED", payload: true });
      video.pause();
    }
  };

  const stop: VideoControl = video => {
    video.pause();
    video.currentTime = 0;
    dispatch({ type: "SET_CURRENT_TIME", payload: 0 });
    dispatch({ type: "SET_PAUSED", payload: true });
  };

  const mute: VideoControl = video => {
    video.muted = !video.muted;
  };

  const volumeUp: VideoControl = video => {
    const currentVolume = Math.floor(video.volume * 10) / 10;
    if (currentVolume < 1) {
      const newVolume = video.volume + 0.1;
      dispatch({ type: "SET_VOLUME", payload: newVolume });
      video.volume = newVolume;
    }
  };

  const volumeDown: VideoControl = video => {
    const currentVolume = Math.floor(video.volume * 10) / 10;
    if (currentVolume > 0) {
      const newVolume = video.volume - 0.1;
      dispatch({ type: "SET_VOLUME", payload: newVolume });
      video.volume = newVolume;
    }
  };

  const onMetaLoad: VideoControl = video => {
    dispatch({ type: "SET_DURATION", payload: video.duration });
    dispatch({ type: "SET_VOLUME", payload: video.volume });
  };

  const updateTime: VideoControl = video => {
    if (state.duration === 0) {
      dispatch({ type: "SET_DURATION", payload: video.duration });
    }

    dispatch({ type: "SET_CURRENT_TIME", payload: video.currentTime });
  };

  const setFullscreen: VideoControl = video => {
    const setIsFullscreen = (b: boolean) => {
      dispatch({ type: "SET_FULL_SCREEN", payload: b });
    };

    if (state.isFullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        setIsFullscreen(false);
      } else {
        const { current: videoContainer } = containerRef;
        if (videoContainer) {
          if (videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen();
          } else if (videoContainer.mozRequestFullScreen) {
            videoContainer.mozRequestFullScreen();
          } else if (videoContainer.webkitRequestFullScreen) {
            videoContainer.webkitRequestFullScreen();
          } else if (videoContainer.msRequestFullscreen) {
            videoContainer.msRequestFullscreen();
          }
          setIsFullscreen(true);
        }
      }
    }
  };

  useEffect(() => {
    dispatch({
      payload: !!(
        document.fullScreen ||
        document.webkitIsFullScreen ||
        document.mozFullScreen ||
        document.msFullscreenElement ||
        document.fullscreenElement
      ),
      type: "SET_FULL_SCREEN_ENABLED"
    });

    const setFullscreenStatus = (b: boolean): void => {
      dispatch({ type: "SET_FULL_SCREEN", payload: b });
    };

    const standard = (): void => {
      setFullscreenStatus(
        !!(document.fullScreen || document.fullscreenElement)
      );
    };
    const webkit = (): void => {
      setFullscreenStatus(!!document.webkitIsFullScreen);
    };
    const moz = (): void => {
      setFullscreenStatus(!!document.mozFullScreen);
    };
    const ms = (): void => {
      setFullscreenStatus(!!document.msFullscreenElement);
    };
    document.addEventListener("fullscreenchange", standard);
    document.addEventListener("webkitfullscreenchange", webkit);
    document.addEventListener("mozfullscreenchange", moz);
    document.addEventListener("msfullscreenchange", ms);

    return () => {
      document.removeEventListener("fullscreenchange", standard);
      document.removeEventListener("webkitfullscreenchange", webkit);
      document.removeEventListener("mozfullscreenchange", moz);
      document.removeEventListener("msfullscreenchange", ms);
    };
  }, []);

  const currentTime = () => {
    const padLeft = (str: string) => str.replace(/^(\d)$/, "0$1");
    const minutes = String(Math.round(state.currentTime / 60));
    const seconds = String(Math.round(state.currentTime - minutes * 60));
    return `${padLeft(minutes)}:${padLeft(seconds)}`;
  };

  return (
    <Container
      ref={containerRef}
      className={`hob-video hob-video--${state.paused ? "paused" : "playing"}`}
    >
      <Video
        className="hob-video"
        ref={videoRef}
        onLoadedMetadata={withVideo(onMetaLoad)}
        onTimeUpdate={withVideo(updateTime)}
        onEnded={withVideo(stop)}
      >
        {source ? <source src={source} type={mimeType} /> : children}
        <p>
          Your browser doesn't support HTML5 video.
          <a href="videos/mikethefrog.mp4">Download</a> the video instead.
        </p>
      </Video>

      <div className="hob-video__controls">
        {state.duration > 0 && (
          <PlayPause>
            <button onClick={withVideo(playPause)}>
              {state.paused ? (
                <>
                  <svg
                    viewBox="0 0 24 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0l24 16L0 30V0z" fill="#C4C4C4" />
                  </svg>
                  <HobTypography variant="button">Play</HobTypography>
                </>
              ) : (
                <>
                  <svg
                    viewBox="0 0 24 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="#C4C4C4" d="M0 0h5v30H0zM9 0h5v30H9z" />
                  </svg>
                  <HobTypography variant="button">Pause</HobTypography>
                </>
              )}
            </button>
          </PlayPause>
        )}

        <CurrentTime variant="body1">{currentTime()}</CurrentTime>

        {showStop && <button onClick={withVideo(stop)}>Stop</button>}

        <Progress value={state.currentTime} max={String(state.duration)}>
          <span
            style={{
              width:
                Math.floor((state.currentTime / state.duration) * 100) + "%"
            }}
          />
        </Progress>

        {showMute && <button onClick={withVideo(mute)}>Mute/Unmute</button>}

        <Volume volume={state.volume}>
          <button onClick={withVideo(volumeDown)}>-</button>
          <button onClick={withVideo(volumeUp)}>+</button>
        </Volume>

        {showFullscreen && state.fullscreenEnabled && (
          <button onClick={withVideo(setFullscreen)}>Fullscreen</button>
        )}
      </div>
    </Container>
  );
};
