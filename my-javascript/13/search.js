const DOES_NOT_EXIST = -1;

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0,
};

function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function defaultEquals(a, b) {
  return a === b;
}
function sequentialSearch(array, value, equalsFn = defaultEquals) {
  for (let i = 0; i < array.length; i++) {
    if (equalsFn(value, array[i])) {
      return i;
    }
  }
  return DOES_NOT_EXIST;
}

function binarySearch(array, value, compareFn = defaultEquals) {
  const sortedArray = quickSort(array);
  let low = 0;
  let high = sortedArray.length - 1;
  while (lessOrEquals(low, high, compareFn)) {
    const mid = Math.floor(low + high);
    const element = sortedArray[mid];
    if (compareFn(element, value) === Compare.LESS_THAN) {
      low = mid + 1;
    } else if (compareFn(element, value) === Compare.LESS_THAN) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
}
function lesserOrEquals(a, b, compareFn) {
  const comp = compareFn(a, b);
  return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}

function quickSort(array, compareFn = defaultCompare) {
  return quickSort(array, 0, array.length - 1, compareFn);
}

function quick(array, left, right, compareFn) {
  let index;
  if (array.length > 1) {
    index = partition(array, left, right, compareFn);
  }
  if (left < index - 1) {
    quick(array, left, index - 1, compareFn);
  }
  if (index < right) {
    quick(array, index, right, compareFn);
  }
  return array;
}
function defaultDiff(a, b) {
  return Number(a) - Number(b);
}

function interpolationSearch(
  array,
  value,
  compareFn = defaultCompare,
  equalFn = defaultEquals,
  diffFn = defaultDiff
) {
  const { length } = array;
  let low = 0;
  let high = length - 1;
  let position = -1;
  let delta = -1;
  while (
    low < high &&
    biggerOrEqual(value, array[low], compareFn) &&
    lesserOrEquals(value, array[high], compareFn)
  ) {
    //按照公式寻找，这个算法在数组中的值都是均匀分布时性能最好（ delta 会非常小）
    delta = diffFn(value, array[low]) / diffFn(array[high], array[low]);
    position = low + Math.floor((high - low) * delta);
    if (equalFn(array[position], value)) {
      return position;
    }
    if (compareFn(array[position], value) === Compare.LESS_THAN) {
      low = position + 1;
    } else {
      high = position - 1;
    }
  }
  return DOES_NOT_EXIST;
}

function biggerOrEquals(a, b, compareFn) {
  const comp = compareFn(a, b);
  return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
}

function swap(array, a, b) {
  /* const temp = array[a];
    array[a] = array[b];
    array[b] = temp; */
  [array[a], array[b]] = [array[b], array[a]];
}
//随机算法
function shuffle(array) {
  for (let i = array.length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
  }
  return array;
}
