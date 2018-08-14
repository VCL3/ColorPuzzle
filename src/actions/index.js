export const MOVED_INDEX = 'MOVED_INDEX';

export function getData(movedIndex) {
  return {
    type: MOVED_INDEX,
    movedIndex
  };
}