import axios from "axios";
import { TFormFields } from "./FormModal";

export const formSubmitEvent = async (data: TFormFields) => {
  const formdata = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "date") {
      const date = `${value.$D}/${value.$M + 1}/${value.$y}`;
      formdata.append(key, date);
    } else if (key === "tags") {
      const tags = value.split(",");
      formdata.append(key, JSON.stringify(tags));
    } else formdata.append(key, value);
  });

  return await axios({
    url: "/posts",
    method: "POST",
    data: formdata,
    headers: { "Content-Type": "multipart/form-data" },
  });
};
