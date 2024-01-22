/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material";
import {
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

interface IFileUploadComponentProps {
  id: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  filename: string;
  name: string;
  control: any;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  mimeType: string;
}

export default function FileUploadComponent({
  id,
  name,
  error,
  filename,
  control,
  onUpload,
  mimeType,
}: IFileUploadComponentProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <Button
              variant="outlined"
              component="label"
              sx={{
                border: "1px solid #1A2421",
                borderRadius: "var(--border-radius-normal)",
                color: "grey",
                textTransform: "none",
                ":hover": {
                  border: "1px solid black",
                },
              }}
            >
              Upload File
              <input
                name={name}
                type="file"
                hidden
                id={id}
                onChange={(event) => {
                  onUpload(event);
                  field.onChange(event.target.files);
                }}
                accept={mimeType}
              />
            </Button>
          );
        }}
      />
      {error ? (
        <div className="error">{error.message as string}</div>
      ) : filename.length === 0 ? (
        <div>{"No file uploaded"}</div>
      ) : (
        <div>{filename}</div>
      )}
    </>
  );
}
