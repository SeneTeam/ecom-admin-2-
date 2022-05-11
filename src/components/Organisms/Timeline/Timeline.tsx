import React, { useCallback, useEffect } from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import weekOfYear from "dayjs/plugin/weekOfYear";
import GSTC from "gantt-schedule-timeline-calendar/dist/gstc.wasm.esm.min.js";
import { Plugin as TimelinePointer } from "gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js";
import { Plugin as Selection } from "gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js";
import { Plugin as HighlightWeekends } from "gantt-schedule-timeline-calendar/dist/plugins/highlight-weekends.esm.min.js";

import "gantt-schedule-timeline-calendar/dist/style.css";
import { TimesheetEmployee } from "../../../utils/format-data";
import "../../../styles/components/Timeline/Timeline.scss";
// @ts-ignore
GSTC.api.dayjs.extend(weekOfYear);
//@ts-ignore
GSTC.api.dayjs.extend(advancedFormat);

let gstc: any, state;

// helper functions

function generateRows(employees: TimesheetEmployee[]) {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Rows }
   */
  const rows: { [key: string]: TimesheetEmployee } = {};
  for (let i = 0; i < employees.length; i++) {
    const id = GSTC.api.GSTCID(employees[i].id);
    rows[id] = {
      ...employees[i],
    };
  }
  return rows;
}

function itemSlot(vido, props) {
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
}

function generateItems(employees: TimesheetEmployee[]) {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Items }
   */
  const items = {};
  // @ts-ignore

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
            start: new Date(workAction.start),
            end: new Date(workAction.end),
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
  element: any;
  employees: TimesheetEmployee[];
}) {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Config }
   */

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
            data({ row, vido }: any) {
              return vido.html`<div class="d-flex p-2 align-items-center">
              <div class="timesheet-image" style="background-image: url(${row.profileUrl})">
              </div>
              <div class="text-start ms-2">
              <h6 class="mb-0 lh-base">${row.name}</h6>
              <p class="mb-0 lh-base">${row.role}</p>
              </div>
              </div>`;
            },
            header: {
              content: "Employees",
            },
          },
        },
      },
      rows: generateRows(employees),
      row: {
        height: 68,
      },
      toggle: {
        display: false,
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
        from: GSTC.api.date("2022-01-01").valueOf(),
        to: GSTC.api.date("2022-01-01").endOf("year").valueOf(),
      },
    },
    scroll: {
      vertical: { precise: true },
      horizontal: { precise: true },
    },
    slots: {
      "chart-timeline-items-row-item": { content: [itemSlot] },
    },
  };

  state = GSTC.api.stateFromConfig(config);

  gstc = GSTC({
    element,
    state,
  });
}

type TimelineProps = {
  employees: TimesheetEmployee[] | null;
};

function Timeline({ employees }: TimelineProps) {
  const callback = useCallback((element) => {
    if (element && employees)
      initializeGSTC({
        element,
        employees,
      });
  }, []);

  // useEffect(() => {
  //   return () => {
  //     if (gstc) {
  //       gstc.destroy();
  //     }
  //   };
  // }, []);

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
