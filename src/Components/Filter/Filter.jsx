import "./Filter.css"

export const Filter = ({ onChange, value }) => {
  return (
    <div>
      <label className="FilterLabel">
        Find contact
        <input type="text" onChange={onChange} value={value} />
      </label>
    </div>
  );
};
