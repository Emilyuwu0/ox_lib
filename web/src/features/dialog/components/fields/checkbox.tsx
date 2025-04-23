import { Checkbox } from '@mantine/core';
import { ICheckbox } from '../../../../typings/dialog';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  row: ICheckbox;
  index: number;
  register: UseFormRegisterReturn;
}

const CheckboxField: React.FC<Props> = (props) => {
  return (
    <Checkbox
      {...props.register}
      sx={{ display: 'flex' }}
      required={props.row.required}
      label={props.row.label}
      defaultChecked={props.row.checked}
      disabled={props.row.disabled}
      styles={{
        input: {
          backgroundColor: '#313131', 
          borderColor: '#000',    
          '&:checked': {
            backgroundColor: '#313131', 
            borderColor: '#000',
          },
        },
      }}
    />
  );
};

export default CheckboxField;
