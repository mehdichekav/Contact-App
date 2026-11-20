import { useState, useMemo } from "react";

import ContactsList from "./ContactsList";
import ContactForm from "./ContactForm";
import Modal from "./Modal";

import styles from "./Contacts.module.css";

function Contacts() {
  const [contacts, setContacts] = useState([]);

  const [contact, setContact] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);

  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const resetForm = () => {
    setContact({
      id: "",
      name: "",
      lastName: "",
      email: "",
      phone: "",
    });
    setIsEditing(false);
  };

  const addHandler = (formContact) => {
    const newContact = {
      ...formContact,
      id: crypto.randomUUID(),
    };

    setContacts((prevContacts) => [...prevContacts, newContact]);
    resetForm();
    setAlert("Contact added successfully!");
    setAlertType("success");
  };

  const editHandler = (id) => {
    const selectedContact = contacts.find((item) => item.id === id);
    if (!selectedContact) return;

    setContact(selectedContact);
    setIsEditing(true);
    setAlert("");
  };

  const updateHandler = (formContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((item) =>
        item.id === contact.id ? { ...formContact, id: contact.id } : item,
      ),
    );

    resetForm();
    setAlert("Contact updated successfully!");
    setAlertType("success");
  };

  const handleSelect = (id, checked) => {
    setSelectedContacts((prevSelected) =>
      checked
        ? prevSelected.includes(id)
          ? prevSelected
          : [...prevSelected, id]
        : prevSelected.filter((item) => item !== id),
    );
  };

  const confirmDeleteSingle = (id) => {
    setDeleteId(id);
    setDeleteType("single");
    setShowModal(true);
  };

  const confirmBulkDelete = () => {
    if (selectedContacts.length === 0) return;

    setDeleteType("bulk");
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteType === "single") {
      setContacts((prevContacts) =>
        prevContacts.filter((item) => item.id !== deleteId),
      );
      setSelectedContacts((prevSelected) =>
        prevSelected.filter((id) => id !== deleteId),
      );

      if (contact.id === deleteId) resetForm();

      setAlert("Contact deleted successfully!");
      setAlertType("success");
    } else if (deleteType === "bulk") {
      setContacts((prevContacts) =>
        prevContacts.filter((item) => !selectedContacts.includes(item.id)),
      );

      if (selectedContacts.includes(contact.id)) resetForm();

      setSelectedContacts([]);
      setAlert("Selected contacts deleted successfully!");
      setAlertType("success");
    }

    setShowModal(false);
    setDeleteType("");
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setDeleteType("");
    setDeleteId(null);
  };

  const filteredContacts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return contacts;

    return contacts.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.lastName.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term) ||
        item.phone.includes(term),
    );
  }, [search, contacts]);

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <ContactForm
          defaultValues={contact}
          isEditing={isEditing}
          addHandler={addHandler}
          updateHandler={updateHandler}
          selectedContacts={selectedContacts}
          confirmBulkDelete={confirmBulkDelete}
        />

        {isEditing && (
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={resetForm}
          >
            Cancel Edit
          </button>
        )}
      </div>

      {showModal && (
        <Modal
          message={
            deleteType === "bulk"
              ? "Are you sure you want to delete selected contacts?"
              : "Are you sure you want to delete this contact?"
          }
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      <div className={styles.alert}>
        {alert && (
          <p className={`${styles.message} ${styles[alertType]}`}>{alert}</p>
        )}
      </div>

      <input
        type="text"
        placeholder="Search contacts..."
        value={search}
        className={styles.search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <ContactsList
        contacts={filteredContacts}
        deleteHandler={confirmDeleteSingle}
        editHandler={editHandler}
        handleSelect={handleSelect}
      />
    </div>
  );
}

export default Contacts;
