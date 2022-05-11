import React, { useState } from "react";
import "../../../styles/components/Sidebar/Sidebar.scss";
import { mockData } from "./data";

const Sidebar = () => {
  const [selected, setSelected] = useState("");
  const [openItem, setOpenItem] = useState("");

  return (
    <div className="sidebar flex-shrink-0 bg-white">
      <span>logo</span>
      {mockData.map((data) => (
        <div key={data.label}>
          <div
            className="d-flex first-item p-4 text-white border-top border-white fw-bold"
            onClick={() => {
              if (openItem === data.label) {
                setOpenItem("");
              } else if (data.children && data.children.length > 0) {
                setOpenItem(data.label);
              }
            }}
          >
            <span>{data.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
