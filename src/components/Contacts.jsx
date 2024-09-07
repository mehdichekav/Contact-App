import { useState } from "react";

import Contactslist from "./Contactslist";

import inputs from "../constants/input";

import styles from "./Contacts.module.css";

import { v4 } from "uuid";
import SearchBox from "./SearchBox";

function Contacts() {
  const [alert, setAlert] = useState("");
  const [contacts, setContacts] = useState([]);
  
  const [search, setSearch] = useState([]);
  const [contact, setContact] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const searchHandler = () => {
    if (search) {
      const newSearch = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(search) 
      
    );
      setContacts(newSearch);
     
    } else {
      setContacts(contacts);
      
    }
  };

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContact((contact) => ({ ...contact, [name]: value }));
  };

  const addhandler = () => {
    if (
      !contact.name ||
      !contact.lastName ||
      !contact.email ||
      !contact.phone
    ) {
      setAlert("please enter valid data!");
      return;
    }
    setAlert("");
    const newContect = { ...contact, id: v4() };
    setContacts((contacts) => [...contacts, newContect]);
    setContact({
      name: "",
      lastName: "",
      email: "",
      phone: "",
    });
  };

  const deleteHandler = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
  };


  return (
    <>
    
      <div className={styles.container}>
        <div className={styles.form}>
          {inputs.map((input, index) => (
            <input
              key={index}
              type={input.type}
              placeholder={input.placeholder}
              name={input.name}
              value={contact[input.name]}
              onChange={changeHandler}
            />
          ))}
      
          <button onClick={addhandler}>Add Contact</button>
      
        </div>
        <SearchBox 
        search={search}
        setSearch={setSearch}
        searchHandler={searchHandler}
      />
        <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
      
        <Contactslist contacts={contacts} deleteHandler={deleteHandler} />
      </div>
  
    </>
  );
}

export default Contacts;
