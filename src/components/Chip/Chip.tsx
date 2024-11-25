import React, { FC, HTMLProps, ReactElement } from 'react';
import classnames from 'classnames';
import IconButton from '../IconButton';
import { Avatar, Icon } from '../../index.ts';

export interface ChipProps
  extends Omit<Omit<HTMLProps<HTMLDivElement>, 'size'>, 'onClick'> {
  onDismiss?: (id: string) => void;
  disabled?: boolean;
  size?: 'lg' | '';
  ariaLabel?: string;
  onClick?: (event: React.MouseEvent) => void;
}

type ChipContent = {
  hasAvatar?: boolean;
  hasIcon?: boolean;
  hasImage?: boolean;
};

const Chip: FC<ChipProps> = (props) => {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const { onDismiss, id, onClick } = props;

    if (onDismiss) {
      onDismiss(id!);
    }

    if (onClick) {
      onClick(event);
    }
  }

  function analyzeChipContent() {
    const { children } = props;

    const chipContent: ChipContent = {};

    React.Children.forEach(children as ReactElement[], (child) => {
      if (child) {
        if (child.type === Avatar) {
          chipContent.hasAvatar = true;
        } else if (child.type === Icon) {
          chipContent.hasIcon = true;
        } else if (child.type === 'img') {
          chipContent.hasImage = true;
        }
      }
    });

    return chipContent;
  }

  const {
    className,
    children,
    size,
    onDismiss,
    id,
    tabIndex = 0,
    disabled,
    ariaLabel,
    ...rest
  } = props;

  const { hasAvatar, hasIcon, hasImage } = analyzeChipContent();

  return (
    <div
      {...rest}
      id={id}
      className={classnames('eui-chip', className, {
        [`eui-chip-${size}`]: size,
        'is-dismissible': onDismiss,
        'has-avatar': hasAvatar,
        'has-icon': hasIcon,
        'has-image': hasImage,
      })}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
    >
      {children}
      {onDismiss ? (
        <IconButton
          className="eui-chip-btn-dismiss"
          onClick={handleClick}
          ariaLabel={`Remove${ariaLabel ? ` ${ariaLabel}` : ''}`}
          tabIndex={disabled ? -1 : tabIndex}
          disabled={disabled}
          icon="cancel"
          type="button"
        />
      ) : null}
    </div>
  );
};

export default Chip;
