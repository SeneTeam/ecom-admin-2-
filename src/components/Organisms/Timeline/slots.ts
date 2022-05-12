import { getEmployeeSummary } from "./../../../services/employees/employees.service";
import dayjs from "dayjs";

export const rowSlot = (vido, props) => {
  const { html, onChange, update, api } = vido;

  const currentTime = vido.state.get("config.chart.time.from");

  let monthLabel = dayjs(currentTime).format("MMMM");
  let monthNumber = dayjs(currentTime).format("MM");
  let monthDays = `1 - ${dayjs(currentTime).daysInMonth()}d`;
  let totDays = "";
  let totHours = "";
  let totHoursByContract = "";

  let renderNewItem = false;

  onChange((newProps) => {
    props = newProps;
    if (!props || !props.row) return;
    renderNewItem = Boolean(props.row.renderNewItem);

    monthLabel = props.row.monthLabel;
    monthNumber = props.row.monthNumber;
    monthDays = props.row.monthDays;
    totDays = props.row.totDays;
    totHours = props.row.totHours;
    totHoursByContract = props.row.totHoursByContract;

    update();
  });

  return (content) =>
    html` <div
      class="timesheet-row       
       ${renderNewItem ? "show-summary" : ""}"
    >
      <div
        class="p-2 align-items-center timesheet-profile"
        style="cursor: pointer"
      >
        <div
          class="timesheet-row-image"
          style="background-image: url(${props.row.profileUrl})"
        ></div>
        <div class="text-start ms-2 timesheet-row-profile">
          <h6 class="mb-0 lh-base">${props.row.name}</h6>
          <p class="mb-0 lh-base">${props.row.role}</p>
        </div>
      </div>
      <div class="timesheet-row-summary p-2 justify-content-between">
        <div>
          <p class="mb-1">${monthLabel}</p>
          <p class="mb-1">${monthNumber}</p>
          <p class="mb-0">${monthDays}</p>
        </div>
        <div class="text-start">
          <div class="mb-1">
            <span>Darbo valandos</span>
            <span class="fw-bold">${totHoursByContract}</span>
          </div>
          <div class="mb-1">
            <span>Biuleteniai</span>
            <span class="fw-bold">${totHours}</span>
          </div>
          <div>
            <span>Viršvalandžiai</span>
            <span class="fw-bold">${totDays}</span>
          </div>
        </div>
      </div>
    </div>`;
};

export const itemSlot = (vido, props) => {
  const { html, onChange, update } = vido;

  let imageSrc = "";
  let description = "";
  onChange((newProps) => {
    props = newProps;
    if (!props || !props.item) return;
    description = props.item.description;
    update();
  });

  return (content) =>
    html` <div class="item-text">
      <div class="item-label">${content}</div>
      <div class="item-description">${description}</div>
    </div>`;
};

export function mainOuterSlot(vido, props) {
  const { onChange, api, update, html, state, getElement } = vido;

  const startDate = dayjs("2022-01-01").startOf("month");
  const endDate = startDate.clone().endOf("month");
  const startTime = startDate.valueOf();

  onChange((changedProps) => {
    // if current element is reused to display other item data just update your data so when you click you will display right alert
    props = changedProps;
  });

  let year = api.time.date(startTime).year();
  let month = api.time.date(startTime).month();
  const months = [
    "Sausis",
    "Vasaris",
    "Kovas",
    "Balandis",
    "Gegužė",
    "Birželis",
    "Liepa",
    "Rugpjūtis",
    "Rugsėjis",
    "Spalis",
    "Lapkritis",
    "Gruodis",
  ];

  let loading = "";
  let overlay = "";

  async function updateTime() {
    if (loading) return;
    const startTime = api.time
      .date(`${year}-${month + 1}-01`)
      .startOf("month")
      .valueOf();
    const endTime = api.time
      .date(`${year}-${month + 1}-01`)
      .endOf("month")
      .valueOf();

    console.log(vido, vido.state.data.$data.list.rowsIds);

    // const response = await getEmployeeSummary({
    //   id: props.row.id,
    //   month,
    //   year,
    // });
    // console.log(response);
    loading = "LOADING... You can load items from backend now.";
    overlay = "overlay";
    setTimeout(() => {
      // if you have items you can change view
      state.update("config.chart.time", (time) => {
        time.from = startTime;
        time.to = endTime;
        time.calculatedZoomMode = true;
        console.log(`${year}-${month + 1}-01`, `${year}-${month + 1}-01`);
        return time;
      });
      loading = "";
      overlay = "";
    }, 250);
  }

  let listenerAdded = false;
  function getEl(element) {
    if (listenerAdded) return;
    element.addEventListener("change", (ev) => {
      if (month !== ev.target.value) {
        month = Number(ev.target.value);
        updateTime();
        update();
      }
    });
    listenerAdded = true;
  }

  function setPrevYear() {
    if (loading) return;
    year -= 1;
    updateTime();
    update();
  }

  function setNextYear() {
    if (loading) return;
    year += 1;
    updateTime();
    update();
  }

  function setPrevMonth() {
    if (loading) return;
    month -= 1;
    if (month < 0) {
      month = 11;
      year--;
    }
    updateTime();
    update();
  }

  function setNextMonth() {
    if (loading) return;
    month += 1;
    if (month > 11) {
      month = 0;
      year++;
    }
    updateTime();
    update();
  }

  // return render function
  return (content) =>
    html`<div class="d-flex justify-content-between align-items-center mb-4">
        <div class="timeline-selection d-flex align-items-center ">
          <button id="btn-prev-month" class="me-2" @click=${setPrevMonth}>
            <
          </button>
          <span>${months[month]}</span>
          <button id="btn-next-month" class="ms-2" @click=${setNextMonth}>
            >
          </button>
          <button @click=${setPrevYear} class="mx-2"><</button>
          <span>${year}</span>
          <button @click=${setNextYear} class="ms-2">></button>
        </div>
        <div class="d-flex timeline-buttons">
          <button class="px-4 py-2">Mygtukas</button>
          <button class="px-4 py-2">Mygtukas</button>
          <button class="px-4 py-2">Mygtukas</button>
        </div>
        </div>
      </div>
      ${content}
      <div class=${overlay}>${loading}</div> `;
}
