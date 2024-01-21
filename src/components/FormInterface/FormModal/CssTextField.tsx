/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, FieldError } from "react-hook-form";
import { SxProps, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { InputBaseComponentProps } from "@mui/material";
import { Theme } from "@emotion/react";

export const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})(() => ({
  "& label.Mui-focused": {
    color: "var(--border-color-focus)",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "var(--border-color-focus)",
    },
  },
})) as typeof TextField;

interface ICssTextFieldComponentProps {
  name: string;
  id: string;
  placeholderValue: string;
  type?: "password" | "text";
  control: any;
  error: FieldError | undefined;
  multiline?: boolean;
  rows?: number;
  sx: SxProps<Theme>;
  inputProps?: InputBaseComponentProps;
}

export default function CssTextFieldComponent({
  control,
  name,
  id,
  placeholderValue,
  type = "text",
  error,
  multiline = false,
  rows,
  sx,
  inputProps,
}: ICssTextFieldComponentProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <CssTextField
            id={id}
            variant="outlined"
            placeholder={placeholderValue}
            type={type}
            {...field}
            error={Boolean(error)}
            helperText={error ? error.message : ""}
            sx={sx}
            multiline={multiline}
            rows={rows}
            inputProps={inputProps}
          />
        );
      }}
    />
  );
}
