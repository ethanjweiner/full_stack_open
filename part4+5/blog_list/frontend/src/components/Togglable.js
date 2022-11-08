import { forwardRef, useImperativeHandle, useState } from 'react';

const Togglable = forwardRef((props, refs) => {
  const { children, buttonName } = props;

  const [isVisible, setVisible] = useState(false);

  useImperativeHandle(refs, () => ({
    setVisible,
  }));

  if (isVisible) {
    return (
      <div>
        {children}
        <button onClick={() => setVisible(false)}>cancel</button>
      </div>
    );
  }
  return <button onClick={() => setVisible(true)}>{buttonName}</button>;
});

export default Togglable;
