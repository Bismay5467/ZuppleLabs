import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <p
        style={{
          position: "absolute",
          top: "100px",
          textAlign: "center",
          color: "white",
          fontSize: "var(--font-size-large)",
          display: "block",
          width: "100%",
        }}
      >
        Error 404: Page not Found
      </p>
      <Link
        to={"/"}
        style={{
          color: "var(--color-secondary)",
          textDecorationLine: "none",
          fontSize: "var(--font-size-normal)",
          width: "100%",
          display: "block",
          textAlign: "center",
          position: "absolute",
          top: "200px",
        }}
      >
        🔙 Go back to home page
      </Link>
    </>
  );
}
