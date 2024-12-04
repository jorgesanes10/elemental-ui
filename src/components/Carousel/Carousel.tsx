import React, {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  DetailedHTMLProps,
  FC,
  HTMLProps,
  MutableRefObject,
  ReactElement,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import FloatingActionButton from '../FloatingActionButton';
import Panel from '../Panel';
import findElementNode from '../../utils/findElementNode';
import { FloatingActionButtonProps } from '../FloatingActionButton/FloatingActionButton';

type Slide = {
  id: string;
  position: number;
};

type Direction = 'next' | 'prev';

interface CarouselProps extends HTMLProps<HTMLDivElement> {
  slidingInterval?: number;
  innerMargin?: number;
  noFadingSides?: boolean;
  onSlide?: (slideId: string) => void;
  theme?: 'default' | 'modern';
  previousButtonProps?: FloatingActionButtonProps;
  nextButtonProps?: FloatingActionButtonProps;
  children: ReactElement | ReactElement[];
}

const Carousel: FC<CarouselProps> = (props) => {
  const children =
    props.children instanceof Array ? props.children : [props.children];

  const [slidesWidth, setSlidesWidthState] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [indicators, setIndicators] = useState<
    Omit<
      DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >,
      'ref'
    >[]
  >([]);
  const [initialTapPosition, setInitialTapPosition] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [sliding, setSliding] = useState(false);
  const [interval, setIntervalState] = useState<number | undefined>(undefined);

  const currentSlideNode: MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const slidesContainerNode: MutableRefObject<HTMLDivElement | null> =
    useRef(null);

  useLayoutEffect(() => {
    setSlidesWidth();

    currentSlideNode.current = findElementNode(
      currentSlideNode,
    ) as HTMLDivElement;
    slidesContainerNode.current = findElementNode(
      slidesContainerNode,
    ) as HTMLDivElement;
  }, []);

  useEffect(() => {
    generateIndicators(0);
    storeSlides();

    window.addEventListener('resize', setSlidesWidth);

    return () => {
      window.removeEventListener('resize', setSlidesWidth);
    };
  }, []);

  useEffect(() => {
    if (children.length > 1) {
      storeSlides();
      generateIndicators(currentSlide);
    }
  }, [children]);

  useEffect(() => {
    slideAutomatically();
  }, [props.slidingInterval, slides, currentSlide]);

  const storeSlides = () => {
    if (!children) {
      return false;
    }

    const slides = children.map(
      (child, index): Slide => ({
        id: child.props.id,
        position: index,
      }),
    );

    setSlides(slides);
  };

  const setSlidesWidth = () => {
    const width = Math.floor(
      findElementNode(currentSlideNode)!.getBoundingClientRect().width,
    );

    setSlidesWidthState(width);
  };

  const populateSlides = () => {
    const { innerMargin = 0 } = props;

    if (!children) {
      return null;
    }

    const displaySlides = [];
    const SLIDES_LENGTH = children.length;

    if (SLIDES_LENGTH === 1) {
      return getFormattedSlide(
        0,
        innerMargin,
        React.cloneElement(children[0], {
          ref: currentSlideNode,
          key: `current`,
          id: `${children[0].props.id}-${0}`,
        }),
      );
    }

    for (let i = currentSlide - 2; i <= currentSlide + 2; i++) {
      if (children[i]) {
        const newId = `${children[i].props.id}-${i}`;

        if (i === currentSlide) {
          displaySlides.push(
            getFormattedSlide(
              i,
              innerMargin,
              React.cloneElement(children[i], {
                ref: currentSlideNode,
                key: `current`,
                id: newId,
              }),
            ),
          );
        } else {
          displaySlides.push(
            getFormattedSlide(
              i,
              innerMargin,
              React.cloneElement(children[i], {
                id: newId,
              }),
            ),
          );
        }
      } else if (i >= SLIDES_LENGTH) {
        displaySlides.push(
          getFormattedSlide(i, innerMargin, children[i - SLIDES_LENGTH]),
        );
      } else {
        displaySlides.push(
          getFormattedSlide(i, innerMargin, children[SLIDES_LENGTH + i]),
        );
      }
    }

    return displaySlides;
  };

  const generateIndicators = (currentSlide: number) => {
    if (!children || children.length === 1) {
      return;
    }

    const indicators = children.map(
      (_, index): ComponentPropsWithoutRef<'button'> => {
        return (
          <button
            key={`indicator-${index}`}
            onClick={handleIndicatorClick.bind(null, index)}
            aria-label={`show slide number ${index + 1}`}
          >
            <div
              className={classnames('indicator', {
                active: index === currentSlide,
              })}
            />
          </button>
        );
      },
    );

    setIndicators(indicators);
  };

  const getSlide = (position: number, direction?: Direction) => {
    const curSlide = slides.find((slide) => slide.position === position);

    if (curSlide) {
      return curSlide;
    }

    if (direction === 'next') {
      return slides[0];
    }

    return slides[slides.length - 1];
  };

  const getFormattedSlide = (
    position: number,
    innerMargin: number,
    children: ReactElement | ReactElement[],
  ) => {
    return (
      <div key={`slide-${position}`} style={{ margin: innerMargin }}>
        {children}
      </div>
    );
  };

  const goToSlide = (slide: number) => {
    const { onSlide } = props;

    if (!sliding) {
      setSliding(true);

      slidesContainerNode.current!.style.transition = `all ${300}ms ease-out`;
      slidesContainerNode.current!.style.transform = `scale(0.95)`;
      slidesContainerNode.current!.style.opacity = `0`;

      generateIndicators(slide);

      setTimeout(() => {
        if (onSlide) {
          onSlide(getSlide(slide).id);
        }

        slidesContainerNode.current!.style.transform = `scale(1)`;
        slidesContainerNode.current!.style.opacity = `1`;

        setCurrentSlide(slide);
        setSliding(false);
      }, 300);
    }
  };

  const goToNextSlide = (delayTime = 300) => {
    const { innerMargin = 0, onSlide } = props;

    if (!sliding) {
      setSliding(true);
      slidesContainerNode.current!.style.transition = `transform ${delayTime}ms ease-out`;
      slidesContainerNode.current!.style.transform = `translateX(-${slidesWidth + innerMargin * 2}px)`;

      generateIndicators(getSlide(currentSlide + 1, 'next').position);

      setTimeout(() => {
        setCurrentSlide((curSlide) => {
          const { id, position } = getSlide(curSlide + 1, 'next');

          if (onSlide) {
            onSlide(id);
          }

          slidesContainerNode.current!.style.transition = 'none';
          slidesContainerNode.current!.style.transform = `translateX(0)`;

          return position;
        });

        setSliding(false);
      }, delayTime);
    }
  };

  const goToPreviousSlide = (delayTime = 300) => {
    const { innerMargin = 0, onSlide } = props;

    if (!sliding) {
      setSliding(true);
      slidesContainerNode.current!.style.transition = `transform ${delayTime}ms ease-out`;
      slidesContainerNode.current!.style.transform = `translateX(${slidesWidth + innerMargin * 2}px)`;

      generateIndicators(getSlide(currentSlide - 1, 'prev').position);

      setTimeout(() => {
        setCurrentSlide((curSlide) => {
          const { id, position } = getSlide(curSlide - 1, 'prev');

          if (onSlide) {
            onSlide(id);
          }

          slidesContainerNode.current!.style.transition = 'none';
          slidesContainerNode.current!.style.transform = `translateX(0)`;

          return position;
        });

        setSliding(false);
      }, delayTime);
    }
  };

  const slideAutomatically = () => {
    const { slidingInterval = 0 } = props;

    if (
      slidingInterval !== null &&
      slidingInterval !== undefined &&
      slides.length > 0
    ) {
      clearInterval(interval);

      if (slidingInterval > 0) {
        setIntervalState(
          setInterval(() => {
            goToNextSlide();
          }, slidingInterval),
        );
      }
    }
  };

  const handleIndicatorClick = (index: number) => {
    goToSlide(index);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    setInitialTapPosition(event.touches[0].clientX);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const newPoint = event.changedTouches[0].clientX;
    const DELAY = 200;
    const POSITION_ADJUSTMENT = 100;

    if (!sliding) {
      if (newPoint > initialTapPosition + POSITION_ADJUSTMENT) {
        goToPreviousSlide(DELAY);
      } else if (newPoint < initialTapPosition - POSITION_ADJUSTMENT) {
        goToNextSlide(DELAY);
      } else {
        slidesContainerNode.current!.style.transition =
          'transform 200 ms ease-out';
        slidesContainerNode.current!.style.transform = `translateX(0)`;
      }
    }
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const newPoint = event.touches[0].clientX;
    if (!sliding) {
      slidesContainerNode.current!.style.transform = `translateX(${newPoint - initialTapPosition}px)`;
    }
  };

  const {
    className,
    noFadingSides,
    theme = 'default',
    previousButtonProps,
    nextButtonProps,
    ...rest
  } = props;

  delete rest.innerMargin;
  delete rest.slidingInterval;
  delete rest.onSlide;

  const carouselClass = classnames(
    'eui-carousel',
    {
      [`eui-carousel-${theme}`]: theme,
    },
    className,
  );

  const slidesContainer = (
    <div
      className="slides-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={slidesContainerNode}
    >
      {populateSlides()}
    </div>
  );

  return (
    <div {...rest} className={carouselClass}>
      {children && children.length > 1 ? (
        <React.Fragment>
          <div
            className="left-button-bg"
            style={{ background: noFadingSides ? 'transparent' : 'auto' }}
          >
            <FloatingActionButton
              ariaLabel="Show previous slide"
              icon="chevron_left"
              className="left-button"
              color="default"
              onClick={() => goToPreviousSlide()}
              {...previousButtonProps}
            />
          </div>
          <div
            className="right-button-bg"
            style={{ background: noFadingSides ? 'transparent' : 'auto' }}
          >
            <FloatingActionButton
              ariaLabel="Show next slide"
              icon="chevron_right"
              className="right-button"
              color="default"
              onClick={() => {
                goToNextSlide();
              }}
              {...nextButtonProps}
            />
          </div>
        </React.Fragment>
      ) : null}
      {theme === 'modern' ? (
        <Panel className="slides-container-panel">{slidesContainer}</Panel>
      ) : (
        slidesContainer
      )}
      <div className="indicators-container">
        {indicators as unknown as ReactNode[]}
      </div>
    </div>
  );
};

export default Carousel;
