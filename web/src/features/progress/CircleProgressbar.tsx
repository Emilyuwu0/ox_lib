import React from 'react';
import { createStyles, keyframes, Stack, Text, useMantineTheme } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import ScaleFade from '../../transitions/ScaleFade';
import type { CircleProgressbarProps } from '../../typings';
import './index.css';
const useStyles = createStyles((theme, params: { position: 'middle' | 'bottom'; duration: number }) => ({
  container: {
    width: '100%',
    height: params.position === 'middle' ? '100%' : '20%',
    bottom: 0,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  value: {
    textAlign: 'center',
    fontFamily: 'Roboto Mono',
    textShadow: theme.shadows.sm,
    color: theme.colors.gray[3],
  },
  label: {
    textAlign: 'center',
    textShadow: theme.shadows.sm,
    color: theme.colors.gray[3],
    height: 25,
  },
  wrapper: {
    marginTop: params.position === 'middle' ? 25 : undefined,
    alignItems: 'center',
  },
}));

const CircleProgressbar: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [progressDuration, setProgressDuration] = React.useState(0);
  const [position, setPosition] = React.useState<'middle' | 'bottom'>('middle');
  const [value, setValue] = React.useState(0);
  const [label, setLabel] = React.useState('');
  const theme = useMantineTheme();
  const { classes } = useStyles({ position, duration: progressDuration });

  useNuiEvent('progressCancel', () => {
    setValue(99);
    setVisible(false);
  });

  useNuiEvent<CircleProgressbarProps>('circleProgress', (data) => {
    if (visible) return;
    setVisible(true);
    setValue(0);
    setLabel(data.label || '');
    setProgressDuration(data.duration);
    setPosition(data.position || 'middle');
    const onePercent = data.duration * 0.01;
    const updateProgress = setInterval(() => {
      setValue((previousValue) => {
        const newValue = previousValue + 1;
        newValue >= 100 && clearInterval(updateProgress);
        return newValue;
      });
    }, onePercent);
  });

  // Perímetro estimado del hexágono (ajustable si cambias el tamaño)
  const hexagonPerimeter = 260;
  const strokeDashoffset = hexagonPerimeter - (hexagonPerimeter * value) / 100;

  return (
    <Stack spacing={0} className={classes.container}>
      <ScaleFade visible={visible} onExitComplete={() => fetchNui('progressComplete')}>
        <Stack spacing={0} className={classes.wrapper}>
          <svg width="100" height="100" viewBox="0 0 100 100" className={classes.progress}>
            <polygon
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
              fill="none"
              stroke="#2b2b2b38"
              strokeWidth="7"
            />
            <polygon
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
              fill="none"
              stroke="#000"
              strokeWidth="7"
              strokeDasharray={hexagonPerimeter}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
            <text x="50" y="55" textAnchor="middle" fill={theme.colors.gray[3]} fontSize="14">
              {value}%
            </text>
          </svg>
          {/*        {label && <Text className={classes.label}>{label}</Text>} */}
        </Stack>
      </ScaleFade>
    </Stack>
  );
};

export default CircleProgressbar;
