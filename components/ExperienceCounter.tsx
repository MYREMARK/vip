type Props = {
  value: number | null;
};

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export default function ExperienceCounter({ value }: Props) {
  if (value === null) {
    return <span className="experienceCounter experienceCounterLoading">XXX</span>;
  }

  const characters = new Intl.NumberFormat("en-US").format(value).split("");

  return (
    <span className="experienceCounter" aria-label={`${value} years`}>
      {characters.map((character, index) => {
        if (character === ",") {
          return <span className="counterComma" key={`${character}-${index}`}>,</span>;
        }

        const digit = Number(character);

        return (
          <span className="counterDigit" key={`${character}-${index}`}>
            <span className="counterDigitTrack" style={{ transform: `translateY(-${digit * 10}%)` }}>
              {digits.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
