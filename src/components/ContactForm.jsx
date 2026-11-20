import { useState, useEffect } from "react";
import validateContact from "../contacts/validation";
import styles from "./ContactForm.module.css";

function ContactForm({
  defaultValues,
  isEditing,
  addHandler,
  updateHandler,
  selectedContacts,
  confirmBulkDelete,
}) {
  const [contact, setContact] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setContact({
      name: defaultValues.name || "",
      lastName: defaultValues.lastName || "",
      email: defaultValues.email || "",
      phone: defaultValues.phone || "",
    });

    setErrors({});
  }, [defaultValues]);

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const validationErrors = validateContact(contact);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    isEditing ? updateHandler(contact) : addHandler(contact);

    setContact({
      name: "",
      lastName: "",
      email: "",
      phone: "",
    });

    setErrors({});
  };

  return (
    <div className={styles.formContainer}>
      <h2>{isEditing ? "✏️ Edit Contact" : "➕ Add New Contact"}</h2>

      <form className={styles.form} onSubmit={submitHandler} noValidate>
        <div className={styles.inputGroup}>
          <label>First Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter first name"
            value={contact.name}
            onChange={changeHandler}
          />

          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>Last Name</label>

          <input
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={contact.lastName}
            onChange={changeHandler}
          />

          {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={contact.email}
            onChange={changeHandler}
          />

          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>Phone</label>

          <input
            type="tel"
            name="phone"
            placeholder="09123456789"
            value={contact.phone}
            onChange={changeHandler}
          />

          {errors.phone && <p className={styles.error}>{errors.phone}</p>}
        </div>

        <div className={styles.buttons}>
          <button type="submit">
            {isEditing ? "💾 Update Contact" : "➕ Add Contact"}
          </button>

          {selectedContacts.length > 0 && (
            <button type="button" onClick={confirmBulkDelete}>
              🗑️ Delete Selected ({selectedContacts.length})
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
