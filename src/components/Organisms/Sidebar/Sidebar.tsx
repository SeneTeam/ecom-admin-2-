import "../../../styles/components/Organisms/Sidebar.scss";

import React, { useState } from "react";

import ListItem from "../../Molecules/Sidebar/ListItem";
import useAuthenticator from "../../../hooks/useAuthenticator";
import { IRole } from "../../../types/services/user.types";
import {
  containsAll,
  getPriorityRole,
  getRoleSidebar,
} from "../../../utils/utility";
import { ISidebar } from "../../../types/services/sidebar.types";

export default function Sidebar() {
  const { user } = useAuthenticator();
  const [resolved, setResolved] = useState(false);
  let sidebarItems: ISidebar[] = [];
  if (user) {
    const role: IRole = getPriorityRole(user.currentUserRoles);
    console.log(role);
    sidebarItems = getRoleSidebar(role);
    console.log("", sidebarItems);
    //    setResolved(true);
  }

  return (
    <React.Fragment>
      {user && sidebarItems.length > 0 ? (
        <div className={"container bg-sidebar p-0"}>
          <div className="sidebar-header d-flex">
            <img
              src={"/assets/images/sass-logo-black.png"}
              width={185}
              alt="Logo"
            />
          </div>
          <div className="sidebar-list-items border">
            {sidebarItems.map((item) => (
              <ListItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}
