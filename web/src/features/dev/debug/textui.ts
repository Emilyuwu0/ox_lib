import { TextUiProps } from '../../../typings';
import { debugData } from '../../../utils/debugData';

export const debugTextUI = () => {
  debugData<TextUiProps>([
    {
      action: 'textUi',
      data: {
        text: 'E | Access locker inventory  \n G | Do something else',
        position: 'right-center',
        imageIcon: 'https://r2.fivemanage.com/aZXPKLZCJZlEQhKvfx0Uh/only-x3.png',
      },
    },
  ]);
};
