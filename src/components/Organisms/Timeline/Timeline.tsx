import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import weekOfYear from "dayjs/plugin/weekOfYear";
import Select from "react-select";
import { Plugin as TimelinePointer } from "gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js";
import { Plugin as HighlightWeekends } from "gantt-schedule-timeline-calendar/dist/plugins/highlight-weekends.esm.min.js";
import { Plugin as ItemMovement } from "gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js";
import { Plugin as ItemResizing } from "gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js";
import {
  EventSelection,
  Plugin as Selection,
} from "gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js";
import "gantt-schedule-timeline-calendar/dist/style.css";
import Pagination from "../../Molecules/custom/Pagination";
import "../../../styles/components/Timeline/Timeline.scss";
import { itemSlot, mainOuterSlot, rowSlot, toggleSlot } from "./slots";
import { updateRowClassAction } from "./actions";
import GSTC, {
  Items,
  Config,
  Rows,
  Item,
  ChartCalendarLevelFormat,
} from "gantt-schedule-timeline-calendar";
import { EmployeeDto } from "../../../types/services/employees.types";
import { ValueType } from "../../../types";

//@ts-ignore
GSTC.api.dayjs.extend(weekOfYear);
//@ts-ignore
GSTC.api.dayjs.extend(advancedFormat);

let gstc: any, state: any;

const showEntriesOptions = [
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

function isItemResizable(item: Item) {
  if (typeof item.resizable === "boolean") return item.resizable;
  return true;
}

function isItemMovable(item: Item) {
  if (typeof item.canMove === "boolean") return item.canMove;
  return true;
}

function canSelectItem(item: Item) {
  if (typeof item.canSelect === "boolean") return item.canSelect;
  return true;
}

function preventSelection(selecting: EventSelection) {
  return {
    "chart-timeline-grid-row-cell": selecting["chart-timeline-grid-row-cell"],
    "chart-timeline-items-row-item": selecting[
      "chart-timeline-items-row-item"
    ].filter((item) => canSelectItem(item as Item)),
  };
}

function generateRows(employees: EmployeeDto[]) {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Rows }
   */
  const rows: Rows = {};

  for (let i = 0; i < employees.length * 2; i++) {
    const withParent = i % 2 === 0;
    const id = GSTC.api.GSTCID(withParent ? employees[i / 2].id : String(i));
    rows[id] = {
      parentId: !withParent
        ? GSTC.api.GSTCID(String(employees[(i - 1) / 2].id))
        : undefined,
      withParent,
      ...(withParent ? employees[i / 2] : employees[(i - 1) / 2]),
      expanded: false,
    };
  }

  return rows;
}

function generateItems(employees: EmployeeDto[]) {
  const items: Items = {};

  employees.forEach((employee) => {
    employee.workActions.forEach((workAction, index) => {
      if (workAction) {
        const id = GSTC.api.GSTCID(index.toString());
        const rowId = GSTC.api.GSTCID(employee.id);
        items[id] = {
          id,
          label: workAction.country.name,
          rowId,
          style: { border: `1px solid ${workAction.country.color}` },
          time: {
            start: GSTC.api.date(workAction.start).startOf("day").valueOf(),
            end: GSTC.api.date(workAction.end).endOf("day").valueOf(),
          },
          top: 2,
          gap: {
            top: 4,
            bottom: 4,
          },
          description: `${dayjs(new Date(workAction.start)).format(
            "MMMM DD"
          )} - ${dayjs(new Date(workAction.end)).format("DD")}d`,
          color: workAction.country.color,
          endDate: employee.endDate,
        };
      }
    });
  });
  return items;
}

const day: ChartCalendarLevelFormat[] = [
  {
    zoomTo: 100,
    period: "day",
    main: true,
    periodIncrement: 1,
    format({ timeStart }) {
      return timeStart.format("ddd");
    },
  },
];
const dayNumber: ChartCalendarLevelFormat[] = [
  {
    zoomTo: 100,
    period: "day",
    periodIncrement: 1,
    format({ timeStart }) {
      return timeStart.format("DD");
    },
  },
];

const customPeriod: ChartCalendarLevelFormat[] = [
  {
    zoomTo: 100,
    period: "week",
    periodIncrement: 1,
    format({ timeStart, timeEnd }) {
      return `${timeStart.format("MMMM")} ${timeStart.format(
        "DD"
      )} - ${timeEnd.format("MMMM")} ${timeEnd.format(
        "DD"
      )} | Sav. ${timeStart.format("ww")} `;
    },
  },
];

