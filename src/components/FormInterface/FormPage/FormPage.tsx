import { Link } from "react-router-dom";
import FormModal from "../FormModal/FormModal";
import "../style.css";
import { StyledEngineProvider } from "@mui/material/styles";

export default function FormPage() {
  return (
    <div className="form-container">
      <div className="patch-big"></div>
      <div className="patch-small"></div>
      <div className="patch-polygon"></div>
      <StyledEngineProvider injectFirst>
        <FormModal />
      </StyledEngineProvider>
      <div className="link">
        <Link
          to={"explore"}
          style={{
            color: "var(--color-secondary)",
            textDecorationLine: "none",
            fontSize: "var(--font-size-normal)",
            position: "relative",
            top: "-30px",
          }}
        >
          Go to blockchain explore page ⏭️
        </Link>
      </div>
    </div>
  );
}
