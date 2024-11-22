import { CSSProperties, FC, ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
  style?: CSSProperties;
}

export const Wrapper: FC<WrapperProps> = ({ children, style }) => {
  return <div style={{ padding: '20px', ...style }}>{children}</div>;
};
