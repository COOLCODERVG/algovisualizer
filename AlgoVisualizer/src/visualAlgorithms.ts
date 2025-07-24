export interface BubbleSortStep {
  array: number[];
  comparing: [number, number] | null;
  swapped: boolean;
  sortedIndices: number[];
}

export function* bubbleSortSteps(input: number[]): Generator<BubbleSortStep> {
  const arr = input.slice();
  const n = arr.length;
  let sortedIndices: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      yield { array: arr.slice(), comparing: [j, j + 1], swapped: false, sortedIndices: sortedIndices.slice() };
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        yield { array: arr.slice(), comparing: [j, j + 1], swapped: true, sortedIndices: sortedIndices.slice() };
      }
    }
    sortedIndices.unshift(n - 1 - i);
    yield { array: arr.slice(), comparing: null, swapped: false, sortedIndices: sortedIndices.slice() };
    if (!swapped) break;
  }
  // Mark all as sorted at the end
  yield { array: arr.slice(), comparing: null, swapped: false, sortedIndices: Array.from({ length: n }, (_, i) => i) };
}

// --- Selection Sort Step Generator ---
export interface SelectionSortStep {
  array: number[];
  comparing: [number, number] | null;
  minIndex: number | null;
  sortedIndices: number[];
  swapped: boolean;
}

export function* selectionSortSteps(input: number[]): Generator<SelectionSortStep> {
  const arr = input.slice();
  const n = arr.length;
  let sortedIndices: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { array: arr.slice(), comparing: [minIdx, j], minIndex: minIdx, sortedIndices: sortedIndices.slice(), swapped: false };
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        yield { array: arr.slice(), comparing: [minIdx, j], minIndex: minIdx, sortedIndices: sortedIndices.slice(), swapped: false };
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield { array: arr.slice(), comparing: [i, minIdx], minIndex: minIdx, sortedIndices: sortedIndices.slice(), swapped: true };
    }
    sortedIndices.push(i);
    yield { array: arr.slice(), comparing: null, minIndex: null, sortedIndices: sortedIndices.slice(), swapped: false };
  }
  yield { array: arr.slice(), comparing: null, minIndex: null, sortedIndices: Array.from({ length: n }, (_, i) => i), swapped: false };
}

// --- Insertion Sort Step Generator ---
export interface InsertionSortStep {
  array: number[];
  comparing: [number, number] | null;
  sortedIndices: number[];
  swapped: boolean;
}

export function* insertionSortSteps(input: number[]): Generator<InsertionSortStep> {
  const arr = input.slice();
  const n = arr.length;
  let sortedIndices: number[] = [];
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      yield { array: arr.slice(), comparing: [j, j + 1], sortedIndices: sortedIndices.slice(), swapped: true };
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
    sortedIndices = Array.from({ length: i + 1 }, (_, k) => k);
    yield { array: arr.slice(), comparing: null, sortedIndices: sortedIndices.slice(), swapped: false };
  }
  yield { array: arr.slice(), comparing: null, sortedIndices: Array.from({ length: n }, (_, i) => i), swapped: false };
}

// --- Linear Search Step Generator ---
export interface LinearSearchStep {
  array: number[];
  current: number;
  found: number | null;
  target: number;
  path: number[];
}

export function* linearSearchSteps(input: number[], target: number): Generator<LinearSearchStep> {
  const arr = input.slice();
  const path: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    path.push(i);
    if (arr[i] === target) {
      yield { array: arr.slice(), current: i, found: i, target, path: path.slice() };
      return;
    } else {
      yield { array: arr.slice(), current: i, found: null, target, path: path.slice() };
    }
  }
  yield { array: arr.slice(), current: -1, found: null, target, path: path.slice() };
}

// --- Binary Search Step Generator ---
export interface BinarySearchStep {
  array: number[];
  left: number;
  right: number;
  mid: number;
  found: number | null;
  target: number;
  path: number[];
}

export function* binarySearchSteps(input: number[], target: number): Generator<BinarySearchStep> {
  const arr = input.slice().sort((a, b) => a - b);
  let left = 0, right = arr.length - 1;
  const path: number[] = [];
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    path.push(mid);
    if (arr[mid] === target) {
      yield { array: arr.slice(), left, right, mid, found: mid, target, path: path.slice() };
      return;
    }
    yield { array: arr.slice(), left, right, mid, found: null, target, path: path.slice() };
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  yield { array: arr.slice(), left, right, mid: -1, found: null, target, path: path.slice() };
} 

// --- Merge Sort Step Generator ---
export interface MergeSortStep {
  array: number[];
  merging: [number, number] | null;
  left: number;
  right: number;
  sortedIndices: number[];
}