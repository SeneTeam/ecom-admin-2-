import '../../../styles/components/Atoms/Form/Checkbox.scss';

import React from 'react';

export default function Checkbox() {
  return (
    <div className="custom-control custom-checkbox">
      {/* <input type="checkbox" className="custom-control-input" id="remember-me"/>
            <label className="custom-control-label"
                for="remember-me">Remember me</label> */}

      <label className="customcheck">
        <span className="label">Prisiminti</span>
        <input type="checkbox" />
        <span className="checkmark"></span>
      </label>
    </div>
  );
}
