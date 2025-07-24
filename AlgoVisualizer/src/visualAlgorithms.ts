// Step-yielding (generator) version of Bubble Sort for visualization
// Yields: { array: number[], comparing: [number, number], swapped: boolean }

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

export function* mergeSortSteps(input: number[]): Generator<MergeSortStep> {
  const arr = input.slice();
  const n = arr.length;
  const sortedIndices: number[] = [];
  function* mergeSortHelper(left: number, right: number): Generator<MergeSortStep> {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      yield* mergeSortHelper(left, mid);
      yield* mergeSortHelper(mid + 1, right);
      yield* merge(left, mid, right);
    }
  }
  function* merge(left: number, mid: number, right: number): Generator<MergeSortStep> {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length) {
      yield { array: arr.slice(), merging: [k, right], left, right, sortedIndices: sortedIndices.slice() };
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      k++;
    }
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++; k++;
      yield { array: arr.slice(), merging: [k - 1, right], left, right, sortedIndices: sortedIndices.slice() };
    }
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++; k++;
      yield { array: arr.slice(), merging: [k - 1, right], left, right, sortedIndices: sortedIndices.slice() };
    }
  }
  yield* mergeSortHelper(0, n - 1);
  yield { array: arr.slice(), merging: null, left: 0, right: n - 1, sortedIndices: Array.from({ length: n }, (_, i) => i) };
}

// --- Quick Sort Step Generator ---
export interface QuickSortStep {
  array: number[];
  comparing: [number, number] | null;
  pivot: number | null;
  sortedIndices: number[];
  swapped: boolean;
}

export function* quickSortSteps(input: number[]): Generator<QuickSortStep> {
  const arr = input.slice();
  const n = arr.length;
  const sortedIndices: number[] = [];
  function* quickSortHelper(low: number, high: number): Generator<QuickSortStep> {
    if (low < high) {
      const pi = yield* partition(low, high);
      yield* quickSortHelper(low, pi - 1);
      yield* quickSortHelper(pi + 1, high);
    }
  }
  function* partition(low: number, high: number): Generator<any, number, any> {
    const pivotValue = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      yield { array: arr.slice(), comparing: [j, high], pivot: high, sortedIndices: sortedIndices.slice(), swapped: false };
      if (arr[j] < pivotValue) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          yield { array: arr.slice(), comparing: [i, j], pivot: high, sortedIndices: sortedIndices.slice(), swapped: true };
        }
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    yield { array: arr.slice(), comparing: [i + 1, high], pivot: high, sortedIndices: sortedIndices.slice(), swapped: true };
    return i + 1;
  }
  yield* quickSortHelper(0, n - 1);
  yield { array: arr.slice(), comparing: null, pivot: null, sortedIndices: Array.from({ length: n }, (_, i) => i), swapped: false };
}

// --- Heap Sort Step Generator ---
export interface HeapSortStep {
  array: number[];
  comparing: [number, number] | null;
  sortedIndices: number[];
  swapped: boolean;
}

export function* heapSortSteps(input: number[]): Generator<HeapSortStep> {
  const arr = input.slice();
  const n = arr.length;
  const sortedIndices: number[] = [];
  function* heapify(n: number, i: number): Generator<HeapSortStep> {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n) {
      yield { array: arr.slice(), comparing: [largest, left], sortedIndices: sortedIndices.slice(), swapped: false };
      if (arr[left] > arr[largest]) largest = left;
    }
    if (right < n) {
      yield { array: arr.slice(), comparing: [largest, right], sortedIndices: sortedIndices.slice(), swapped: false };
      if (arr[right] > arr[largest]) largest = right;
    }
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      yield { array: arr.slice(), comparing: [i, largest], sortedIndices: sortedIndices.slice(), swapped: true };
      yield* heapify(n, largest);
    }
  }
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    sortedIndices.unshift(i);
    yield { array: arr.slice(), comparing: [0, i], sortedIndices: sortedIndices.slice(), swapped: true };
    yield* heapify(i, 0);
  }
  yield { array: arr.slice(), comparing: null, sortedIndices: Array.from({ length: n }, (_, i) => i), swapped: false };
}

// --- Gnome Sort Step Generator ---
export interface GnomeSortStep {
  array: number[];
  comparing: [number, number] | null;
  sortedIndices: number[];
  swapped: boolean;
}

