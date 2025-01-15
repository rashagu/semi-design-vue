import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/audioPlayer/constants';
import Button from '../button';
import Dropdown from '../dropdown';
import Image from '../image';
import Tooltip from '../tooltip';
import Popover from '../popover';
//TODO 放Dropdown后面
import '@douyinfe/semi-foundation/audioPlayer/audioPlayer.scss';
import {
  IconAlertCircle,
  IconBackward,
  IconFastForward,
  IconPause,
  IconPlay,
  IconRefresh,
  IconRestart,
  IconVolume2,
  IconVolumnSilent,
} from '@kousum/semi-icons-vue';
import AudioSlider from './audioSlider';
import AudioPlayerFoundation from '@douyinfe/semi-foundation/audioPlayer/foundation';
import { AudioPlayerAdapter } from '@douyinfe/semi-foundation/audioPlayer/foundation';
import { formatTime } from './utils';
import { BaseProps, useBaseComponent } from '../_base/baseComponent';
import {
  type CSSProperties,
  defineComponent,
  h,
  nextTick,
  onMounted,
  onUnmounted, PropType,
  reactive,
  shallowRef,
  useSlots,
} from 'vue';
import { vuePropsMake } from '../PropTypes';
import { CombineProps } from '../interface';

type AudioSrc = string;
type AudioInfo = {
  title?: string;
  cover?: string;
  src: string;
};
type AudioUrlArray = (AudioInfo | string)[];

type AudioUrl = AudioSrc | AudioInfo | AudioUrlArray;

export type AudioPlayerTheme = 'dark' | 'light';

export interface AudioPlayerProps extends BaseProps {
  audioUrl: AudioUrl;
  autoPlay?: boolean;
  showToolbar?: boolean;
  skipDuration?: number;
  theme?: AudioPlayerTheme;
  className?: string;
  style?: CSSProperties;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentIndex: number;
  totalTime: number;
  currentTime: number;
  currentRate: { label: string; value: number };
  volume: number;
  error: boolean;
}

