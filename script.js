
/* BONGO TOURS & TRAVELING */

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";
        });
    });
}

// Select a tour from its enquiry button
document.querySelectorAll("[data-tour]").forEach(function (button) {
    button.addEventListener("click", function () {
        const tourSelect = document.getElementById("tour");

        if (tourSelect) {
            tourSelect.value = button.dataset.tour;

            // Scroll to the booking form
            document.getElementById("booking").scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Prevent selection of dates in the past
const startDate = document.getElementById("startDate");

if (startDate) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    startDate.min = `${year}-${month}-${day}`;
}

// Booking enquiry via WhatsApp
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const tour = document.getElementById("tour").value;
        const date = document.getElementById("startDate").value;
        const travelers = document.getElementById("travelers").value;
        const budget = document.getElementById("budget").value;
        const message = document.getElementById("message").value.trim();
        const status = document.getElementById("formStatus");

        // Replace this with your official WhatsApp number.
        // Use country code and digits only, without + or spaces.
        const whatsappNumber = "255740459602";

        const enquiry = [
            "Hello Bongo Tours & Traveling!",
            "",
            "I would like to enquire about a Tanzania trip.",
            "",
            "Name: " + fullName,
            "Email: " + email,
            "Phone: " + phone,
            "Preferred Tour: " + tour,
            "Start Date: " + (date || "Not decided"),
            "Travelers: " + travelers,
            "Budget: " + (budget || "Not decided"),
            "Trip Details: " + (message || "Not provided"),
            "",
            "Please share more information about this trip."
        ].join("\n");

        const whatsappURL =
            "https://wa.me/" + whatsappNumber +
            "?text=" + encodeURIComponent(enquiry);

        status.textContent =
            "Opening WhatsApp to prepare your enquiry...";

        const whatsappWindow = window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

        if (!whatsappWindow) {
            status.textContent =
                "WhatsApp could not open automatically. Please try again or use the WhatsApp button on the page.";
        }
    });
}
