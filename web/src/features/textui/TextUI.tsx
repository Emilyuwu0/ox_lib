import React from 'react';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { Box, createStyles, Group } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import ScaleFade from '../../transitions/ScaleFade';
import remarkGfm from 'remark-gfm';
import type { TextUiPosition, TextUiProps } from '../../typings';
import MarkdownComponents from '../../config/MarkdownComponents';
import LibIcon from '../../components/LibIcon';
import './index.css';
const useStyles = createStyles((theme, params: { position?: TextUiPosition }) => ({
  wrapper: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems:
      params.position === 'top-center' ? 'baseline' : params.position === 'bottom-center' ? 'flex-end' : 'center',
    justifyContent:
      params.position === 'right-center' ? 'flex-end' : params.position === 'left-center' ? 'flex-start' : 'center',
  },
  container: {
    fontSize: 14,
    padding: 12,
    margin: 8,
    backgroundImage: 'linear-gradient(144deg, rgb(0, 0, 0) 0%, rgb(18 18 18 / 41%) 100%)',
    color: theme.colors.dark[0],

    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.sm,
  },
}));

const TextUI: React.FC = () => {
  const [data, setData] = React.useState<TextUiProps>({
    text: '',
    position: 'right-center',
  });
  const [visible, setVisible] = React.useState(false);
  const { classes } = useStyles({ position: data.position });

  useNuiEvent<TextUiProps>('textUi', (data) => {
    if (!data.position) data.position = 'right-center'; // Default right position
    setData(data);
    setVisible(true);
  });

  useNuiEvent('textUiHide', () => setVisible(false));

  return (
    <>
      <Box className={classes.wrapper}>
        <ScaleFade visible={visible}>
          <Box style={data.style} className={classes.container}>
            <Group spacing={12}>
              {/*    <img src='/only-x3.pngg'  style={{ width:30, height:30}}/> */}
              <div className="container">
                <div className="options">
                  <div className="option">
                    <div className="key">E</div>
                    <div className="description">Access locker inventory </div>
                  </div>
                  <div className="option">
                    <div className="key">G</div>
                    <div className="description">Do something else</div>
                  </div>
                </div>
              </div>
            </Group>
          </Box>
        </ScaleFade>
      </Box>
    </>
  );
};

export default TextUI;
