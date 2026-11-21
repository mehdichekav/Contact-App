import styles from "./ContactItem.module.css";

function ContactItem({
  data: { id, name, lastName, email, phone },
  deleteHandler,
  editHandler,
  handleSelect,
  checked
}) {
  return (
    <li className={styles.item}>
      <p>
        {name} {lastName}
      </p>

      <p>
        <span>📬</span> {email}
      </p>

      <p>
        <span>📞</span> {phone}
      </p>

      <div className={styles.actions}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => handleSelect(id, e.target.checked)}
        />
        <button onClick={() => editHandler(id)} type="button">
          ✏️
        </button>
        <button onClick={() => deleteHandler(id)} type="button">
          🗑️
        </button>
      </div>
    </li>
  );
}

export default ContactItem;
