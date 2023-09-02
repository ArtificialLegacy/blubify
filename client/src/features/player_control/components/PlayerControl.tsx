import React, { useCallback, useEffect, useState } from 'react'

import '../styles/player_control.scss'

import {
  Drawer,
  IconButton,
  Box,
  Stack,
  Slider,
  Typography,
  Tooltip,
} from '@mui/material'

import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  VolumeUp,
  VolumeOff,
  VolumeDown,
  Repeat,
  RepeatOne,
  Shuffle,
  LooksOneOutlined,
} from '@mui/icons-material'

import formatTime from '../utility/format_time'
import LoopMode from '../types/loop_mode'
import { useSongState } from 'features/songs'
import volumeCurve from '../utility/volume_curve'

type playerControlProps = {
  readonly playlistDrawerOpen: boolean
  readonly playing: boolean
  readonly togglePlaying: () => void
  readonly audioRef: React.RefObject<HTMLAudioElement>
  readonly loopMode: LoopMode
  readonly setLoopMode: (_value: LoopMode) => void
}

/**
 * @prop playlistDrawerOpen - if the playlist drawer is open
 * @prop currentSong - index of the currently selected song in the playlist.
 */
function PlayerControl(_props: playerControlProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(
    Number(localStorage.getItem('volume') ?? 100)
  )
  const [ovolume, setOvolume] = useState(volume)

  const [songs, currentSong, setCurrentSong] = useSongState((_state) => [
    _state.songs,
    _state.currentSong,
    _state.setCurrentSong,
  ])

  useEffect(() => {
    setCurrentTime(0)
  }, [currentSong])

  useEffect(() => {
    const interval = setInterval(() => {
      if (_props.audioRef.current) {
        setCurrentTime(_props.audioRef.current.currentTime)
        setDuration(_props.audioRef.current.duration)
        _props.audioRef.current.volume = volumeCurve(volume / 100)
      } else {
        setCurrentTime(0)
        setDuration(0)
      }
    }, 100)

    return () => {
      clearInterval(interval)
    }
  })

  const updateCurrentTime = useCallback(
    (_event: Event, _value: number | number[]) => {
      if (_props.audioRef.current) {
        const time =
          _props.audioRef.current.duration * ((_value as number) / 100)

        _props.audioRef.current.currentTime = time
        setCurrentTime(time)
        _props.audioRef.current.muted = true
        _props.audioRef.current.pause()
      }
    },
    [_props.audioRef]
  )

  const commitCurrentTime = useCallback(() => {
    if (_props.audioRef.current) {
      _props.audioRef.current.muted = false
      if (_props.playing) _props.audioRef.current.play()
    }
  }, [_props.audioRef, _props.playing])

  const updateLoopMode = useCallback(() => {
    if (_props.loopMode === LoopMode.Next)
      _props.setLoopMode(LoopMode.LoopSingle)
    else if (_props.loopMode === LoopMode.LoopSingle)
      _props.setLoopMode(LoopMode.Shuffle)
    else if (_props.loopMode === LoopMode.Shuffle)
      _props.setLoopMode(LoopMode.One)
    else _props.setLoopMode(LoopMode.Next)
  }, [_props])

  const updateVolume = useCallback(
    (_event: Event, _value: number | number[]) => {
      if (_props.audioRef.current) {
        _props.audioRef.current.volume = volumeCurve((_value as number) / 100)
        setVolume(_value as number)
        localStorage.setItem('volume', (_value as number).toString())
      }
    },
    [_props.audioRef]
  )

  const updateOVolume = useCallback(() => {
    if (volume !== 0) setOvolume(volume)
  }, [volume])

  const toggleMute = useCallback(() => {
    if (_props.audioRef.current) {
      if (volume === 0) {
        setVolume(ovolume)
        _props.audioRef.current.volume = volumeCurve(ovolume / 100)
      } else {
        setOvolume(volume)
        setVolume(0)
        _props.audioRef.current.volume = 0
      }
    }
  }, [_props.audioRef, volume, ovolume])

  const prevSong = useCallback(() => {
    let next = currentSong - 1
    if (next < 0) next = songs.length - 1

    setCurrentSong(next)
  }, [currentSong, setCurrentSong, songs.length])

  const nextSong = useCallback(() => {
    let next = currentSong + 1
    if (next >= songs.length) next = 0

    setCurrentSong(next)
  }, [currentSong, setCurrentSong, songs.length])

  const getVolumeColor = (_volume: number) => {
    if (_volume <= 0) return 'error.light'
    return 'primary.light'
  }

  return (
    <Drawer
      variant='persistent'
      open={currentSong >= 0}
      anchor='bottom'
      className={
        _props.playlistDrawerOpen
          ? 'player-control-drawer-small'
          : 'player-control-drawer'
      }
      sx={{
        '& .MuiDrawer-paper': {
          height: '100px',
          overflow: 'visible',
        },
      }}
    >
      <Stack>
        <Box sx={{ height: '40px' }}>
          <Slider
            sx={{
              width: 'calc(100% - 60px)',
              marginLeft: '30px',
              marginRight: '30px',
              marginTop: '10px',
            }}
            size='small'
            step={0.001}
            valueLabelDisplay='auto'
            valueLabelFormat={(_value: number) => {
              return formatTime(duration * (_value / 100))
            }}
            value={
              Number.isNaN((currentTime / duration) * 100)
                ? 0
                : (currentTime / duration) * 100
            }
            onChange={updateCurrentTime}
            onChangeCommitted={commitCurrentTime}
          ></Slider>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip
            title={(() => {
              let next = currentSong - 1
              if (next < 0) next = songs.length - 1

              return songs[next]?.songName
            })()}
          >
            <IconButton onClick={prevSong}>
              <SkipPrevious fontSize='large' />
            </IconButton>
          </Tooltip>
          <IconButton
            onClick={() => {
              _props.togglePlaying()
            }}
          >
            {_props.playing ? (
              <Pause fontSize='large' />
            ) : (
              <PlayArrow fontSize='large' />
            )}
          </IconButton>
          <Tooltip
            title={(() => {
              let next = currentSong + 1
              if (next >= songs.length) next = 0

              return songs[next]?.songName
            })()}
          >
            <IconButton onClick={nextSong}>
              <SkipNext fontSize='large' />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={(() => {
              switch (_props.loopMode) {
                case LoopMode.Next:
                  return 'Loop playlist in order.'
                case LoopMode.LoopSingle:
                  return 'Loop current song.'
                case LoopMode.Shuffle:
                  return 'Pick next song randomly.'
                case LoopMode.One:
                  return 'Play current song once.'
              }
            })()}
          >
            <IconButton onClick={updateLoopMode}>
              {(() => {
                switch (_props.loopMode) {
                  case LoopMode.Next:
                    return <Repeat fontSize='large' />
                  case LoopMode.LoopSingle:
                    return <RepeatOne fontSize='large' />
                  case LoopMode.Shuffle:
                    return <Shuffle fontSize='large' />
                  case LoopMode.One:
                    return <LooksOneOutlined fontSize='large' />
                }
              })()}
            </IconButton>
          </Tooltip>

          <Tooltip title={volume === 0 ? 'Unmute' : 'Mute'}>
            <IconButton onClick={toggleMute}>
              {volume <= 0 && (
                <VolumeOff sx={{ color: 'error.light' }} fontSize='large' />
              )}
              {volume <= 50 && volume > 0 && <VolumeDown fontSize='large' />}
              {volume > 50 && <VolumeUp fontSize='large' />}
            </IconButton>
          </Tooltip>
          <Tooltip title={`${volume}%`}>
            <Slider
              sx={{
                width: '100px',
                marginLeft: '10px',
                '& .MuiSlider-thumb': {
                  color: getVolumeColor(volume),
                },
                '& .MuiSlider-track': {
                  color: getVolumeColor(volume),
                },
                '& .MuiSlider-rail': {
                  color: getVolumeColor(volume),
                },
                '& .MuiSlider-active': {
                  color: getVolumeColor(volume),
                },
              }}
              defaultValue={100}
              value={volume}
              min={0}
              max={100}
              step={1}
              onChange={updateVolume}
              onChangeCommitted={updateOVolume}
            />
          </Tooltip>
          <Typography sx={{ marginLeft: '30px' }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Typography>
        </Box>
      </Stack>
    </Drawer>
  )
}

export default PlayerControl
