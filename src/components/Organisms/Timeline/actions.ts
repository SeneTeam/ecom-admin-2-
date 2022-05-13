import {
  ActionData,
  ActionFunctionResult,
} from "gantt-schedule-timeline-calendar/dist/gstc.wasm.esm.min";
import { employeeService } from "../../../services/employees/employee.service";

async function updateRowClass(el: HTMLElement, data: ActionData) {
  if (data.row.expanded) {
    data.state.update(
      `config.list.rows.${[data.rowData.children[0]]}.renderNewItem`,
      true
    );

    const currentTime = data.state.get("config.chart.time.from");

    data.state.update(
      `config.list.rows.${[data.rowData.children[0]]}.monthLabel`,
      data.api.time.date(currentTime).format("MMMM")
    );
    data.state.update(
      `config.list.rows.${[data.rowData.children[0]]}.monthNumber`,
      data.api.time.date(currentTime).format("MM")
    );
    data.state.update(
      `config.list.rows.${[data.rowData.children[0]]}.monthDays`,
      `1 - ${data.api.time.date(currentTime).daysInMonth()}d`
    );

    if (data.rowData.children.length > 0) {
      const month = data.api.time.date(currentTime).month();

      const year = data.api.time.date(currentTime).year();

      const { data: response } = await employeeService.fetchEmployeeSummary(
        data.row.id.replace("gstcid-", ""),
        month,
        year
      );

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
