import Contacts from "./Contacts";
import ContactsItem from "./ContactsItem";
import SearchBox from "./SearchBox";
import styles from "./ContactsList.module.css";


function Contactslist({ contacts, deleteHandler }) {
  return (
    
   
    <div className={styles.container}>
     
      <h3>Contacts List</h3>
      {/* <SearchBox /> */}
      {/* <ul>
      <input
        className={styles.search}
        type="text"
        placeholder="Search..."
        onChange={changeSearch}
      />
      </ul> */}
      {contacts.length ? (
        <ul className={styles.contacts}>
          {contacts.map((contact) => (
            <ContactsItem
              key={contact.id}
              data={contact}
              deleteHandler={deleteHandler}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.message}>No Contact Yet!</p>
      )}
    </div>
   
  );
}

export default Contactslist;
