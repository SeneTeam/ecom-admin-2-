import React, { useCallback, useEffect } from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import weekOfYear from "dayjs/plugin/weekOfYear";
import GSTC from "gantt-schedule-timeline-calendar/dist/gstc.wasm.esm.min.js";
import { Plugin as TimelinePointer } from "gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js";
import { Plugin as HighlightWeekends } from "gantt-schedule-timeline-calendar/dist/plugins/highlight-weekends.esm.min.js";

import "gantt-schedule-timeline-calendar/dist/style.css";
import { TimesheetEmployee } from "../../../utils/format-data";
import "../../../styles/components/Timeline/Timeline.scss";
import { itemSlot, mainOuterSlot, rowSlot, toggleSlot } from "./slots";
import { updateRowClassAction } from "./actions";
import { Items, Config, Rows } from "gantt-schedule-timeline-calendar";

//@ts-ignore
GSTC.api.dayjs.extend(weekOfYear);
//@ts-ignore
GSTC.api.dayjs.extend(advancedFormat);

const startDate = GSTC.api.date("2022-01-01").startOf("month");
const endDate = startDate.clone().endOf("month");
const startTime = startDate.valueOf();

let gstc: any, state: any;

// helper functions

function generateRows(employees: TimesheetEmployee[]) {
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

function generateItems(employees: TimesheetEmployee[]) {
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
            start: new Date(workAction.start).getTime(),
            end: new Date(workAction.end).getTime(),
          },
          description: `${dayjs(new Date(workAction.start)).format(
            "MMMM DD"
          )} - ${dayjs(new Date(workAction.end)).format("DD")}d`,
        };
      }
    });
  });
  return items;
}

const day = [
  {
    zoomTo: 100,
    period: "day",
    periodIncrement: 1,
    format({ timeStart }) {
      return timeStart.format("ddd");
    },
  },
];
const dayNumber = [
  {
    zoomTo: 100,
    period: "day",
    periodIncrement: 1,
    format({ timeStart }) {
      return timeStart.format("DD");
    },
  },
];

const customPeriod = [
  {
    zoomTo: 100,
    period: "week",
    periodIncrement: 1,
    main: true,
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
  employees: TimesheetEmployee[];
}) {
  const config = {
    licenseKey:
      "====BEGIN LICENSE KEY====\naTg76WFnIgbeCK5Zd3+Zq2uu5BNewPb/E6DLtNhm08CAs2KBrFJMIYCeZVrB9JxsUxQPdVmXoDuO2baS8Etj8/8ukmcx7FgvpyneEabMGQn6SuzAJ01BE4uHbdzeV7NCC6Yzp9wBGo7TqdxTe/561xV+SZ+Y+ZNWyHxYb/7M/TVC1cLlE6g74ShC8piUBKWpG2nmBE5/AdDn6fD64iRyc52NSEpQ38vn/6ewem4ujop0B5hZ/JPUOkTEC0d/R0nuyrsATgMKqXJYlD+TdSAe5O8AYTRE8UkDYiJCXBJWRYYHEdW9tIE2FoetR4usAu5WAlTKU2NEu6yexp0VYp/mKg==||U2FsdGVkX1/xZoBVtb6PASZlwmOviioZlHDTR2o3J/SxN2rDWAuuFXTWXCAVHX8nfEIjKGbNSyYn0ks17MdeKParXCT2o/wxEoi3ibUmLy4=\nD5zWFfXQXYRenN+IWc/60CIVY34jb9vJd3Sneklf0XWmwWm/aVUsE9NTW0e5wao/mCg3iPsHxfyT4PUgAJngYNVxJl6RONa0II/sRbr0lrwjA+6wbmg1XQ2xJXOqavx7GfPjbo4IdO43EMfRFLb9BrxEQa4nsYlIJvVMe7OQEeFr2JlpHLSTZNSp+7NLEhbmWdRxuqdpAh+VO4tK8++E6Ub/OmNNkFNzjg5UwYoQPR7xfn1uGU8mLbhkPPdNcJDSzhYblYjE0dggSWb/WCclxxQFVVm86/LG1diV0UIte53y/tIqiQ6JILNHc8RpBYVwwSFqCsllWgPkuyQzUpuRXA==\n====END LICENSE KEY====",
    plugins: [HighlightWeekends(), TimelinePointer()],
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
          //bottom: 0,
        },
      },
      calendarLevels: [customPeriod, day, dayNumber],
      time: {
        calculatedZoomMode: true,
        from: startDate.valueOf(),
        to: endDate.valueOf(),
      },
    },
    scroll: {
      vertical: { precise: true },
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
  employees: TimesheetEmployee[] | null;
};

function Timeline({ employees }: TimelineProps) {
  const callback = useCallback((element: HTMLDivElement) => {
    if (element && employees)
      initializeGSTC({
        element,
        employees,
      });
  }, []);

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
    </div>
  );
}

export default Timeline;
