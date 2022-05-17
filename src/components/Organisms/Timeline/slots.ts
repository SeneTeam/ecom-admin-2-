import dayjs from "dayjs";
import { formatTimesheet } from "./../../../utils/format-data";

import { DataChartTime, Items, Row } from "gantt-schedule-timeline-calendar";
import { Api } from "gantt-schedule-timeline-calendar/dist/api/api";
import {
  htmlResult,
  Item,
  RowData,
  Vido,
} from "gantt-schedule-timeline-calendar/dist/gstc.wasm.esm.min";
import { TimeSheet } from "../../../types/employee";

const startDate = dayjs().startOf("month");
const endDate = startDate.clone().endOf("month");
const startTime = startDate.valueOf();

export const rowSlot = (vido: Vido, props: { row: Row }) => {
  const { html, onChange, update, api } = vido;

  const currentTime = vido.state.get("config.chart.time.from");

  let monthLabel = api.time.date(currentTime).format("MMMM");
  let monthNumber = api.time.date(currentTime).format("MM");
  let monthDays = `1 - ${api.time.date(currentTime).daysInMonth()}d`;
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

  return () =>
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
          <h6 class="mb-0 lh-base">
            ${props.row.firstName} ${props.row.lastName}
          </h6>
          <p class="mb-0 lh-base">${props.row.employeeRole?.name || ""}</p>
        </div>
      </div>
      <div class="timesheet-row-summary pt-3 p-2 justify-content-between">
        <div class="text-start">
          <p class="mb-1">${monthLabel}</p>
          <p class="mb-1">${monthNumber} /</p>
          <p class="mb-0"><strong>${monthDays}</strong></p>
        </div>
        <div class="text-start">
          <div class="mb-1">
            <span>Darbo valandos:</span>
            <span class="fw-bold">${totHoursByContract}</span>
          </div>
          <div class="mb-1">
            <span style="color: #FFA771">Biuleteniai:</span>
            <span class="fw-bold">${totHours}</span>
          </div>
          <div>
            <span style="color: #9E41D6">Viršvalandžiai:</span>
            <span class="fw-bold">${totDays}</span>
          </div>
        </div>
      </div>
    </div>`;
};

export const itemSlot = (vido: Vido, props: { item: Item }) => {
  const { html, onChange, update } = vido;

  let isTimeSheet = false;
  let description = "";
  let color = "";
  onChange((newProps) => {
    props = newProps;
    if (!props || !props.item) return;
    description = props.item.description;
    isTimeSheet = Boolean(props.item.isTimeSheet);
    color = props.item.color;
    update();
  });

  return (content: htmlResult) =>
    html` <div
      class="item-timesheet-text w-100 ${
        isTimeSheet
          ? "item-code text-center"
          : "text-start d-flex align-items-center justify-content-between"
      }"
    >
      <div style=${isTimeSheet ? "margin-top:10px" : ""}>
        <div class="item-label ${
          isTimeSheet ? "text-center" : "text-start"
        }"">${content}
        </div>
        <div class="item-description ${
          isTimeSheet ? "mt-2" : "d-flex align-items-center"
        }">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_1_403" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="2" width="12" height="8">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 10C6.70914 10 8.5 8.20914 8.5 6C8.5 3.79086 6.70914 2 4.5 2C2.29086 2 0.5 3.79086 0.5 6C0.5 8.20914 2.29086 10 4.5 10ZM8.5 3.175V2.13C10.225 2.575 11.5 4.135 11.5 6C11.5 7.865 10.225 9.425 8.5 9.87V8.825C9.665 8.415 10.5 7.305 10.5 6C10.5 4.695 9.665 3.585 8.5 3.175Z" fill="white"/>
          </mask>
          <g mask="url(#mask0_1_403)">
          <rect x="-6.5" y="-6.5" width="25" height="25" fill=${color}/>
          <mask id="mask1_1_403" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="-7" y="-7" width="26" height="26">
          <rect x="-6.5" y="-6.5" width="25" height="25" fill="white"/>
          </mask>
          <g mask="url(#mask1_1_403)">
          </g>
          </g>
        </svg>
        <span>${description}</span></div>
      </div>
      <img
        src="/icons/three-dots.svg"
        className="cursor-pointer"
        width=16
        height=16
        alt="three-dots"
      />
    </div>`;
};

export function mainOuterSlot(vido: Vido, props: any) {
  const { onChange, api, update, html, state, getElement } = vido;

  onChange((changedProps) => {
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

  let loading = false;

  function updateTime() {
    if (loading) return;
    const startTime = api.time
      .date(`${year}-${month + 1}-01`)
      .startOf("month")
      .valueOf();
    const endTime = api.time
      .date(`${year}-${month + 1}-01`)
      .endOf("month")
      .valueOf();
    loading = true;
    state.update("config.chart.time", (time: DataChartTime) => {
      time.from = startTime;
      time.to = endTime;
      time.zoom = 20.5;
      return time;
    });
    api.scrollToTime(startTime, false);

    loading = false;
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
  return (content: htmlResult) =>
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
      ${content}`;
}

