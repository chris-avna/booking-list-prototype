document.addEventListener("DOMContentLoaded", () => {
    const patientsPerPage = 3;
    let currentPage = 1;

    // Sample data for patients and their appointments
    const patientData = [
        { name: "Patient Zero", service: "Physiotherapy - PTA001 - Consultation A", practitioner: "Practitioner One", platform: "Trinity", date: "30 Sep 2024, 10:00 AM - 10:36 AM", status: "Upcoming", completedSessions: 1, totalSessions: 4 },
        { name: "Claimant EML", service: "Physiotherapy - PTA002 - Consultation B", practitioner: "Practitioner Two", platform: "EML", date: "30 Sep 2024, 11:00 AM - 11:30 AM", status: "Upcoming", completedSessions: 3, totalSessions: 4 },
        { name: "John Doe", service: "Psychology - PYC001 - Initial Consultation", practitioner: "Practitioner Three", platform: "HII", date: "1 Oct 2024, 2:00 PM - 2:45 PM", status: "Upcoming", completedSessions: 0, totalSessions: 4 },
        { name: "Jane Smith", service: "Physiotherapy - PTA003 - Consultation A", practitioner: "Practitioner Four", platform: "Trinity", date: "2 Oct 2024, 9:00 AM - 9:45 AM", status: "Upcoming", completedSessions: 2, totalSessions: 5 },
        { name: "Alice Brown", service: "Psychology - PYC002 - Follow-up", practitioner: "Practitioner Five", platform: "EML", date: "3 Oct 2024, 11:00 AM - 11:45 AM", status: "Upcoming", completedSessions: 1, totalSessions: 3 },
        { name: "Bob Green", service: "Physiotherapy - PTA004 - Follow-up", practitioner: "Practitioner Six", platform: "HII", date: "4 Oct 2024, 10:00 AM - 10:30 AM", status: "Upcoming", completedSessions: 4, totalSessions: 6 }
    ];

    const bookingListElement = document.getElementById("booking-list");
    const prevPageButton = document.getElementById("prev-page");
    const nextPageButton = document.getElementById("next-page");
    const pageNumberElement = document.getElementById("page-number");

    // Function to render the patient bookings
    function renderBookings(page) {
        // Clear the current list
        bookingListElement.innerHTML = "";

        // Calculate the start and end index for the current page
        const startIndex = (page - 1) * patientsPerPage;
        const endIndex = Math.min(startIndex + patientsPerPage, patientData.length);

        // Loop through the data and create table rows
        for (let i = startIndex; i < endIndex; i++) {
            const patient = patientData[i];
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><a href="patient-details.html?patient=${encodeURIComponent(patient.name)}" class="patient-link">${patient.name}</a></td>
                <td>${patient.service}</td>
                <td>${patient.practitioner}</td>
                <td>${patient.platform}</td>
                <td>${patient.date}</td>
                <td>${patient.status}</td>
                <td>${patient.completedSessions}/${patient.totalSessions}
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${(patient.completedSessions / patient.totalSessions) * 100}%;"></div>
                    </div>
                </td>
                <td><button class="form-button optional-ahtr">Submit AHTR</button></td>
                <td><button class="form-button pending">Submit Case Notes</button></td>
            `;
            bookingListElement.appendChild(row);
        }

        // Update the page number display
        pageNumberElement.textContent = `Page ${currentPage}`;

        // Enable/Disable pagination buttons
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = endIndex >= patientData.length;
    }

    // Pagination button event listeners
    prevPageButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderBookings(currentPage);
        }
    });

    nextPageButton.addEventListener("click", () => {
        if (currentPage < Math.ceil(patientData.length / patientsPerPage)) {
            currentPage++;
            renderBookings(currentPage);
        }
    });

    // Initial render
    renderBookings(currentPage);
});