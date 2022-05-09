import React from 'react';

import Heading from '../Atoms/Heading';
import Icon from '../Atoms/Icon';

interface Iprops {
  title: string;
  navigation: string[];
}

export default function Breadcrump({ title, navigation }: Iprops) {
  return (
    <div className="py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Heading fontWeight="bold" fontSize="xxl">
          {title}
        </Heading>
        <div className="text-right">
          <button className="rounded-circle btn py-2 btn-print bg-light-gray">
            <Icon name="print" size={20} />
          </button>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <Icon name="home" />
        {navigation.map((item, index) => (
          <React.Fragment key={index}>
            <Icon name="arrow-right" />
            <span className="text-sm">{item}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
