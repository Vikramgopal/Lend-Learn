function Spinner() {
  return (
    <div className="gear w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] lg:w-[10rem] lg:h-[10rem] animate-spin">
      <img
        src="https://assets.codepen.io/6093409/gear.svg.png"
        alt="an illustration of a gear"
        className="w-full h-full"
        style={{
          filter:
            "invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
        }}
      />
    </div>
  );
}

export default Spinner;
