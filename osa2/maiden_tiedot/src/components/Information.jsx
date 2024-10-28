const Information = (props) => {
  return (
    <div>
      <h1>{props.country.name.common}</h1>
      <p>capital {props.country.capital}</p>
      <p>area {props.country.area}</p>
      <p>
        <strong>languages:</strong>
      </p>
      <ul>
        {Object.entries(props.country.languages).map(([key, val]) => (
          <li key={key}>{val}</li>
        ))}
      </ul>
      <img src={props.country.flags.png} alt="flag-of-country" />
    </div>
  );
};

export default Information;
