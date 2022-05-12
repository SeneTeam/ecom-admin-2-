import dayjs from "dayjs";

export const rowSlot = (vido, props) => {
  const { html, onChange, update, api } = vido;

  const currentTime = vido.state.get("config.chart.time.from");

  const month = dayjs(currentTime).format("MMM");

  onChange((newProps) => {
    props = newProps;
    if (!props || !props.row) return;
    // img = props.row.img;
    update();
  });

  return (content) =>
    html` <div class="timesheet-row">
      <div class="d-flex p-2 align-items-center">
        <div
          class="timesheet-row-image"
          style="background-image: url(${props.row.profileUrl})"
        ></div>
        <div class="text-start ms-2">
          <h6 class="mb-0 lh-base">${props.row.name}</h6>
          <p class="mb-0 lh-base">${props.row.role}</p>
        </div>
      </div>
      <div class="timesheet-row-summary d-flex p-2 justify-content-between">
        <div>
          <p class="mb-0">${month}</p>
          <p class="mb-0">${month}</p>
          <p class="mb-0">${month}</p>
        </div>
        <div class="text-start">
          <div>
            <span>Darbo valandos</span>
            <span class="fw-bold">${month}</span>
          </div>
          <div>
            <span>Biuleteniai</span>
            <span class="fw-bold">${month}</span>
          </div>
          <div>
            <span>Viršvalandžiai</span>
            <span class="fw-bold">${month}</span>
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