const prefixCls = cssClasses.PREFIX;
const propTypes: CombineProps<AudioPlayerProps> = {
  audioUrl: {
    type: [String, Object, Array] as PropType<AudioPlayerProps['audioUrl']>,
    required: true
  },
  autoPlay: Boolean as PropType<AudioPlayerProps['autoPlay']>,
  showToolbar: Boolean,
  skipDuration: Number,
  theme: String as PropType<AudioPlayerProps['theme']>,
  className: String,
  style: Object,
};
const defaultProps: Partial<AudioPlayerProps> = {
  autoPlay: false,
  showToolbar: true,
  skipDuration: 10,
  theme: 'dark',
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps);
const AudioPlayer = defineComponent({
  props: { ...vuePropsType },
  name: 'AudioPlayer',
  setup(props, { attrs }) {
    const slots = useSlots();
    const audioRef = shallowRef();
    const rateOptions = [
      { label: '0.5x', value: 0.5 },
      { label: '0.75x', value: 0.75 },
      { label: '1.0x', value: 1 },
      { label: '1.5x', value: 1.5 },
      { label: '2.0x', value: 2 },
    ];
    const state = reactive<AudioPlayerState>({
      isPlaying: false,
      currentIndex: 0,
      totalTime: 0,
      currentTime: 0,
      currentRate: { label: '1.0x', value: 1 },
      volume: 100,
      error: false,
    });

    const { adapter: adapterInject, getDataAttr } = useBaseComponent(props, state);
    function adapter_(): AudioPlayerAdapter<AudioPlayerProps, AudioPlayerState> {
      return {
        ...adapterInject(),
        init: () => {
          if (audioRef.value) {
            audioRef.value.addEventListener('loadedmetadata', () => {
              foundation.initAudioState();
            });
            audioRef.value.addEventListener('error', () => {
              foundation.errorHandler();
            });
            audioRef.value.addEventListener('ended', () => {
              foundation.endHandler();
            });
          }
        },
        destroy: () => {
          if (audioRef.value) {
            audioRef.value.removeEventListener('loadedmetadata', () => {
              foundation.initAudioState();
            });
            audioRef.value.removeEventListener('error', () => {
              foundation.errorHandler();
            });
            audioRef.value.removeEventListener('ended', () => {
              foundation.endHandler();
            });
          }
        },
        handleStatusClick: () => {
          if (!audioRef.value) return;
          if (state.isPlaying) {
            audioRef.value.pause();
          } else {
            audioRef.value.play();
          }
          state.isPlaying = !state.isPlaying;
        },
        getAudioRef: () => audioRef.value,
        resetAudioState: () => {
          state.isPlaying = true;
          state.currentTime = 0;
          state.currentRate = { label: '1.0x', value: 1 };
          nextTick(() => {
            if (audioRef.value) {
              audioRef.value.currentTime = state.currentTime;
              audioRef.value.playbackRate = state.currentRate.value;
              audioRef.value.play();
            }
          });
        },
        handleTimeUpdate: () => {
          if (!audioRef.value) return;
          state.currentTime = audioRef.value.currentTime;
        },
        handleTrackChange: (direction: 'next' | 'prev') => {
          if (!audioRef.value) return;
          const { audioUrl } = props as AudioPlayerProps;
          const isAudioUrlArray = Array.isArray(audioUrl);
          if (isAudioUrlArray) {
            if (direction === 'next') {
              state.currentIndex = (state.currentIndex + 1) % audioUrl.length;
              state.error = false;
            } else {
              state.currentIndex = (state.currentIndex - 1 + audioUrl.length) % audioUrl.length;
              state.error = false;
            }
          }
          foundation.resetAudioState();
        },
        handleTimeChange: (value: number) => {
          if (!audioRef.value) return;
          audioRef.value.currentTime = value;
          state.currentTime = value;
        },
        handleRefresh: () => {
          if (!audioRef.value) return;
          if (state.error) {
            audioRef.value.load();
          } else {
            audioRef.value.currentTime = 0;
            state.currentTime = 0;
          }
        },
        handleSpeedChange: (value: { label: string; value: number }) => {
          if (!audioRef.value) return;
          audioRef.value.playbackRate = value.value;
          state.currentRate = value;
        },
        handleSeek: (direction: number) => {
          if (!audioRef.value) return;
          const { skipDuration = 10 } = props;
          const newTime = Math.min(
            Math.max(audioRef.value.currentTime + direction * skipDuration, 0),
            audioRef.value.duration
          );
          audioRef.value.currentTime = newTime;
        },
        handleVolumeChange: (value: number) => {
          if (!audioRef.value) return;
          const volume = Math.floor(value);
          audioRef.value.volume = volume / 100;
          state.volume = volume;
        },
      };
    }
    const adapter = adapter_();
    const foundation = new AudioPlayerFoundation(adapter);

    onMounted(() => {
      foundation.init();
    });
    onUnmounted(() => {
      foundation.destroy();
    });

    const handleStatusClick = () => {
      foundation.handleStatusClick();
    };

    const handleTrackChange = (direction: 'next' | 'prev') => {
      foundation.handleTrackChange(direction);
    };

    const handleTimeChange = (value: number) => {
      foundation.handleTimeChange(value);
    };

    const handleRefresh = () => {
      foundation.handleRefresh();
    };

    const handleSpeedChange = (value: { label: string; value: number }) => {
      foundation.handleSpeedChange(value);
    };

    const handleSeek = (direction: number) => {
      foundation.handleSeek(direction);
    };

    const handleTimeUpdate = () => {
      foundation.handleTimeUpdate();
    };

    const handleVolumeChange = (value: number) => {
      foundation.handleVolumeChange(value);
    };

    const handleVolumeSilent = () => {
      if (!audioRef.value) return;
      audioRef.value.volume = state.volume === 0 ? 0.5 : 0;
      state.volume = state.volume === 0 ? 50 : 0;
    };

    const getAudioInfo = (audioUrl: AudioUrl) => {
      const isAudioUrlArray = Array.isArray(audioUrl);
      if (isAudioUrlArray) {
        const audioInfo = audioUrl[state.currentIndex];
        if (typeof audioInfo === 'string') {
          return { src: audioInfo, audioTitle: null, audioCover: null };
        } else {
          return { src: audioInfo.src, audioTitle: audioInfo.title, audioCover: audioInfo.cover };
        }
      } else if (typeof audioUrl === 'string') {
        return { src: audioUrl, audioTitle: null, audioCover: null };
      } else {
        return { src: audioUrl.src, audioTitle: audioUrl.title, audioCover: audioUrl.cover };
      }
    };

    const renderControl = () => {
      const { error } = state;
      const isAudioUrlArray = Array.isArray(props.audioUrl);
      const iconClass = cls(`${prefixCls}-control-button-icon`);
      const circleStyle = {
        borderRadius: '50%',
      };
      const transparentStyle = {
        background: 'transparent',
      };
      const playStyle = {
        marginLeft: '1px',
      };
      return (
        <div class={cls(`${prefixCls}-control`)}>
          {isAudioUrlArray && (
            <Tooltip content="Previous" autoAdjustOverflow showArrow={false}>
              <Button
                style={{ ...circleStyle, ...transparentStyle }}
                size="large"
                icon={<IconRestart size="large" className={iconClass} />}
                onClick={() => handleTrackChange('prev')}
              />
            </Tooltip>
          )}
          <Button
            style={circleStyle}
            size="large"
            disabled={error}
            onClick={handleStatusClick}
            icon={state.isPlaying ? <IconPause size="large" /> : <IconPlay style={playStyle} size="large" />}
            className={cls(`${cssClasses.PREFIX}-control-button-play`, {
              [`${cssClasses.PREFIX}-control-button-play-disabled`]: error,
            })}
          />
          {isAudioUrlArray && (
            <Tooltip content="Next" autoAdjustOverflow showArrow={false}>
              <Button
                style={{ ...circleStyle, ...transparentStyle }}
                size="large"
                icon={<IconRestart size="large" rotate={180} className={iconClass} />}
                onClick={() => handleTrackChange('next')}
              />
            </Tooltip>
          )}
        </div>
      );
    };

    const renderInfo = () => {
      const { audioTitle, audioCover } = getAudioInfo(props.audioUrl);
      const { theme } = props;
      const { currentTime, totalTime, error } = state;
      return (
        <div class={cls(`${prefixCls}-info-container`)}>
          {audioCover && <Image src={audioCover} width={50} height={50} />}
          <div class={cls(`${prefixCls}-info`)}>
            {audioTitle && (
              <div class={cls(`${prefixCls}-info-title`)}>
                {audioTitle}
                {error && renderError()}
              </div>
            )}
            {!error && (
              <div class={cls(`${prefixCls}-info-time`)}>
                <span style={{ width: '38px' }}>{formatTime(currentTime)}</span>
                <div class={cls(`${prefixCls}-slider-container`)}>
                  <AudioSlider value={currentTime} max={totalTime} theme={theme} onChange={handleTimeChange} />
                </div>
                <span style={{ width: '38px' }}>{formatTime(totalTime)}</span>
              </div>
            )}
          </div>
        </div>
      );
    };

    const renderToolbar = () => {
      const { volume, error } = state;
      const { skipDuration = 10, theme = 'dark' } = props;
      const iconClass = cls(`${prefixCls}-control-button-icon`);
      const transparentStyle = {
        background: 'transparent',
      };
      const isVolumeSilent = volume === 0;
      return !error ? (
        <div class={cls(`${prefixCls}-control`)}>
          <Popover
            autoAdjustOverflow
            style={{background:'none'}}
            content={
              <div class={cls(`${prefixCls}-control-volume`)}>
                <div class={cls(`${prefixCls}-control-volume-title`)}>{volume}%</div>
                <AudioSlider
                  value={volume}
                  max={100}
                  vertical
                  height={120}
                  theme={theme}
                  showTooltip={false}
                  onChange={handleVolumeChange}
                />
              </div>
            }
          >
            <Button
              style={transparentStyle}
              icon={
                !isVolumeSilent ? <IconVolume2 className={iconClass} /> : <IconVolumnSilent className={iconClass} />
              }
              onClick={handleVolumeSilent}
            />
          </Popover>
          <Tooltip content={`Backward ${skipDuration}s`} autoAdjustOverflow showArrow={false}>
            <Button
              style={transparentStyle}
              icon={<IconBackward className={iconClass} />}
              onClick={() => handleSeek(-1)}
            />
          </Tooltip>
          <Tooltip content={`Forward ${skipDuration}s`} autoAdjustOverflow showArrow={false}>
            <Button
              style={transparentStyle}
              icon={<IconFastForward className={iconClass} />}
              onClick={() => handleSeek(1)}
            />
          </Tooltip>
          <Dropdown
            tooltipStyle={{background:'none'}}
            render={
              <Dropdown.Menu className={cls(`${prefixCls}-control-speed-menu`)}>
                {rateOptions.map((option) => (
                  <Dropdown.Item
                    className={cls(`${prefixCls}-control-speed-menu-item`)}
                    key={option.value}
                    onClick={() => handleSpeedChange(option)}
                    active={option.value === state.currentRate.value}
                  >
                    {option.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            }
            //@ts-ignore TODO 没有onChange属性
            // onChange={handleSpeedChange}
          >
            <div class={cls(`${prefixCls}-control-speed`)}>
              <span>{state.currentRate.label}</span>
            </div>
          </Dropdown>
          <Button
            onClick={() => handleRefresh()}
            style={transparentStyle}
            icon={<IconRefresh style={{ transform: 'rotateY(180deg)' }} className={iconClass} />}
          />
        </div>
      ) : (
        <div class={cls(`${prefixCls}-control`)}>
          <Button
            onClick={() => handleRefresh()}
            style={transparentStyle}
            icon={<IconRefresh style={{ transform: 'rotateY(180deg)' }} className={iconClass} />}
          />
        </div>
      );
    };

    const renderError = () => (
      <div class={cls(`${prefixCls}-error`)}>
        <IconAlertCircle size="large" />
        音频加载失败
      </div>
    );

    return () => {
      const { audioUrl, autoPlay, className, style, showToolbar = true, theme = 'dark' } = props;
      const src = getAudioInfo(audioUrl).src;
      return (
        <div class={cls(prefixCls, className, `${prefixCls}-${theme}`)} style={style}>
          <audio
            src={src}
            autoplay={autoPlay}
            class={cls(prefixCls, className)}
            style={style}
            ref={audioRef}
            onTimeupdate={handleTimeUpdate}
          >
            <track kind="captions" src={src} />
          </audio>
          {renderControl()}
          {renderInfo()}
          {showToolbar && renderToolbar()}
        </div>
      );
    };
  },
});

export default AudioPlayer;
