import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <h1 className="text text_type_digits-large">404</h1>
      <p className="text text_type_main-medium">
        Страница не найдена.{" "}
        <span>
          <Link className="link link-error" to="/constructor">
            Перейти на главную
          </Link>
        </span>
      </p>
    </div>
  );
};

export default Error;