const createNewItems = ({
  currentTime,
  rowId,
  api,
  timeSheets,
}: {
  currentTime: number;
  rowId: string;
  api: Api;
  timeSheets: TimeSheet[];
}) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff =
    now.getTime() -
    start.getTime() +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  const currentDaysYear = Math.floor(diff / oneDay);
  const daysInMonth = dayjs().daysInMonth();
  const nextTwelveMonths = daysInMonth + 365;

  const fromDate = api.time.date(currentTime).startOf("month");

  let items: Items = {};

  let dateIncrement = 0;
  for (let i = 0; i < [...Array(nextTwelveMonths).keys()].length; i++) {
    let id = api.GSTCID(String(`month-${rowId}-${i}`));
    if (dateIncrement >= nextTwelveMonths) dateIncrement = 0;
    const startTime = fromDate
      .add(dateIncrement, "day")
      .startOf("day")
      .valueOf();
    const endTime = fromDate.add(dateIncrement, "day").endOf("day").valueOf();

    let selectedTimeSheet: {
      startTime: number;
      hours: number;
      code: string;
    }[] = [];

    if (timeSheets.length > 0) {
      const formattedTimeSheets = formatTimesheet(timeSheets);
      selectedTimeSheet = formattedTimeSheets.filter(
        (timeSheet) => timeSheet.startTime === startTime
      );
    }

    items[id] = {
      id,
      rowId,
      label:
        selectedTimeSheet.length > 0 ? selectedTimeSheet[0].code || "DV" : `DV`,
      isTimeSheet: true,
      classNames: ["item-summary-row"],
      resizable: false,
      canSelect: false,
      canMove: false,
      top: 0,
      gap: {
        top: 0,
        bottom: 0,
      },
      height: 68,
      time: {
        start: startTime,
        end: endTime,
      },
      description:
        selectedTimeSheet.length > 0
          ? `${selectedTimeSheet[0].hours || 0}h`
          : `8h`,
    };
    dateIncrement++;
  }
  return items;
};

export function toggleSlot(
  vido: Vido,
  props: { row: Row } & { rowData: RowData }
) {
  const { html, onChange, update, state, api } = vido;

  let loading = "";
  let currentTime = state.get("config.chart.time.from");

  function updateItems() {
    if (loading) return;

    loading = "LOADING... You can load items from backend now.";

    const newItems = createNewItems({
      currentTime,
      rowId: props.rowData.children[0],
      api,
      timeSheets: props.row.timeSheets,
    });

    const pastItems = state.get("config.chart.items");

    state.update("config.chart.items", {
      ...pastItems,
      ...newItems,
    });
  }

  function loadNewItems() {
    if (loading) return;

    if (props.row.withParent) {
      updateItems();
    } else {
      return;
    }
  }

  onChange((newProps) => {
    props = newProps;
    update();
  });

  return (content: htmlResult) =>
    html`
      <div
        class="item-toggle ${props.row.withParent ? "with-parent" : ""}"
        @click=${loadNewItems}
      >
        ${content}
      </div>
    `;
}
