import { MutableRefObject } from 'react';

function findElementNode(
  parentNode: MutableRefObject<HTMLElement | null | { node: never }>,
) {
  if (!parentNode || !parentNode.current) {
    return null;
  }

  if (parentNode.current instanceof Element) {
    return parentNode.current;
  }

  return findElementNode(parentNode.current.node);
}

export default findElementNode;
