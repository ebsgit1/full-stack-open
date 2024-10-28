const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <label>
        Filter countires: <input value={filter} onChange={handleFilterChange} />
      </label>
    </div>
  );
};

export default Filter;
