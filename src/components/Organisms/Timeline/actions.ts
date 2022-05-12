import GSTC from "gantt-schedule-timeline-calendar/dist/gstc.wasm.esm.min.js";

function updateRowClass(el, data) {
  const hasClass = el.classList.contains("example-class");
  if (data.row.expanded && !hasClass) {
    el.classList.add("example-class");
    console.log("dont has class", data);
    data.state.update(
      `config.list.rows.${[data.rowData.children[0]]}.renderNewItem`,
      true
    );
  } else if (!data.row.expanded && hasClass) {
    el.classList.remove("example-class");
    console.log("has class");
  }
  // console.log(el, data);
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
