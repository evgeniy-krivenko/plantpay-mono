import { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const PortalInner: FC = ({ children }) => {
  const [container, setContainer] = useState<HTMLDivElement>();

  useEffect(() => {
    setContainer(document.createElement('div'));
  }, []);

  useEffect(() => {
    container && document.body.appendChild(container);
    return (): void => {
      container && document.body.removeChild(container);
    };
  }, [container]);

  if (!container) {
    return null;
  }

  return ReactDOM.createPortal(children, container);
};

const Portal: FC = ({ children }) => {
  if (typeof window === 'undefined') {
    return null;
  }
  return <PortalInner>{children}</PortalInner>;
};

export default Portal;
