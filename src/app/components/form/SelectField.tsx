import { forwardRef, SelectHTMLAttributes, useState } from "react";

type SelectProps = {
  options: { value: string; title: string }[];
  value: string;
  onChange: (v: string) => void;
} & SelectHTMLAttributes<HTMLSelectElement>;

// eslint-disable-next-line react/display-name
const SelectField = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, value, onChange, ...rest }, ref) => {
    const [selectedValue, setSelectedValue] = useState(value);

    const handleSelectChange = (
      event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
      const newValue = event.target.value;
      setSelectedValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    };

    return (
      <select
        ref={ref}
        value={selectedValue}
        onChange={handleSelectChange}
        {...rest}
      >
        {options.map((option, index) => (
          <option value={option.value} key={`${rest.name}-option-${index}`}>
            {option.title}
          </option>
        ))}
      </select>
    );
  },
);

export default SelectField;
