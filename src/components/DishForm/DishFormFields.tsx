import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  TextField,
  Theme,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import {
  UseFormRegister,
  FieldErrors,
  Controller,
  Control,
} from "react-hook-form";
import { FormValues } from "./DishForm";

type FieldStyleProp = {
  sx?: SxProps<Theme>;
};

type FieldProps = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  control: Control<FormValues, any>;
} & FieldStyleProp;

export const DishNameField = ({ register, errors, sx }: FieldProps) => (
  <TextField
    {...register("name", { required: true, minLength: 3 })}
    label="Dish Name"
    error={!!errors.name}
    helperText={!!errors.name && "* Name must have at least 3 characters"}
    sx={sx}
  />
);

export const PreparationTimeField = ({ control, sx }: FieldProps) => (
  <Controller
    name="preparationTime"
    control={control}
    rules={{ required: true }}
    defaultValue={dayjs().startOf("day") as Dayjs}
    render={({ field }) => (
      <TimePicker
        ampm={false}
        label="Preparation Time"
        views={["hours", "minutes", "seconds"]}
        {...field}
        sx={sx}
      />
    )}
  />
);

export const DishTypeField = ({ errors, control, sx }: FieldProps) => (
  <FormControl sx={sx}>
    <InputLabel id="select-label">Dish Type</InputLabel>
    <Controller
      name="type"
      control={control}
      rules={{ required: true }}
      defaultValue={"" as unknown as undefined}
      render={({ field }) => (
        <Select
          labelId="select-label"
          {...field}
          label="Dish Type"
          error={!!errors.type}
        >
          <MenuItem value="pizza">Pizza</MenuItem>
          <MenuItem value="soup">Soup</MenuItem>
          <MenuItem value="sandwich">Sandwich</MenuItem>
        </Select>
      )}
    />
    {errors.type && (
      <FormHelperText error={!!errors.type}>* Required</FormHelperText>
    )}
  </FormControl>
);

export const PizzaFields = ({ register, errors, sx }: FieldProps) => (
  <FormControl fullWidth>
    <TextField
      type="number"
      {...register("noOfSlices", {
        required: true,
        min: 1,
        valueAsNumber: true,
      })}
      label="Number of slices"
      error={!!errors.noOfSlices}
      helperText={!!errors.noOfSlices && "* Must be a number greater than 0"}
      sx={sx}
    />
    <TextField
      type="number"
      inputProps={{ step: 0.01 }}
      {...register("diameter", {
        required: true,
        min: 0.01,
        valueAsNumber: true,
      })}
      label="Diameter"
      error={!!errors.diameter}
      helperText={!!errors.diameter && "* Must be a decimal greater than 0"}
      sx={sx}
    />
  </FormControl>
);

export const SoupFields = ({ register, errors, sx }: FieldProps) => (
  <TextField
    type="number"
    {...register("spicinessScale", {
      required: true,
      min: 1,
      max: 10,
      valueAsNumber: true,
    })}
    label="Spiciness Scale"
    error={!!errors.spicinessScale}
    helperText={
      !!errors.spicinessScale && "* Must be a number between 1 and 10"
    }
    sx={sx}
  />
);

export const SandwichFields = ({ register, errors, sx }: FieldProps) => (
  <TextField
    type="number"
    {...register("slicesOfBread", {
      required: true,
      min: 1,
      valueAsNumber: true,
    })}
    label="Bread Slices"
    error={!!errors.slicesOfBread}
    helperText={!!errors.slicesOfBread && "* Must be a number greater than 0"}
    sx={sx}
  />
);
