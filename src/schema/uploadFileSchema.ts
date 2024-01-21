import { z } from "zod";
import {
  ACCEPTED_IMAGE_TYPES,
  ACCEPTED_SOURCE_FILE_TYPES,
  DAYS_IN_MONTH,
  MAX_FILE_SIZE,
  comboBoxData,
} from "../constants/constants";
import { convertSizeToMB } from "../helper/transformedValue";

const schema = z.object({
  authKey: z.string().trim().min(1).length(10),
  title: z.string().trim().min(5).max(10),
  description: z.string().trim().min(1).max(50),
  tags: z
    .string()
    .trim()
    .min(1)
    .refine(
      (value) => {
        return (
          value &&
          !value.endsWith(",") &&
          !value.startsWith(",") &&
          value.split(",").every((tag) => tag.trim() !== "" && tag !== ",")
        );
      },
      {
        message:
          "The tags should be seperated by single comma with no space in between",
      }
    ),
  date: z.any().refine(
    (value) => {
      if (!value) return false;
      const { $D, $M, $y } = value;
      if ($y > new Date().getFullYear()) return false;
      if ($M < 0 || $M > 11) return false;
      return $D <= DAYS_IN_MONTH[$M];
    },
    { message: "Invalid date format. Use MM/DD/YYYY" }
  ),
  software: z
    .string()
    .trim()
    .refine((value) => value !== undefined || value !== null, {
      message: "No software name provided",
    })
    .refine(
      (value) => {
        const isPresent = comboBoxData.find(
          (softwareObj) => softwareObj.label === value
        );
        return isPresent !== undefined;
      },
      { message: `Provided software name is not in the list` }
    ),
  thumbnailImage: z
    .custom<FileList>()
    .refine(
      (fileList) => {
        return fileList && fileList.length === 1;
      },
      {
        message: `No file uploaded`,
      }
    )
    .transform((file) => file[0] as File)
    .refine(
      (file) => {
        return file && file.size <= MAX_FILE_SIZE;
      },
      {
        message: `Max image file size allowed is ${convertSizeToMB(
          MAX_FILE_SIZE
        )} MB`,
      }
    )
    .refine((file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
    }),
  sourceFile: z
    .custom<FileList>()
    .refine((fileList) => fileList && fileList.length === 1, {
      message: `No file uploaded`,
    })
    .transform((file) => file[0] as File)
    .refine(
      (file) => {
        return file && file.size <= MAX_FILE_SIZE;
      },
      {
        message: `Max image file size allowed is ${convertSizeToMB(
          MAX_FILE_SIZE
        )} MB`,
      }
    )
    .refine((file) => file && ACCEPTED_SOURCE_FILE_TYPES.includes(file.type), {
      message: "Only .pdf format is supported.",
    }),
});

export default schema;
