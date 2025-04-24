import { useNuiEvent } from '../../hooks/useNuiEvent';
import { toast, Toaster } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { Box, Center, createStyles, Group, keyframes, RingProgress, Stack, Text, ThemeIcon } from '@mantine/core';
import React, { useState } from 'react';
import tinycolor from 'tinycolor2';
import type { NotificationProps } from '../../typings';
import MarkdownComponents from '../../config/MarkdownComponents';
import LibIcon from '../../components/LibIcon';

const useStyles = createStyles((theme) => ({
  container: {
    width: 300,
    height: 'fit-content',
    backgroundImage: 'linear-gradient(144deg, rgb(0, 0, 0) 0%, rgb(18 18 18 / 41%) 100%)',
    color: theme.colors.dark[0],
    padding: 12,
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.sm,
  },
  title: {
    fontWeight: 500,
    lineHeight: 'normal',
    color: '#ededed',
  },
  description: {
    fontSize: '10px',
    color: '#afafaf',
    lineHeight: 'normal',
  },
  descriptionOnly: {
    fontSize: 12,
    color: '#8d8d8d',

    lineHeight: 'normal',
  },
}));

const createAnimation = (from: string, to: string, visible: boolean) =>
  keyframes({
    from: {
      opacity: visible ? 0 : 1,
      transform: `translate${from}`,
    },
    to: {
      opacity: visible ? 1 : 0,
      transform: `translate${to}`,
    },
  });

const getAnimation = (visible: boolean, position: string) => {
  const animationOptions = visible ? '0.2s ease-out forwards' : '0.4s ease-in forwards';
  let animation: { from: string; to: string };

  if (visible) {
    animation = position.includes('bottom') ? { from: 'Y(30px)', to: 'Y(0px)' } : { from: 'Y(-30px)', to: 'Y(0px)' };
  } else {
    if (position.includes('right')) {
      animation = { from: 'X(0px)', to: 'X(100%)' };
    } else if (position.includes('left')) {
      animation = { from: 'X(0px)', to: 'X(-100%)' };
    } else if (position === 'top-center') {
      animation = { from: 'Y(0px)', to: 'Y(-100%)' };
    } else if (position === 'bottom') {
      animation = { from: 'Y(0px)', to: 'Y(100%)' };
    } else {
      animation = { from: 'X(0px)', to: 'X(100%)' };
    }
  }

  return `${createAnimation(animation.from, animation.to, visible)} ${animationOptions}`;
};

const durationCircle = keyframes({
  '0%': { strokeDasharray: `0, ${15.1 * 2 * Math.PI}` },
  '100%': { strokeDasharray: `${15.1 * 2 * Math.PI}, 0` },
});
const isIconUrl = (icon: string) =>
  icon.endsWith('.png') || icon.endsWith('.jpg') || icon.endsWith('.svg') || icon.startsWith('/');

const Notifications: React.FC = () => {
  const { classes } = useStyles();
  const [toastKey, setToastKey] = useState(0);

  useNuiEvent<NotificationProps>('notify', (data) => {
    if (!data.title && !data.description) return;

    const toastId = data.id?.toString();
    const duration = data.duration || 3000;

    let iconColor: string;
    let position = data.position || 'top-right';

    data.showDuration = data.showDuration !== undefined ? data.showDuration : true;

    if (toastId) setToastKey((prevKey) => prevKey + 1);

    // Backwards compat with old notifications
    switch (position) {
      case 'top':
        position = 'top-center';
        break;
      case 'bottom':
        position = 'bottom-center';
        break;
    }

    if (!data.icon) {
      switch (data.type) {
        case 'error':
          data.icon = 'circle-xmark';
          break;
        case 'success':
          data.icon = 'circle-check';
          break;
        case 'warning':
          data.icon = 'circle-exclamation';
          break;
        default:
          data.imageIcon = '';
          break;
      }
    }

    if (!data.iconColor) {
      switch (data.type) {
        case 'error':
          iconColor = '#8c8c8c';
          break;
        case 'success':
          iconColor = '#fff';
          break;
        case 'warning':
          iconColor = 'yellow.6';
          break;
        default:
          iconColor = '';
          break;
      }
    } else {
      iconColor = tinycolor(data.iconColor).toRgbString();
    }

    toast.custom(
      (t) => (
        <Box
          sx={{
            animation: getAnimation(t.visible, position),
            ...data.style,
          }}
          className={`${classes.container}`}
        >
       <Group noWrap spacing={12}>
  {data.imageIcon || data.icon ? (
    <>
      {data.showDuration ? (
        <RingProgress
          key={toastKey}
          size={38}
          thickness={2}
          sections={[{ value: 100, color: iconColor }]}
          style={{
            alignSelf: !data.alignIcon || data.alignIcon === 'center' ? 'center' : 'start',
          }}
          styles={{
            root: {
              '> svg > circle:nth-of-type(2)': {
                animation: `${durationCircle} linear forwards reverse`,
                animationDuration: `${duration}ms`,
              },
              margin: -3,
            },
          }}
          label={
            <Center>
              <ThemeIcon
                color={iconColor}
                radius="xl"
                size={32}
                variant={
                  tinycolor(iconColor).getAlpha() < 0 ? undefined : 'light'
                }
              >
                {data.imageIcon ? (
                  <img src={data.imageIcon} alt="icon" width={20} height={20} />
                ) : data.icon ? (
                  <LibIcon
                    icon={data.icon as IconProp}
                    fixedWidth
                    color={iconColor}
                    animation={data.iconAnimation}
                  />
                ) : null}
              </ThemeIcon>
            </Center>
          }
        />
      ) : (
        <ThemeIcon
          color={iconColor}
          radius="xl"
          variant={tinycolor(iconColor).getAlpha() < 0 ? undefined : 'light'}
          style={{
            alignSelf: !data.alignIcon || data.alignIcon === 'center' ? 'center' : 'start',
            background: 'transparent',
          }}
        >
          {data.imageIcon ? (
            <img src={data.imageIcon} alt="icon" width={32} height={32} />
          ) : data.icon ? (
            <LibIcon
              icon={data.icon as IconProp}
              fixedWidth
              color={iconColor}
              animation={data.iconAnimation}
            />
          ) : null}
        </ThemeIcon>
      )}
    </>
  ) : null}

  <Stack
    spacing={0}
    style={{
      borderLeft: '1px rgba(204, 204, 204, 0.18) solid',
      paddingLeft: '1rem',
    }}
  >
    {data.title && <Text className={classes.title}>{data.title}</Text>}

    {data.description && (
      <ReactMarkdown
        components={MarkdownComponents}
        className={`${!data.title ? classes.descriptionOnly : classes.description} description`}
      >
        {data.description}
      </ReactMarkdown>
    )}
  </Stack>
</Group>

        </Box>
      ),
      {
        id: toastId,
        duration: duration,
        position: position,
      }
    );
  });

  return <Toaster />;
};

export default Notifications;
