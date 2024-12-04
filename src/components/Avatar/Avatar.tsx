import { FC, HTMLProps } from 'react';
import classnames from 'classnames';

interface AvatarProps extends Omit<HTMLProps<HTMLDivElement>, 'size'> {
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  ariaHidden?: boolean;
}

const Avatar: FC<AvatarProps> = ({
  title = 'U',
  className,
  style,
  size = 'xs',
  ariaHidden,
  ...rest
}) => {
  const colors = [
    { background: '#007A6E', foreground: '#fff' },
    { background: '#9E6900', foreground: '#fff' },
    { background: '#C54957', foreground: '#fff' },
    { background: '#0775CF', foreground: '#fff' },
    { background: '#537A2A', foreground: '#fff' },
    { background: '#1E6FD2', foreground: '#fff' },
    { background: '#8C5725', foreground: '#fff' },
    { background: '#BF00E3', foreground: '#fff' },
    { background: '#904AC9', foreground: '#fff' },
    { background: '#247A67', foreground: '#fff' },
  ];

  function getInitials(title: string) {
    if (title.trim().length <= 2) {
      return title;
    }

    const nameParts = title.split(' ');
    const firstInitial = nameParts[0].substring(0, 1);
    const secondInitial =
      nameParts.length > 1
        ? nameParts[nameParts.length - 1].substring(0, 1)
        : '';

    return firstInitial + secondInitial;
  }

  function getColorFromInitials(initials: string) {
    const lowercaseInitials = initials.toLowerCase();
    const initialsLength = lowercaseInitials.length;
    let colorIndex = 0;

    for (let i = 0; i < initialsLength; i++) {
      let initialCode = lowercaseInitials.charCodeAt(i) - 97;

      if (initialCode < 0 || initialCode > 26) {
        initialCode = 0;
      }

      colorIndex += initialCode;
    }

    // Transform the colorIndex to a compatible color array position
    if (colorIndex > colors.length - 1) {
      colorIndex %= colors.length;
    }

    return colors[colorIndex];
  }

  const initials = getInitials(title);

  const { background, foreground } = getColorFromInitials(initials);

  const newStyle = {
    backgroundColor: background,
    color: foreground,
    ...style,
  };

  const newClassName = classnames(
    'eui-avatar',
    { [`eui-avatar-${size}`]: true },
    className,
  );

  return (
    <div {...rest} className={newClassName} style={newStyle}>
      <span aria-hidden={ariaHidden} className="eui-avatar-initials">
        {initials}
      </span>
    </div>
  );
};

export default Avatar;
