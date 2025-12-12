import "./ContactList.css"

export const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <div>
      <ul className="ContactList">
        {contacts.map(({ id, name, number }) => (
          <li key={id} className="ContactItem">
            {name}: {number}
            <button type="button" onClick={() => onDeleteContact(id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
