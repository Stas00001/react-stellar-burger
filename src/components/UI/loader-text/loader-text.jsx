import style from "./loader-text.module.scss";
const LoaderText = () => {
  return (
    <>
      <div className={`${style["loading-container"]}`}>
        <div className={`${style["loading-text"]} text`}>
          <span>З</span>
          <span>а</span>
          <span>г</span>
          <span>р</span>
          <span>у</span>
          <span>з</span>
          <span>к</span>
          <span>а</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
    </>
  );
};

export default LoaderText;
