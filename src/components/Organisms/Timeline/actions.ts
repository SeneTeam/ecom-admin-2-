import { getEmployeeSummary } from "./../../../services/employees/employees.service";
import dayjs from "dayjs";

const createNewItems = (currentTime: number, rowId: string, api: any) => {
  const currentMonthDays = dayjs(currentTime).daysInMonth();

  const fromDate = dayjs(currentTime).startOf("month");

  let items = {};

  for (let i = 0; i < [...Array(1).keys()].length; i++) {
    let id = api.GSTCID(String(`month-${i}`));
    const startTime = fromDate.add(i, "day").startOf("day").valueOf();
    const endTime = fromDate.add(i, "day").endOf("day").valueOf();
    items[id] = {
      id,
      rowId,
      label: `Item ${i + 1}`,
      time: {
        start: startTime,
        end: endTime,
      },
      description: "May 11 - 15d",
      gap: { top: 14, bottom: 4 },
      height: 50,
      minWidth: 10,
      overlap: false,
      top: 0,
    };
  }
  return items;
};

async function updateRowClass(el, data) {
  if (data.row.expanded) {
    data.state.update(
      `config.list.rows.${[data.rowData.children[0]]}.renderNewItem`,
      true
    );

    const currentTime = data.state.get("config.chart.time.from");

    data.state.update(
      `config.list.rows.${[data.rowData.children[0]]}.monthLabel`,
      dayjs(currentTime).format("MMMM")
    );
    data.state.update(
      `config.list.rows.${[data.rowData.children[0]]}.monthNumber`,
      dayjs(currentTime).format("MM")
    );
    data.state.update(
      `config.list.rows.${[data.rowData.children[0]]}.monthDays`,
      `1 - ${dayjs(currentTime).daysInMonth()}d`
    );

    const month = dayjs(currentTime).month();
    const year = dayjs(currentTime).year();

    const response = await getEmployeeSummary({
      id: data.row.id.replace("gstcid-", ""),
      month,
      year,
    });
    data.state.update(
      `config.list.rows.${[data.rowData.children[0]]}.totDays`,
      `${response.totDays}h`
    );
    data.state.update(
      `config.list.rows.${[data.rowData.children[0]]}.totHours`,
      `${response.totHours}h`
    );
    data.state.update(
      `config.list.rows.${[data.rowData.children[0]]}.totHoursByContract`,
      `${response.totHoursByContract}h`
    );
  }

  // console.log(el, data);
}

function updateItems(el, data) {
  if (data.row.expanded) {
    const currentTime = data.state.get("config.chart.time.from");

    const newItems = createNewItems(
      currentTime,
      data.rowData.children[0],
      data.api
    );

    setTimeout(() => {
      const pastItems = data.state.get("config.chart.items");

      // data.state.update("config", (config) => {
      //   console.log(config);
      //   config.chart.items = {
      //     ...pastItems,
      //     ...newItems,
      //   };
      //   return config;
      // });
      console.log("this is going on", { el, data });
      // if you have items you can change view
      data.state.update("config.chart.items", {});
    }, 250);
  }
}

export function updateRowClassAction(el, data) {
  updateRowClass(el, data);
  return {
    update(el, data) {
      updateRowClass(el, data);
    },
    destroy() {},
  };
}

export function updateItemsClassAction(el, data) {
  return {
    update(el, data) {
      updateItems(el, data);
    },
    destroy() {},
  };
}
