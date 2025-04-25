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
        if (newVal >= 100) clearInterval(updateProgress);
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
        <div className="w-[3.0625rem] h-[3.9375rem] relative">
          <svg
            width="60"
            height="60"
            viewBox="0 0 53 59"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 top-0"
          >
            <path
              d="M21.5 2.5L5.80578 10.5483C3.46939 11.7465 1.99999 14.1513 1.99999 16.777L1.99999 41.5182C1.99999 43.987 3.30045 46.2732 5.42246 47.535L20.5 56.5"
              stroke="#FFFFFF"
              strokeOpacity="0.85"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="132"
              strokeDashoffset={(132 - (132 * value) / 100).toFixed(2)}
              className="transition-all"
            />
            <path
              d="M51 39.5V15.9246C51 13.2221 49.4444 10.7611 47.0034 9.60161L31 2"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="132"
              strokeDashoffset={(-132 + (132 * value) / 100).toFixed(2)}
              className="transition-all"
            />
            <path
              opacity="0.4"
              d="M21.5 2.5L5.80578 10.5483C3.46939 11.7465 1.99999 14.1513 1.99999 16.777L1.99999 41.5182C1.99999 43.987 3.30045 46.2732 5.42246 47.535L20.5 56.5"
              stroke="#FFFFFF"
              strokeOpacity="0.85"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              opacity="0.4"
              d="M51 39.5V15.9246C51 13.2221 49.4444 10.7611 47.0034 9.60161L31 2"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <div style={{ position: 'absolute', top: '49.5%', left: '50%', transform: 'translate(-50%, -50%)' , color: 'white'}}> %{value}</div>
          <div style={{ position: 'absolute', top: '53%', left: '51%', transform: 'translate(-50%, -50%)' }}>
         <img src='/only-x3.png' width={35} height={35}/>
          </div>
        </div>
      </ScaleFade>
    </Stack>
  );
};

export default CircleProgressbar;
