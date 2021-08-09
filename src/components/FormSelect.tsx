import {
  createStyles,
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from "@material-ui/core";
import React, { FC } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 140,
    },
  })
);

type optionsType = {
  name: string;
  value: string;
};

interface Props {
  name: string;
  control: Control<FieldValues>;
  error: boolean;
  message: any;
  label: string;
  defaultValue: any;
  options: optionsType[];
}

const FormSelect: FC<Props> = ({
  name,
  control,
  error,
  message,
  label,
  defaultValue,
  options,
}) => {
  const classes = useStyles();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControl className={classes.formControl} error={error}>
          <InputLabel id={name}>{label}</InputLabel>
          <Select {...field} label={label}>
            {options.map(({ name, value }, index) => (
              <MenuItem key={index} value={value}>
                {name}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default FormSelect;
