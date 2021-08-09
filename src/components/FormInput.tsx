import {
  createStyles,
  FormControl,
  makeStyles,
  TextField,
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

interface Props {
  name: string;
  control: Control<FieldValues>;
  error: boolean;
  message: any;
  label: string;
  defaultValue: any;
}
const FormInput: FC<Props> = ({
  name,
  control,
  defaultValue,
  error,
  message,
  label,
}) => {
  const classes = useStyles();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControl className={classes.formControl}>
          <TextField
            label={label}
            error={error}
            helperText={error ? message : ""}
            {...field}
          />
        </FormControl>
      )}
    />
  );
};

export default FormInput;
