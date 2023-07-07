document.addEventListener("DOMContentLoaded", function () {
  const flights = [
    {
      time: "16:20",
      destination: "DUBAI (DXB)",
      flightNumber: "AF 8423",
      flightCompany: "AIR FRANCE",
      status: "LEFT",
      duration: 2500,
      color: "#330099",
    },
    {
      time: "18:00",
      destination: "PARAMARIBO (PBM)",
      flightNumber: "PY 993",
      flightCompany: "SURINAM AIRWAYS",
      status: "GATE OPENED",
      duration: 3000,
      color: "#FFFFFF",
    },
    {
      time: "18:10",
      destination: "LONDEN LUTON (LTN)",
      flightNumber: "EZY 2160",
      flightCompany: "EASYJET",
      status: "GATE CLOSED",
      duration: 3500,
      color: "#FFEFD5",
    },
    {
      time: "19:00",
      destination: "CAIRO (CAI)",
      flightNumber: "MS 758",
      flightCompany: "EGYPT AIR",
      status: "LEFT",
      duration: 4000,
      color: "#556B2F",
    },
    {
      time: "19:22",
      destination: "KOS (KGS)",
      flightNumber: "OR 265",
      flightCompany: "TUI FLY",
      status: "GATE CHANGED",
      duration: 4500,
      color: "#ff0000",
    },
    {
      time: "19:39",
      destination: "HURGHANDA (HRG)",
      flightNumber: "CND 217",
      flightCompany: "CORENDON DUTCH AIRLINES",
      status: "GATE OPENED",
      duration: 5000,
      color: "#FFFF00",
    },
    {
      time: "19:50",
      destination: "LYON (LYS)",
      flightNumber: "AF 8291",
      flightCompany: "AIR FRANCE",
      status: "GATE OPENED",
      duration: 3000,
      color: "#99FF66",
    },
    {
      time: "20:00",
      destination: "DUBLIN (DUB)",
      flightNumber: "SU 3406",
      flightCompany: "AEROFLOT",
      status: "ON SCHEDULE",
      duration: 2000,
      color: "#FF0066",
    },
    {
      time: "20:10",
      destination: "BELFAST CITY AIRPORT (BHD)",
      flightNumber: "SU 3406",
      flightCompany: "AIR FRANCE",
      status: "BOARDING STARTED",
      duration: 1000,
      color: "#556B2F",
    },
    {
      time: "20:18",
      destination: "BIRMINGHAM (BHX)",
      flightNumber: "AF 8237",
      flightCompany: "FLYBE",
      status: "ON SCHEDULE",
      duration: 4000,
      color: "#FF0066",
    },
  ];

  const tableBody = document.querySelector("#flights-table tbody");
  const progressBar = document.querySelector("#progress-bar");
  const clock = document.querySelector("#clock");
  const previousBtn = document.querySelector("#previous-button");
  const nextBtn = document.querySelector("#next-button");

  const flightsPerPage = 5; //default
  let currentPage = 0;
  let progressInt;

  function createTableRow(flight) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${flight.time}</td>
    <td>${flight.destination}</td>
    <td>${flight.flightNumber}</td>
    <td>${flight.flightCompany}</td>
    <td>${flight.status}</td>
    `;
    return row;
  }

  function updateTable() {
    //   const currentPageFlights = flights[currentPage];

    //   tableBody.innerHTML = "";
    //   tableBody.appendChild(createTableRow(currentPageFlights));

    const startIndex = currentPage * flightsPerPage;
    const endIndex = startIndex + flightsPerPage;
    const currentPageFlights = flights.slice(startIndex, endIndex);

    tableBody.innerHTML = "";
    currentPageFlights.forEach((flight) => {
      const row = createTableRow(flight);
      tableBody.appendChild(row);
    });

    // Disable previous button on the first page
    // previousBtn.disabled = currentPage == 0;

    // Disable next button on the last page
    // nextBtn.disabled = endIndex >= flights.length;
  }

  function updateProgressBar() {
    const currentFlightIndex = currentPage * flightsPerPage;
    const currentFlight = flights[currentFlightIndex];
    const duration = currentFlight.duration;

    let progress = 0;
    progressBar.style.width = "0%";

    progressInt = setInterval(() => {
      progress += 10;
      progressBar.style.width = `${progress}%`;

      if (progress >= 100) {
        clearInterval(progressInt);
        nextPage();
      }
    }, duration / 10);
  }

  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    clock.textContent = time;
  }

  function nextPage() {
    clearInterval(progressInt);
    currentPage =
      (currentPage + 1) % Math.ceil(flights.length / flightsPerPage);
    updateTable();
    const duration = flights[currentPage * flightsPerPage].duration;
    const color = flights[currentPage * flightsPerPage].color;
    progressBar.style.backgroundColor = color;
    progressBar.style.width = "0%";
    updateProgressBar(duration);
  }

  function prevPage() {
    clearInterval(progressInt);
    currentPage =
      (currentPage - 1 + Math.ceil(flights.length / flightsPerPage)) %
      Math.ceil(flights.length / flightsPerPage);
    updateTable();
    const duration = flights[currentPage * flightsPerPage].duration;
    const color = flights[currentPage * flightsPerPage].color;
    progressBar.style.backgroundColor = color;
    progressBar.style.width = "0%";
    updateProgressBar(duration);
  }

  updateTable();
  nextPage();
  setInterval(updateClock, 1000);

  // previousBtn.addEventListener("click", prevPage);
  // nextBtn.addEventListener("click", nextPage);
});
