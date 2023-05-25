import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert, Collapse, FormControl, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Dayjs } from "dayjs";
import snakecaseKeys from "snakecase-keys";
import camelcaseKeys from "camelcase-keys";
import {
  DishNameField,
  DishTypeField,
  PizzaFields,
  PreparationTimeField,
  SandwichFields,
  SoupFields,
} from "./DishFormFields";

type DishTypes = "pizza" | "soup" | "sandwich";

type TimePickerTypes = {
  $H: number;
  $m: number;
  $s: number;
};

export type FormValues = {
  name: string;
  preparationTime: Dayjs | TimePickerTypes;
  type: DishTypes;
  noOfSlices?: number;
  diameter?: number;
  spicinessScale?: number;
  slicesOfBread?: number;
};

export const DishForm = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const {
    register,
    control,
    setError,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const currentType = watch("type") || "";

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsLoading(true);
    setIsCollapsed(true);

    const preparationTime = data.preparationTime as TimePickerTypes;

    const formData = snakecaseKeys({
      ...data,
      preparationTime: `${preparationTime.$H}:${preparationTime.$m}:${preparationTime.$s}`,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    fetch(
      "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
      requestOptions
    )
      .then((res) => {
        if (!res.ok)
          return res.json().then((errorData) => {
            throw errorData;
          });
        reset();
        setIsError(false);
      })
      .catch((err) => {
        const errorData = camelcaseKeys(err);
        Object.keys(errorData).forEach((key) => {
          setError(key as keyof FormValues, {});
        });
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
        setIsCollapsed(false);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth>
          <DishNameField
            register={register}
            control={control}
            errors={errors}
            sx={{ m: 1 }}
          />
          <PreparationTimeField
            register={register}
            control={control}
            errors={errors}
            sx={{ m: 1 }}
          />
          <DishTypeField
            register={register}
            control={control}
            errors={errors}
            sx={{ m: 1 }}
          />
          {currentType === "pizza" && (
            <PizzaFields
              register={register}
              control={control}
              errors={errors}
              sx={{ m: 1 }}
            />
          )}
          {currentType === "soup" && (
            <SoupFields
              register={register}
              control={control}
              errors={errors}
              sx={{ m: 1 }}
            />
          )}
          {currentType === "sandwich" && (
            <SandwichFields
              register={register}
              control={control}
              errors={errors}
              sx={{ m: 1 }}
            />
          )}
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            sx={{ m: 1 }}
          >
            Send
          </LoadingButton>
        </FormControl>
      </form>
      <Collapse in={!isCollapsed}>
        {isError && (
          <Alert severity="error" sx={{ m: 1 }}>
            <Typography>Something went wrong!</Typography>
          </Alert>
        )}
        {!isError && (
          <Alert severity="success" sx={{ m: 1 }}>
            <Typography>Success!</Typography>
          </Alert>
        )}
      </Collapse>
    </>
  );
};
