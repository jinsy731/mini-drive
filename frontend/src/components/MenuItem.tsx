// src/components/MenuItem.tsx

import React from 'react';
import './MenuItem.css';

interface MenuItemProps {
  title: string;
  subtitle?: string; // subtitle은 선택적 프로퍼티입니다
}

const MenuItem: React.FC<MenuItemProps> = ({ title, subtitle }) => {
  return (
    <div className="menu-item">
      <div className="icon-placeholder"></div>
      <div className="menu-text">
        <div className="title">{title}</div>
        {subtitle && <div className="subtitle">{subtitle}</div>}
      </div>
    </div>
  );
};

export default MenuItem;
