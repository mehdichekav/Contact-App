

import styles from './ContactItem.module.css'

function ContactsItem({
  data: { id, name, lastName, email, phone },
  deleteHandler, emailHandler
})

{
 

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
      <button onClick={() => deleteHandler(id)}>🗑️</button>
    </li>
    
  );
}

export default ContactsItem;
