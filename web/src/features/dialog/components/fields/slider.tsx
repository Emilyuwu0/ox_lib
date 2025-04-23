import { Box, Slider, Text } from '@mantine/core';
import { ISlider } from '../../../../typings/dialog';
import { Control, useController } from 'react-hook-form';
import { FormValues } from '../../InputDialog';

interface Props {
  row: ISlider;
  index: number;
  control: Control<FormValues>;
}

const SliderField: React.FC<Props> = (props) => {
  const controller = useController({
    name: `test.${props.index}.value`,
    control: props.control,
    defaultValue: props.row.default || props.row.min || 0,
  });

  return (
    <Box>
      <Text sx={{ fontSize: 12, fontWeight: 500 }}>{props.row.label}</Text>
      <Slider
        mb={10}
        value={controller.field.value}
        name={controller.field.name}
        ref={controller.field.ref}
        onBlur={controller.field.onBlur}
        onChange={controller.field.onChange}
        defaultValue={props.row.default || props.row.min || 0}
        min={props.row.min}
        max={props.row.max}
        step={props.row.step}
        disabled={props.row.disabled}
        marks={[
          { value: props.row.min || 0, label: props.row.min || 0 },
          { value: props.row.max || 100, label: props.row.max || 100 },
        ]}
        styles={{
          track: {
            backgroundColor: '#313131',
            borderColor: '#c5c5c5',
          },
          bar: {
            backgroundColor: '#c5c5c5',
          },
          thumb: {
            borderColor: '#c5c5c5',
            backgroundColor: '#ffffff',
          },
          mark: {
            backgroundColor: '#c5c5c5',
          },
          markFilled: {
            backgroundColor: '#313131',
            borderColor: '#c5c5c5',
          },
          markLabel: {
            color: '##afafaf',
          },
        }}
      />
    </Box>
  );
};

export default SliderField;
