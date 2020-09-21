import React from 'react';
// 疑似要素を使うので特別に許可
import '../../animation/index.css';

const LoadingSpinner: React.FC = () => (
  <div className="loaderAnimation">Loading...</div>
);

export default LoadingSpinner;