export function* gnomeSortSteps(input: number[]): Generator<GnomeSortStep> {
  const arr = input.slice();
  const n = arr.length;
  let i = 0;
  while (i < n) {
    if (i === 0 || arr[i] >= arr[i - 1]) {
      i++;
    } else {
      [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
      yield { array: arr.slice(), comparing: [i, i - 1], sortedIndices: [], swapped: true };
      i--;
    }
  }
  yield { array: arr.slice(), comparing: null, sortedIndices: Array.from({ length: n }, (_, i) => i), swapped: false };
}

// --- Pancake Sort Step Generator ---
export interface PancakeSortStep {
  array: number[];
  flipping: [number, number] | null;
  sortedIndices: number[];
}

export function* pancakeSortSteps(input: number[]): Generator<PancakeSortStep> {
  const arr = input.slice();
  const n = arr.length;
  let numSorted = 0;
  function flip(end: number) {
    let start = 0;
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  }
  for (let currSize = n; currSize > 1; currSize--) {
    let mi = 0;
    for (let i = 0; i < currSize; i++) if (arr[i] > arr[mi]) mi = i;
    if (mi !== currSize - 1) {
      flip(mi);
      yield { array: arr.slice(), flipping: [0, mi], sortedIndices: Array.from({ length: numSorted }, (_, i) => n - 1 - i) };
      flip(currSize - 1);
      yield { array: arr.slice(), flipping: [0, currSize - 1], sortedIndices: Array.from({ length: numSorted }, (_, i) => n - 1 - i) };
    }
    numSorted++;
  }
  yield { array: arr.slice(), flipping: null, sortedIndices: Array.from({ length: n }, (_, i) => i) };
}

// --- Comb Sort Step Generator ---
export interface CombSortStep {
  array: number[];
  comparing: [number, number] | null;
  sortedIndices: number[];
  swapped: boolean;
}

export function* combSortSteps(input: number[]): Generator<CombSortStep> {
  const arr = input.slice();
  const n = arr.length;
  let gap = n;
  const shrink = 1.3;
  let sorted = false;
  while (!sorted) {
    gap = Math.floor(gap / shrink);
    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }
    for (let i = 0; i + gap < n; i++) {
      yield { array: arr.slice(), comparing: [i, i + gap], sortedIndices: [], swapped: false };
      if (arr[i] > arr[i + gap]) {
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
        sorted = false;
        yield { array: arr.slice(), comparing: [i, i + gap], sortedIndices: [], swapped: true };
      }
    }
  }
  yield { array: arr.slice(), comparing: null, sortedIndices: Array.from({ length: n }, (_, i) => i), swapped: false };
}

// --- Odd-Even Sort Step Generator ---
export interface OddEvenSortStep {
  array: number[];
  comparing: [number, number] | null;
  sortedIndices: number[];
  swapped: boolean;
}

export function* oddEvenSortSteps(input: number[]): Generator<OddEvenSortStep> {
  const arr = input.slice();
  const n = arr.length;
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 1; i < n - 1; i += 2) {
      yield { array: arr.slice(), comparing: [i, i + 1], sortedIndices: [], swapped: false };
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
        yield { array: arr.slice(), comparing: [i, i + 1], sortedIndices: [], swapped: true };
      }
    }
    for (let i = 0; i < n - 1; i += 2) {
      yield { array: arr.slice(), comparing: [i, i + 1], sortedIndices: [], swapped: false };
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
        yield { array: arr.slice(), comparing: [i, i + 1], sortedIndices: [], swapped: true };
      }
    }
  }
  yield { array: arr.slice(), comparing: null, sortedIndices: Array.from({ length: n }, (_, i) => i), swapped: false };
}

// --- Shell Sort Step Generator ---
export interface ShellSortStep {
  array: number[];
  comparing: [number, number] | null;
  sortedIndices: number[];
  swapped: boolean;
}

export function* shellSortSteps(input: number[]): Generator<ShellSortStep> {
  const arr = input.slice();
  const n = arr.length;
  let gap = Math.floor(n / 2);
  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      let temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        yield { array: arr.slice(), comparing: [j, j - gap], sortedIndices: [], swapped: true };
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
      yield { array: arr.slice(), comparing: [j, i], sortedIndices: [], swapped: false };
    }
    gap = Math.floor(gap / 2);
  }
  yield { array: arr.slice(), comparing: null, sortedIndices: Array.from({ length: n }, (_, i) => i), swapped: false };
}

// --- Bitonic Sort Step Generator ---
export interface BitonicSortStep {
  array: number[];
  comparing: [number, number] | null;
  sortedIndices: number[];
  swapped: boolean;
}

export function* bitonicSortSteps(input: number[]): Generator<BitonicSortStep> {
  const arr = input.slice();
  const n = arr.length;
  function* bitonicMerge(low: number, cnt: number, dir: boolean): Generator<BitonicSortStep> {
    if (cnt > 1) {
      const k = Math.floor(cnt / 2);
      for (let i = low; i < low + k; i++) {
        yield { array: arr.slice(), comparing: [i, i + k], sortedIndices: [], swapped: false };
        if (dir === (arr[i] > arr[i + k])) {
          [arr[i], arr[i + k]] = [arr[i + k], arr[i]];
          yield { array: arr.slice(), comparing: [i, i + k], sortedIndices: [], swapped: true };
        }
      }
      yield* bitonicMerge(low, k, dir);
      yield* bitonicMerge(low + k, k, dir);
    }
  }
  function* bitonicSortHelper(low: number, cnt: number, dir: boolean): Generator<BitonicSortStep> {
    if (cnt > 1) {
      const k = Math.floor(cnt / 2);
      yield* bitonicSortHelper(low, k, true);
      yield* bitonicSortHelper(low + k, k, false);
      yield* bitonicMerge(low, cnt, dir);
    }
  }
  yield* bitonicSortHelper(0, n, true);
  yield { array: arr.slice(), comparing: null, sortedIndices: Array.from({ length: n }, (_, i) => i), swapped: false };
}
