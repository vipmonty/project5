/**
 * Validation Library for Visitor Form
 * Author: Viphakone Monty
 */

const stateAbbreviations = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

function initValidation(formSelector) {
    const form = document.querySelector(formSelector);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (validateForm(form)) {
            displayThankYouMessage(form);
        }
    });

    form.querySelectorAll("input, textarea").forEach((field) => {
        field.addEventListener("blur", function () {
            validateField(field);
        });
    });
}

function validateForm(form) {
    let isValid = true;

    form.querySelectorAll("input[required], textarea[required]").forEach((field) => {
        if (!validateField(field)) isValid = false;
    });

    return isValid;
}

function validateField(field) {
    const fieldId = field.id;
    const fieldValue = field.value.trim();

    if (fieldId === "state") {
        return validateState(field, "Invalid state abbreviation.");
    } else if (fieldId === "zip") {
        return checkFormat(field, "Invalid zip code format.", /^\d{5}$/);
    } else if (fieldId === "phone") {
        return checkFormat(
            field,
            "Invalid phone number format.",
            /^\(\d{3}\)\s\d{3}-\d{4}$/
        );
    } else if (fieldId === "email") {
        return checkFormat(
            field,
            "Invalid email address format.",
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        );
    } else if (field.type === "checkbox" && field.name === "source") {
        return validateCheckboxGroup(field.name, "At least one option must be selected.");
    } else {
        return checkRequired(field, "This field is required.");
    }
}

function checkRequired(field, message) {
    const isValid = field.value.trim() !== "";
    setFieldValidity(field, isValid, message);
    return isValid;
}

function checkFormat(field, message, regex) {
    const isValid = regex.test(field.value.trim());
    setFieldValidity(field, isValid, message);
    return isValid;
}

function validateState(field, message) {
    const isValid = stateAbbreviations.includes(field.value.toUpperCase());
    setFieldValidity(field, isValid, message);
    return isValid;
}

function validateCheckboxGroup(name, message) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]`);
    const isValid = Array.from(checkboxes).some((cb) => cb.checked);
    setFieldValidity(checkboxes[0], isValid, message);
    return isValid;
}

function setFieldValidity(field, isValid, message) {
    const errorDiv = field.nextElementSibling;

    if (isValid) {
        field.classList.add("was-validated");
        field.setCustomValidity("");
        if (errorDiv) errorDiv.textContent = "";
    } else {
        field.classList.add("was-validated");
        field.setCustomValidity(message);
        if (errorDiv) errorDiv.textContent = message;
    }
}

function displayThankYouMessage(form) {
    const formSection = form.parentElement;
    formSection.innerHTML = `
        <h2>Thank You!</h2>
        <p>Your registration has been successfully submitted.</p>
    `;
}
