import { useState, useEffect, HTMLProps, FC } from 'react';
import classnames from 'classnames';

interface AnimationProps extends HTMLProps<HTMLDivElement> {
  effect?:
    | 'slideFromBottom'
    | 'slideFromTop'
    | 'slideFromLeft'
    | 'slideFromRight'
    | 'pop';
  timeout?: number;
  unmount?: boolean;
}

const Animation: FC<AnimationProps> = ({
  children,
  unmount,
  timeout = 300,
  effect = 'slideFromBottom',
  ...rest
}) => {
  const [mounting, setMounting] = useState(false);
  const [unmountState, setUnmountState] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounting(true);
    });
  }, []);

  useEffect(() => {
    if (unmount) {
      setMounting(false);

      setTimeout(() => {
        setUnmountState(true);
      }, timeout);
    }
  }, [unmount]);

  if (unmountState) {
    return null;
  }

  return (
    <div
      {...rest}
      className={classnames('eui-animation', {
        mounting,
        [`eui-animation-${effect}`]: effect,
      })}
      style={{ transitionDuration: `${timeout}ms` }}
    >
      {children}
    </div>
  );
};

export default Animation;
