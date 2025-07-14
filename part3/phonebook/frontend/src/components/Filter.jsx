const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      filter shown with
      <input value={searchTerm} onChange={handleSearch} />
    </div>
  );
};

export default Filter;
