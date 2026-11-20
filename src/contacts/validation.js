const validateContact = (contact) => {
  const errors = {};

  if (!contact.name.trim()) {
    errors.name = "Name is required";
  } else if (contact.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  if (!contact.lastName.trim()) {
    errors.lastName = "Last name is required";
  } else if (contact.lastName.trim().length < 3) {
    errors.lastName = "Last name must be at least 3 characters";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!contact.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(contact.email.trim())) {
    errors.email = "Please enter a valid email";
  }

  const phoneRegex = /^09\d{9}$/;

  if (!contact.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!phoneRegex.test(contact.phone.trim())) {
    errors.phone = "Enter a valid 11-digit Iranian phone number";
  }

  return errors;
};

export default validateContact;
