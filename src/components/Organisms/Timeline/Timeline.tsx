import React, { useCallback, useEffect } from "react";

import GSTC from "gantt-schedule-timeline-calendar/dist/gstc.wasm.esm.min.js";
import { Plugin as TimelinePointer } from "gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js";
import { Plugin as Selection } from "gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js";

import "gantt-schedule-timeline-calendar/dist/style.css";
import { TimesheetEmployee } from "../../../utils/format-data";

let gstc, state;

// helper functions

function generateRows(employees: TimesheetEmployee[]) {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Rows }
   */
  const rows: { [key: string]: TimesheetEmployee } = {};
  for (let i = 0; i < employees.length; i++) {
    const id = employees[i].id;
    rows[id] = {
      ...employees[i],
    };
  }
  return rows;
}

function generateItems(employees: TimesheetEmployee[]) {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Items }
   */
  const items = {};
  // @ts-ignore
  let start = GSTC.api.date().startOf("day").subtract(6, "day");
  for (let i = 0; i < employees.length; i++) {
    const id = GSTC.api.GSTCID(i.toString());
    const rowId = GSTC.api.GSTCID(i.toString());
    start = start.add(1, "day");
    items[id] = {
      ...employees[i],
      time: {
        start: start.valueOf(),
        end: start.add(1, "day").endOf("day").valueOf(),
      },
    };
  }
  return items;
}

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
    plugins: [TimelinePointer(), Selection()],
    list: {
      columns: {
        data: {
          [GSTC.api.GSTCID("id")]: {
            id: GSTC.api.GSTCID("id"),
            width: 200,
            data({ row, vido }: any) {
              return vido.html`<div style="text-align:center">${row.name}</div>`;
            },
            header: {
              content: "Employees",
            },
          },
        },
      },
      rows: generateRows(employees),
    },
    chart: {
      items: generateItems(employees),
    },
  };

  state = GSTC.api.stateFromConfig(config);

  gstc = GSTC({
    element,
    state,
  });
}

type TimelineProps = {
  employees: TimesheetEmployee[];
};

function Timeline({ employees }: TimelineProps) {
  const callback = useCallback((element) => {
    if (element)
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
  // });

  return (
    <div className="App">
      <div className="toolbox"></div>
      <div className="gstc-wrapper" ref={callback}></div>
    </div>
  );
}

export default Timeline;
