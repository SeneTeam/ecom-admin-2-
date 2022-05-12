import { getEmployeeSummary } from "./../../../services/employees/employees.service";
import dayjs from "dayjs";
import {
  ActionData,
  ActionFunctionResult,
} from "gantt-schedule-timeline-calendar/dist/gstc.wasm.esm.min";

async function updateRowClass(el: HTMLElement, data: ActionData) {
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

    if (data.rowData.children.length > 0) {
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
  }
}

export function updateRowClassAction(
  el: HTMLElement,
  data: ActionData
): ActionFunctionResult {
  updateRowClass(el, data);
  return {
    update(el, data) {
      updateRowClass(el, data as ActionData);
    },
    destroy() {},
  };
}
