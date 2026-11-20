import ContactItem from "./ContactItem";
import styles from "./ContactsList.module.css";

function ContactsList({ contacts, deleteHandler, editHandler, handleSelect }) {
  return (
    <div className={styles.container}>
      <h3>My Contacts ({contacts.length})</h3>

      <div className={styles.listContainer}>
        {contacts.length ? (
          <ul className={styles.contacts}>
            {contacts.map((contact) => (
              <ContactItem
                key={contact.id}
                data={contact}
                deleteHandler={deleteHandler}
                editHandler={editHandler}
                handleSelect={handleSelect}
              />
            ))}
          </ul>
        ) : (
          <p className={styles.message}>No Contacts Found!</p>
        )}
      </div>
    </div>
  );
}

export default ContactsList;
