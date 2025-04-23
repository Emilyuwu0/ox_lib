import { debugData } from '../../../utils/debugData';
import { MenuSettings } from '../../../typings';

export const debugMenu = () => {
  debugData<MenuSettings>([
    {
      action: 'setMenu',
      data: {
        //   position: "bottom-left",
        title: 'Vehicle garage',
        items: [
          { label: 'Option 1', icon: 'heart' ,   iconColor: 'white',},
          {
            label: 'Option 2',
            icon: 'basket-shopping',
            description: 'Tooltip description 1',
            checked: true,
            iconColor: '#afafaf',
          },
          {
            label: 'Vehicle class',
            values: ['pogchamp', 'nice champ', { label: 'POGGERS', description: 'CHAMPPERS' }],
            icon: 'tag',
            description: 'Side scroll general description',
            iconColor: '#afafaf',
          },
          {
            label: 'Oil Level',
            progress: 30,
            icon: 'oil-can',
            colorScheme: 'white',
            description: 'Remaining Oil: 30%',
            iconColor: '#afafaf',
          },
          {
            label: 'Durability',
            progress: 80,
            icon: 'car-side',
            description: 'Durability: 80%',
            colorScheme: 'white',
            iconColor: '#afafaf',
          },
          { label: 'Option 1' },
          { label: 'Option 2' },
          {
            label: 'Vehicle class',
            values: ['Nice', 'Super nice', 'Extra nice'],
            defaultIndex: 1,
            iconColor: '#afafaf',
          },
          { label: 'Option 1' },
          { label: 'Option 2' },
          {
            label: 'Vehicle class',
            values: ['Nice', 'Super nice', 'Extra nice'],
          },
        ],
      },
    },
  ]);
};
