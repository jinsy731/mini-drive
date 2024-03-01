import React from 'react';
import './App.css';

// 각 섹션의 props 타입을 정의합니다.
interface ISectionProps {
  title: string;
  iconName: string;
  notifications?: number;
  isBottom?: boolean;
}

// 섹션 컴포넌트
const Section: React.FC<ISectionProps> = ({ title, iconName, notifications, isBottom }) => {
  let iconClass = 'section-icon';
  if (notifications) {
    iconClass += ' section-icon--notified';
  }
  if (isBottom) {
    iconClass += ' section-icon--bottom';
  }
  return (
    <div className="section">
      <i className={iconClass}>{iconName}</i>
      <span className="section-title">{title}</span>
      {notifications && <span className="section-notifications">{notifications}</span>}
    </div>
  );
};

// 앱 컴포넌트
const App: React.FC = () => {
  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Files</h1>
        <i className="search-icon">🔍</i>
      </div>
      <div className="sections">
        <Section title="My Drive" iconName="📁" />
        <Section title="Projects" iconName="📁" />
        <Section title="Shared with me" iconName="📁" />
        <Section title="Storage" iconName="☁️" notifications={10} />
        <Section title="Your plan: Google One" iconName="✔️" isBottom />
      </div>
      <div className="app-footer">
        <i className="footer-icon home-icon">🏠</i>
        <i className="footer-icon starred-icon">⭐</i>
        <i className="footer-icon chat-icon">💬</i>
      </div>
    </div>
  );
}

export default App;
