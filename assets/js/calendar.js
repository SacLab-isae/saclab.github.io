document.addEventListener('DOMContentLoaded', function() {
    const calendarTable = document.getElementById('calendar-table');
    const calendarTitle = document.getElementById('calendar-title');
    const addEventModal = document.getElementById('addEventModal');
    const eventModal = document.getElementById('eventModal');
    const closeButtons = document.querySelectorAll('.close');
    const addEventForm = document.getElementById('addEventForm');
    const eventsTableBody = document.getElementById('eventsTableBody');
    const nextEventsPageButton = document.getElementById('nextEventsPage');
    const prevEventsPageButton = document.getElementById('prevEventsPage');
    const deleteEventButton = document.getElementById('deleteEventButton');

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let currentEventPage = 0;
    let selectedEventDate = null;

    async function fetchEvents() {
        const response = await fetch('events.json');
        return await response.json();
    }

    async function addEvent(event) {
        console.log('Event added:', event);
    }

    async function deleteEvent(date) {
        console.log('Event deleted:', date);
    }

    function updateEventsTable(events) {
        eventsTableBody.innerHTML = '';
        events.sort((a, b) => new Date(a.date) - new Date(b.date));  // Sort events from closest to farthest date
        events.slice(currentEventPage * 4, (currentEventPage + 1) * 4).forEach(event => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${event.date}</td><td>${event.title}</td><td>${event.details}</td>`;
            eventsTableBody.appendChild(tr);
        });
        nextEventsPageButton.style.display = events.length > (currentEventPage + 1) * 4 ? 'block' : 'none';
        prevEventsPageButton.style.display = currentEventPage > 0 ? 'block' : 'none';
    }

    function generateCalendar(events, month, year) {
        const firstDay = new Date(year, month).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let date = 1;

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        calendarTitle.innerText = `${months[month]} ${year}`;
        let table = `<thead>
                        <tr>
                            <th>S</th>
                            <th>M</th>
                            <th>T</th>
                            <th>W</th>
                            <th>T</th>
                            <th>F</th>
                            <th>S</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>`;

        for (let i = 0; i < firstDay; i++) {
            table += "<td></td>";
        }

        for (let i = firstDay; i < 7; i++) {
            const event = events.find(e => new Date(e.date).getDate() === date && new Date(e.date).getMonth() === month && new Date(e.date).getFullYear() === year);
            if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                table += `<td class="today">${date}</td>`;
            } else if (event) {
                table += `<td class="event special-event" data-title="${event.title}" data-details="${event.details}" data-date="${event.date}">${date}</td>`;
            } else {
                table += `<td>${date}</td>`;
            }
            date++;
        }
        table += "</tr>";

        while (date <= daysInMonth) {
            table += "<tr>";
            for (let i = 0; i < 7 && date <= daysInMonth; i++) {
                const event = events.find(e => new Date(e.date).getDate() === date && new Date(e.date).getMonth() === month && new Date(e.date).getFullYear() === year);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    table += `<td class="today">${date}</td>`;
                } else if (event) {
                    table += `<td class="event special-event" data-title="${event.title}" data-details="${event.details}" data-date="${event.date}">${date}</td>`;
                } else {
                    table += `<td>${date}</td>`;
                }
                date++;
            }
            table += "</tr>";
        }
        table += "</tbody>";
        calendarTable.innerHTML = table;

        // Add click event listeners to event days
        document.querySelectorAll('.event').forEach(cell => {
            cell.addEventListener('click', function() {
                const title = this.getAttribute('data-title');
                const details = this.getAttribute('data-details');
                selectedEventDate = this.getAttribute('data-date');
                showModal(title, details);
            });
        });

        document.querySelectorAll('td:not(.event)').forEach(cell => {
            cell.addEventListener('click', function() {
                const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(this.textContent).padStart(2, '0')}`;
                document.getElementById('eventDate').value = date;
                addEventModal.style.display = 'block';
            });
        });
    }

    function showModal(title, details) {
        const modal = document.getElementById('eventModal');
        const modalTitle = document.getElementById('eventTitle');
        const modalDetails = document.getElementById('eventDetails');
        modalTitle.innerText = title;
        modalDetails.innerText = details;
        modal.style.display = 'block';
    }

    function closeModal() {
        const modal = document.getElementById('eventModal');
        modal.style.display = 'none';
        addEventModal.style.display = 'none';
    }

    function showNextMonth() {
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
        currentMonth = (currentMonth + 1) % 12;
        fetchEvents().then(events => generateCalendar(events, currentMonth, currentYear));
    }

    function showPrevMonth() {
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        fetchEvents().then(events => generateCalendar(events, currentMonth, currentYear));
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    addEventForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newEvent = {
            date: document.getElementById('eventDate').value,
            title: document.getElementById('eventTitleInput').value,
            details: document.getElementById('eventDetailsInput').value
        };
        addEvent(newEvent).then(() => {
            fetchEvents().then(events => {
                generateCalendar(events, currentMonth, currentYear);
                updateEventsTable(events);
            });
            addEventModal.style.display = 'none';
        });
    });

    deleteEventButton.addEventListener('click', function() {
        if (selectedEventDate) {
            deleteEvent(selectedEventDate).then(() => {
                fetchEvents().then(events => {
                    generateCalendar(events, currentMonth, currentYear);
                    updateEventsTable(events);
                });
                eventModal.style.display = 'none';
            });
        }
    });

    nextEventsPageButton.addEventListener('click', function() {
        currentEventPage++;
        fetchEvents().then(updateEventsTable);
    });

    prevEventsPageButton.addEventListener('click', function() {
        if (currentEventPage > 0) {
            currentEventPage--;
            fetchEvents().then(updateEventsTable);
        }
    });

    window.onclick = function(event) {
        if (event.target === addEventModal || event.target === document.getElementById('eventModal')) {
            closeModal();
        }
    };

    fetchEvents().then(events => {
        generateCalendar(events, currentMonth, currentYear);
        updateEventsTable(events);
    });

    document.getElementById('nextMonth').addEventListener('click', showNextMonth);
    document.getElementById('prevMonth').addEventListener('click', showPrevMonth);
});