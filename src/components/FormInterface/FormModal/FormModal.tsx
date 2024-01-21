import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import "../style.css";
import { comboBoxData } from "../../../constants/constants";
import { default as uploadfileSchema } from "../../../schema/uploadFileSchema";
import getFormattedDate from "../../../helper/getFormattedDate";
import CssTextFieldComponent, { CssTextField } from "./CssTextField";
import FileUploadComponent from "./FileUploadComponent";
import { formSubmitEvent } from "./submitEvent";

export type TFormFields = z.infer<typeof uploadfileSchema>;

const initialValue: TFormFields = {
  authKey: "",
  title: "",
  description: "",
  tags: "",
  date: dayjs(getFormattedDate().formattedMaxDate),
  software: comboBoxData[0].label,
  thumbnailImage: undefined as unknown as File,
  sourceFile: undefined as unknown as File,
};

export default function FormModal() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<TFormFields>({
    defaultValues: initialValue,
    resolver: zodResolver(uploadfileSchema),
  });

  const [fileNames, setFileNames] = useState<{
    sourceFile: string;
    thumbnailImage: string;
  }>({ sourceFile: "", thumbnailImage: "" });

  const handleFormSubmitEvent: SubmitHandler<TFormFields> = async (data) => {
    try {
      const res = await formSubmitEvent(data);
      console.log(res);
      if (res.status >= 200 && res.status < 300) reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError("root", { message: error.message });
    }
  };

  const onUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileNames((prevState) => ({
      ...prevState,
      [event.target.name]: (event.target.files as FileList)[0].name,
    }));
  };

  const { formattedMinDate, formattedMaxDate } = getFormattedDate();

  return (
    <div className="form-modal">
      <div
        className="heading"
        style={{
          fontSize: "var(--font-size-normal)",
          marginBlock: "var(--margin-small)",
        }}
      >
        Zupple Labs
      </div>
      <div
        className="heading"
        style={{
          fontSize: "clamp(1rem, 2vw, 1.3rem)",
          marginBlockEnd: "var(--margin-normal)",
        }}
      >
        Upload Files
      </div>
      <div className="form-box">
        <form onSubmit={handleSubmit(handleFormSubmitEvent)}>
          <div className="file-info">
            <div>
              <label htmlFor="auth_key" className="label">
                Authorization key
              </label>
              <CssTextFieldComponent
                name="authKey"
                control={control}
                id="auth_key"
                placeholderValue="Authorization key"
                type="password"
                error={errors.authKey}
                sx={{
                  input: {
                    color: "var(--color-primary)",
                    border: "1px solid var(--border-color-blur)",
                    borderRadius: "var(--border-radius-normal)",
                  },
                }}
              />
              <label htmlFor="title" className="label">
                Title
              </label>
              <CssTextFieldComponent
                name="title"
                control={control}
                id="title"
                placeholderValue="Title"
                error={errors.title}
                sx={{
                  input: {
                    color: "var(--color-primary)",
                    border: "1px solid var(--border-color-blur)",
                    borderRadius: "var(--border-radius-normal)",
                  },
                }}
              />
              <label htmlFor="description" className="label">
                Description
              </label>
              <CssTextFieldComponent
                name="description"
                control={control}
                id="description"
                placeholderValue="Description"
                error={errors.description}
                sx={{
                  input: {
                    border: "1px solid var(--border-color-blur)",
                    borderRadius: "var(--border-radius-normal)",
                  },
                }}
                inputProps={{ style: { color: "var(--color-primary)" } }}
                multiline={true}
                rows={6}
              />
            </div>
            <div>
              <label htmlFor="tags" className="label">
                Tags (comma seperated)
              </label>
              <CssTextFieldComponent
                name="tags"
                control={control}
                id="tags"
                placeholderValue="Tags (comma seperated)"
                error={errors.tags}
                sx={{
                  input: {
                    color: "var(--color-primary)",
                    border: "1px solid var(--border-color-blur)",
                    borderRadius: "var(--border-radius-normal)",
                  },
                }}
              />
              <label htmlFor="date" className="label">
                Date
              </label>
              <Controller
                control={control}
                name={"date"}
                render={({ field }) => {
                  return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        {...field}
                        minDate={dayjs(formattedMinDate)}
                        maxDate={dayjs(formattedMaxDate)}
                        slotProps={{ textField: { id: "date" } }}
                        slots={{
                          textField: (textFieldProp) => (
                            <CssTextField
                              {...textFieldProp}
                              error={Boolean(errors.date)}
                              helperText={
                                errors.date
                                  ? (errors.date.message as string)
                                  : ""
                              }
                              sx={{ input: { color: "var(--color-primary)" } }}
                            />
                          ),
                        }}
                      />
                    </LocalizationProvider>
                  );
                }}
              />
              <label htmlFor="software" className="label">
                Software
              </label>
              <Controller
                control={control}
                name={"software"}
                render={({ field }) => {
                  return (
                    <Autocomplete
                      disablePortal
                      id="software"
                      options={comboBoxData}
                      {...field}
                      value={comboBoxData[0]}
                      onChange={(_, value) => field.onChange(value?.label)}
                      renderInput={(params) => (
                        <CssTextField
                          {...params}
                          placeholder="Sketch"
                          error={Boolean(errors.software)}
                          helperText={
                            errors.software ? errors.software.message : ""
                          }
                          sx={{
                            input: {
                              color: "var(--color-primary)",
                            },
                          }}
                        />
                      )}
                    />
                  );
                }}
              />
              <div className="file-container">
                <div>
                  <label htmlFor="thumbnail" className="label">
                    Thumbnail Image
                  </label>
                  <FileUploadComponent
                    id="thumbnail"
                    error={errors.thumbnailImage}
                    filename={fileNames.thumbnailImage}
                    onUpload={onUploadFile}
                    control={control}
                    name={"thumbnailImage"}
                    mimeType={"image/*"}
                  />
                </div>
                <div>
                  <label htmlFor="source_file" className="label">
                    Source File
                  </label>
                  <FileUploadComponent
                    id="source_file"
                    control={control}
                    name={"sourceFile"}
                    filename={fileNames.sourceFile}
                    error={errors.sourceFile}
                    onUpload={onUploadFile}
                    mimeType={"application/pdf"}
                  />
                </div>
              </div>
            </div>
          </div>
          {errors.root && <div>{errors.root.message}</div>}
          <button type="submit" disabled={isSubmitting} className="btn">
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
