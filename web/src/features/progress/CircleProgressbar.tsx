import React from 'react';
import { Stack } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import ScaleFade from '../../transitions/ScaleFade';
import type { CircleProgressbarProps } from '../../typings';
import './index.css';

const CircleProgressbar: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [progressDuration, setProgressDuration] = React.useState(0);
  const [position, setPosition] = React.useState<'middle' | 'bottom'>('middle');
  const [value, setValue] = React.useState(0);

  useNuiEvent('progressCancel', () => {
    setValue(99);
    setVisible(false);
  });

  useNuiEvent<CircleProgressbarProps>('circleProgress', (data) => {
    if (visible) return;
    setVisible(true);
    setValue(0);
    setProgressDuration(data.duration);
    setPosition(data.position || 'middle');
    const onePercent = data.duration * 0.01;
    const updateProgress = setInterval(() => {
      setValue((prev) => {
        const newVal = prev + 1;
        if (newVal >= 100) {
          clearInterval(updateProgress);
          setVisible(false); // 👈 aquí ocultas cuando termina
        }
        return newVal;
      });
    }, onePercent);
  });

  return (
    <Stack
      spacing={0}
      style={{
        width: '100%',
        height: position === 'middle' ? '100%' : '20%',
        bottom: 0,
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ScaleFade visible={visible} onExitComplete={() => fetchNui('progressComplete')}>
        <div className="w-[4rem] h-[4rem] relative">
          <div className="spinner">
            <div className="spinner1"></div>
          </div>

          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            % {value}
          </div>

          <div
            style={{
              position: 'absolute',
              top: '60%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          ></div>
        </div>
      </ScaleFade>
    </Stack>
  );
};

export default CircleProgressbar;