function initializeGSTC({
  element,
  employees,
}: {
  element: HTMLDivElement;
  employees: EmployeeDto[];
}) {
  const config = {
    licenseKey:
      "====BEGIN LICENSE KEY====\nhEozEdGF0C9OSXsuzocPicitrl9+gZdzE3bJez0bm0qnEtQPf532PvHhBx1ttSRqDUMCIzXd0kecvmNg1rvB0yv5Bb/BgIUwP91tl9y4qtDkfxO2Kfgl5Ad8fkN769mp7Df4dE256jFaTy3dNdHOStprPHfR7ZoObLLw3n/dqoYxJS89/Aw37Otx+QuG7knQfAhM5Ocrvi23tcg6RdKX8xJ7Ru8WUX/Y5JmFcADxR3opTX4N4NeqNwhRGtalDU9/1GvaGvd0ZqmWT9NTxY4ZVAIkBPGPgAk6VVrcep4ejB1x8liHq+5zOH73BELDwtAnm5HThfdqVri+QZoPRylv5g==||U2FsdGVkX18SokvPv0iNNYlPHrpEudh3l2tKkANL3+35wrMaYqCpvTElKvEAczd3T1PGSd8Whdg4csnUJXHshPVe3baTvqrlBM7EHfZNd68=\nr9ZGP+eU71uUyDDEU8xPkqNC3sgn4mdyjXZwgBsVbJzUs23LrbGHzI/zynMAtDHeEmuGhQRK0e8pfRO6/g9o9A+kEXiG3oyR7CDPREQW/1oBbpsQD32vWejtkj3ZaGZn9wRPG2COYkroZ4Dkq9ewvrCrXNdaxIIyfooK1QSPwvaoF/Vjgs8x6n75gmoRkZWhaCnFwuu7isBuIR+ZOao8SbBZwNfZgGWn9H6nsbK88IXa9VLMufZw4NSs7JhYpNyIyPkQeQpEem/JKW1wkcPThhZOAb/AmBAXGDBQ5GNGTeAGASeRQfTxlUaApji26GFjH16Nykx8mnY9GQNtIHBgEg==\n====END LICENSE KEY====",
    plugins: [
      HighlightWeekends(),
      TimelinePointer(),
      Selection({
        events: {
          onSelecting(selecting, lastSelected) {
            const filtered = preventSelection(selecting);
            return filtered;
          },
          onEnd(selected, lastSelected) {
            const filtered = preventSelection(selected);
            return filtered;
          },
        },
      }),
      ItemResizing({
        events: {
          onResize({ items }) {
            const filtered = items.after.map((item, index) => {
              if (!isItemResizable(item)) {
                return items.before[index];
              }
              return item;
            });
            return filtered;
          },
        },
      }),
    ],
    list: {
      columns: {
        data: {
          [GSTC.api.GSTCID("id")]: {
            id: GSTC.api.GSTCID("id"),
            width: 200,
            isHTML: false,
            expander: true,
            data: "id",
            header: {
              content: "Employees",
            },
          },
        },
      },
      rows: generateRows(employees),
      row: {
        height: 64,
      },
      toggle: {
        display: false,
      },
      expander: {
        padding: 0,
        size: 12,
      },
    },
    chart: {
      items: generateItems(employees),
      item: {
        height: 50,
        gap: {
          top: 14,
        },
      },
      calendarLevels: [customPeriod, day, dayNumber],
      time: {
        zoom: 20.5,
        from: GSTC.api.date().startOf("month").valueOf(),
        to: GSTC.api.date().endOf("month").valueOf(),
      },
    },
    scroll: {
      vertical: { precise: true },
      horizontal: { precise: true },
    },
    slots: {
      "chart-timeline-items-row-item": { content: [itemSlot] },
      "list-column-row": { content: [rowSlot] },
      "list-column-row-expander-toggle": { content: [toggleSlot] },
      main: { outer: [mainOuterSlot] },
    },
    actions: {
      "list-column-row": [updateRowClassAction],
    },
  };

  state = GSTC.api.stateFromConfig(config as Config);

  gstc = GSTC({
    element,
    state,
  });
}

type TimelineProps = {
  employees: EmployeeDto[] | null;
  data: EmployeeDto[];
  rowsPerPage: number;
  totalPages?: number;
  currentPage: number;
  onChangePage: (_page: number) => void;
  onChangePageSize: (_size: number) => void;
};

function Timeline({
  employees,
  currentPage,
  rowsPerPage,
  onChangePage,
  onChangePageSize,
  data,
}: TimelineProps) {
  const callback = useCallback((element: HTMLDivElement) => {
    if (element && employees)
      initializeGSTC({
        element,
        employees,
      });
  }, []);

  function handlePageChange(e: number) {
    onChangePage(e);
  }

  function handleChangeRowsPerPage(e: ValueType) {
    onChangePage(0);
    onChangePageSize(parseInt(e.value + ""));
  }

  useEffect(() => {
    if (employees && state) {
      state.update("config.list.rows", generateRows(employees));
    }
  }, [employees, state]);

  if (!employees) {
    return null;
  }

  return (
    <div className="App">
      <div className="toolbox"></div>
      <div className="gstc-wrapper" ref={callback}></div>
      <div className=" my-2">
        <div className="d-flex align-items-center py-2">
          <span className="px-3 text-xs">Rodyti</span>
          <Select
            className="text-xs"
            name="rowstoDisplay"
            value={showEntriesOptions.find(
              (option) => option.value === rowsPerPage + ""
            )}
            styles={{
              menu: (provided) => ({
                ...provided,
                padding: "0px 0px 60px 0px",
              }),
            }}
            // @ts-ignore
            onChange={handleChangeRowsPerPage}
            options={showEntriesOptions}
          />
        </div>
        <Pagination
          totalElements={data.length}
          paginate={handlePageChange}
          currentPage={currentPage}
          totalPages={Math.ceil(data.length / rowsPerPage)}
        />
      </div>
    </div>
  );
}

export default Timeline;
