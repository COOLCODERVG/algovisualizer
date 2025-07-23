export type NumArray = number[];

// Bubble Sort
export function bubbleSort(arr: NumArray): NumArray {
  const a = arr.slice();
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  return a;
}

// Selection Sort
export function selectionSort(arr: NumArray): NumArray {
  const a = arr.slice();
  for (let i = 0; i < a.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) [a[i], a[minIdx]] = [a[minIdx], a[i]];
  }
  return a;
}

// Insertion Sort
export function insertionSort(arr: NumArray): NumArray {
  const a = arr.slice();
  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = key;
  }
  return a;
}

// Merge Sort
export function mergeSort(arr: NumArray): NumArray {
  if (arr.length <= 1) return arr.slice();
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
  function merge(l: NumArray, r: NumArray): NumArray {
    const result: NumArray = [];
    let i = 0, j = 0;
    while (i < l.length && j < r.length) {
      if (l[i] < r[j]) result.push(l[i++]);
      else result.push(r[j++]);
    }
    return result.concat(l.slice(i)).concat(r.slice(j));
  }
}

// Quick Sort
export function quickSort(arr: NumArray): NumArray {
  if (arr.length <= 1) return arr.slice();
  const a = arr.slice();
  const pivot = a[a.length - 1];
  const left = a.filter((v, i) => v < pivot && i !== a.length - 1);
  const right = a.filter((v, i) => v >= pivot && i !== a.length - 1);
  return quickSort(left).concat([pivot], quickSort(right));
}

// Heap Sort
export function heapSort(arr: NumArray): NumArray {
  const a = arr.slice();
  const n = a.length;
  function heapify(n: number, i: number) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < n && a[l] > a[largest]) largest = l;
    if (r < n && a[r] > a[largest]) largest = r;
    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      heapify(n, largest);
    }
  }
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    heapify(i, 0);
  }
  return a;
}

// Gnome Sort
export function gnomeSort(arr: NumArray): NumArray {
  const a = arr.slice();
  let i = 0;
  while (i < a.length) {
    if (i === 0 || a[i] >= a[i - 1]) i++;
    else {
      [a[i], a[i - 1]] = [a[i - 1], a[i]];
      i--;
    }
  }
  return a;
}

// Pancake Sort
export function pancakeSort(arr: NumArray): NumArray {
  const a = arr.slice();
  function flip(end: number) {
    let start = 0;
    while (start < end) {
      [a[start], a[end]] = [a[end], a[start]];
      start++;
      end--;
    }
  }
  for (let currSize = a.length; currSize > 1; currSize--) {
    let mi = 0;
    for (let i = 0; i < currSize; i++) if (a[i] > a[mi]) mi = i;
    if (mi !== currSize - 1) {
      flip(mi);
      flip(currSize - 1);
    }
  }
  return a;
}
