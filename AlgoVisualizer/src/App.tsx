import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
import {
  bubbleSortSteps, BubbleSortStep,
  selectionSortSteps, SelectionSortStep,
  insertionSortSteps, InsertionSortStep,
  mergeSortSteps, MergeSortStep,
  quickSortSteps, QuickSortStep,
  heapSortSteps, HeapSortStep,
  gnomeSortSteps, GnomeSortStep,
  pancakeSortSteps, PancakeSortStep,
  combSortSteps, CombSortStep,
  oddEvenSortSteps, OddEvenSortStep,
  shellSortSteps, ShellSortStep,
  bitonicSortSteps, BitonicSortStep,
  bogoSortSteps, BogoSortStep,
  radixSortSteps, RadixSortStep,
  decideSortSteps, DecideSortStep,
  saltShakerSortSteps, SaltShakerSortStep,
  linearSearchSteps, LinearSearchStep,
  binarySearchSteps, BinarySearchStep,
  jumpSearchSteps, JumpSearchStep,
  interpolationSearchSteps, InterpolationSearchStep,
  exponentialSearchSteps, ExponentialSearchStep,
  fibonacciSearchSteps, FibonacciSearchStep
} from './visualAlgorithms';

// Add a type for Bar
interface Bar {
  id: number;
  value: number;
}

// Algorithm options
const sortingAlgorithms = [
  { value: 'bubble', label: 'Bubble Sort' },
  { value: 'selection', label: 'Selection Sort' },
  { value: 'insertion', label: 'Insertion Sort' },
  { value: 'merge', label: 'Merge Sort' },
  { value: 'quick', label: 'Quick Sort' },
  { value: 'heap', label: 'Heap Sort' },
  { value: 'gnome', label: 'Gnome Sort' },
  { value: 'pancake', label: 'Pancake Sort' },
  { value: 'comb', label: 'Comb Sort' },
  { value: 'oddEven', label: 'Odd-Even Sort' },
  { value: 'shell', label: 'Shell Sort' },
  { value: 'bitonic', label: 'Bitonic Sort' },
  { value: 'bogo', label: 'Bogo Sort' },
  { value: 'radix', label: 'Radix Sort' },
  { value: 'decide', label: 'Decide Sort' },
  { value: 'saltShaker', label: 'Salt Shaker Sort' },
];
const searchingAlgorithms = [
  { value: 'linear', label: 'Linear Search' },
  { value: 'binary', label: 'Binary Search' },
  { value: 'jump', label: 'Jump Search' },
  { value: 'interpolation', label: 'Interpolation Search' },
  { value: 'exponential', label: 'Exponential Search' },
  { value: 'fibonacci', label: 'Fibonacci Search' },
];

// Algorithm descriptions and pseudocode
const algorithmInfo = {
  bubble: {
    desc: 'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    pseudo: `for i = 0 to n-1
  for j = 0 to n-i-2
    if arr[j] > arr[j+1]
      swap arr[j], arr[j+1]`
  },
  selection: {
    desc: 'Selection Sort repeatedly selects the minimum element from the unsorted part and puts it at the beginning.',
    pseudo: `for i = 0 to n-2
  minIdx = i
  for j = i+1 to n-1
    if arr[j] < arr[minIdx]
      minIdx = j
  swap arr[i], arr[minIdx]`
  },
  insertion: {
    desc: 'Insertion Sort builds the sorted array one item at a time by inserting elements into their correct position.',
    pseudo: `for i = 1 to n-1
  key = arr[i]
  j = i-1
  while j >= 0 and arr[j] > key
    arr[j+1] = arr[j]
    j--
  arr[j+1] = key`
  },
  merge: {
    desc: 'Merge Sort divides the array into halves, sorts them and merges them back together.',
    pseudo: `mergeSort(arr, l, r):
  if l < r
    m = (l+r)//2
    mergeSort(arr, l, m)
    mergeSort(arr, m+1, r)
    merge(arr, l, m, r)`
  },
  quick: {
    desc: 'Quick Sort picks a pivot and partitions the array around the pivot, recursively sorting the partitions.',
    pseudo: `quickSort(arr, low, high):
  if low < high
    pi = partition(arr, low, high)
    quickSort(arr, low, pi-1)
    quickSort(arr, pi+1, high)`
  },
  heap: {
    desc: 'Heap Sort builds a max heap and repeatedly extracts the maximum element.',
    pseudo: `heapSort(arr):
  build max heap
  for i = n-1 downto 1
    swap arr[0], arr[i]
    heapify(arr, 0, i)`
  },
  gnome: {
    desc: 'Gnome Sort moves elements to their correct position by swapping them backward as needed.',
    pseudo: `i = 0
while i < n
  if i == 0 or arr[i] >= arr[i-1]
    i++
  else
    swap arr[i], arr[i-1]
    i--`
  },
  pancake: {
    desc: 'Pancake Sort repeatedly flips the largest unsorted element to the front, then to its correct position.',
    pseudo: `for currSize = n downto 2
  mi = index of max in arr[0..currSize-1]
  if mi != currSize-1
    flip arr[0..mi]
    flip arr[0..currSize-1]`
  },
  comb: {
    desc: 'Comb Sort improves on Bubble Sort by using a gap sequence to compare elements.',
    pseudo: `gap = n, shrink = 1.3
while gap > 1 or swapped
  gap = max(1, int(gap/shrink))
  for i = 0 to n-gap-1
    if arr[i] > arr[i+gap]
      swap arr[i], arr[i+gap]`
  },
  oddEven: {
    desc: 'Odd-Even Sort is a variation of Bubble Sort that compares odd and even indexed pairs alternately.',
    pseudo: `sorted = false
while not sorted
  sorted = true
  for i = 1 to n-2 step 2
    if arr[i] > arr[i+1]
      swap arr[i], arr[i+1]
      sorted = false
  for i = 0 to n-2 step 2
    if arr[i] > arr[i+1]
      swap arr[i], arr[i+1]
      sorted = false`
  },
  shell: {
    desc: 'Shell Sort sorts elements far apart from each other and successively reduces the gap.',
    pseudo: `gap = n//2
while gap > 0
  for i = gap to n-1
    temp = arr[i]
    j = i
    while j >= gap and arr[j-gap] > temp
      arr[j] = arr[j-gap]
      j -= gap
    arr[j] = temp
  gap //= 2`
  },
  bitonic: {
    desc: 'Bitonic Sort is a parallel algorithm for sorting that works by recursively sorting bitonic sequences.',
    pseudo: `bitonicSort(arr, low, cnt, dir):
  if cnt > 1
    k = cnt/2
    bitonicSort(arr, low, k, 1)
    bitonicSort(arr, low+k, k, 0)
    bitonicMerge(arr, low, cnt, dir)`
  },
  bogo: {
    desc: 'Bogo Sort shuffles the array until it is sorted. Highly inefficient.',
    pseudo: `while not isSorted(arr)
  shuffle(arr)`
  },
  radix: {
    desc: 'Radix Sort sorts numbers by processing individual digits.',
    pseudo: `for exp = 1; max/exp > 0; exp *= 10
  countSort(arr, exp)`
  },
  decide: {
    desc: 'Decide Sort is a randomized version of Quick Sort.',
    pseudo: `decideSort(arr, low, high):
  if low < high
    pi = randomPartition(arr, low, high)
    decideSort(arr, low, pi-1)
    decideSort(arr, pi+1, high)`
  },
  saltShaker: {
    desc: 'Salt Shaker (Shaker/Cocktail) Sort is a bidirectional Bubble Sort.',
    pseudo: `left = 0, right = n-1, swapped = true
while swapped
  swapped = false
  for i = left to right-1
    if arr[i] > arr[i+1]
      swap arr[i], arr[i+1]
      swapped = true
  right--
  for i = right to left+1 step -1
    if arr[i] < arr[i-1]
      swap arr[i], arr[i-1]
      swapped = true
  left++`
  },
  linear: {
    desc: 'Linear Search checks each element until the target is found.',
    pseudo: `for i = 0 to n-1
  if arr[i] == target
    return i
return -1`
  },
  binary: {
    desc: 'Binary Search repeatedly divides the sorted array in half to find the target.',
    pseudo: `left = 0, right = n-1
while left <= right
  mid = (left+right)//2
  if arr[mid] == target
    return mid
  else if arr[mid] < target
    left = mid+1
  else
    right = mid-1
return -1`
  },
  jump: {
    desc: 'Jump Search checks elements at fixed intervals and then does a linear search.',
    pseudo: `step = sqrt(n), prev = 0
while arr[min(step, n)-1] < target
  prev = step
  step += sqrt(n)
  if prev >= n
    return -1
while arr[prev] < target
  prev++
  if prev == min(step, n)
    return -1
if arr[prev] == target
  return prev
return -1`
  },
  interpolation: {
    desc: 'Interpolation Search estimates the position of the target based on value.',
    pseudo: `low = 0, high = n-1
while low <= high and target >= arr[low] and target <= arr[high]
  pos = low + ((high-low) // (arr[high]-arr[low])) * (target-arr[low])
  if arr[pos] == target
    return pos
  if arr[pos] < target
    low = pos+1
  else
    high = pos-1
return -1`
  },
  exponential: {
    desc: 'Exponential Search finds the range where the target may be and then does binary search.',
    pseudo: `if arr[0] == target
  return 0
i = 1
while i < n and arr[i] <= target
  i *= 2
return binarySearch(arr, i//2, min(i, n-1), target)`
  },
  fibonacci: {
    desc: 'Fibonacci Search uses Fibonacci numbers to divide the array for searching.',
    pseudo: `fibMMm2 = 0, fibMMm1 = 1, fibM = fibMMm2 + fibMMm1
while fibM < n
  fibMMm2 = fibMMm1
  fibMMm1 = fibM
  fibM = fibMMm2 + fibMMm1
offset = -1
while fibM > 1
  i = min(offset+fibMMm2, n-1)
  if arr[i] < target
    fibM = fibMMm1
    fibMMm1 = fibMMm2
    fibMMm2 = fibM - fibMMm1
    offset = i
  else if arr[i] > target
    fibM = fibMMm2
    fibMMm1 = fibMMm1 - fibMMm2
    fibMMm2 = fibM - fibMMm1
  else
    return i
if fibMMm1 and arr[offset+1] == target
  return offset+1
return -1`
  },
};

// Analytics state
function getInitialAnalytics() {
  return { comparisons: 0, swaps: 0, time: 0 };
}

// Color palette for states
const COLORS = {
  normal: '#64748b',
  comparing: '#3b82f6',
  swapped: '#f59e42',
  sorted: '#22c55e',
  pivot: '#a21caf',
  merging: '#a78bfa',
  current: '#fbbf24',
  found: '#16a34a',
  path: '#0ea5e9',
  min: '#e11d48',
  max: '#f43f5e',
  left: '#6366f1',
  right: '#f472b6',
};

// Legend definitions for each algorithm
const LEGEND = {
  bubble: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Comparing', color: COLORS.comparing },
    { label: 'Swapped', color: COLORS.swapped },
    { label: 'Sorted', color: COLORS.sorted },
  ],
  selection: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Comparing', color: COLORS.comparing },
    { label: 'Min', color: COLORS.min },
    { label: 'Swapped', color: COLORS.swapped },
    { label: 'Sorted', color: COLORS.sorted },
  ],
  insertion: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Current', color: COLORS.current },
    { label: 'Comparing', color: COLORS.comparing },
    { label: 'Swapped', color: COLORS.swapped },
    { label: 'Sorted', color: COLORS.sorted },
  ],
  merge: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Merging', color: COLORS.merging },
    { label: 'Sorted', color: COLORS.sorted },
  ],
  quick: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Comparing', color: COLORS.comparing },
    { label: 'Swapped', color: COLORS.swapped },
    { label: 'Pivot', color: COLORS.pivot },
    { label: 'Sorted', color: COLORS.sorted },
  ],
  heap: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Comparing', color: COLORS.comparing },
    { label: 'Swapped', color: COLORS.swapped },
    { label: 'Sorted', color: COLORS.sorted },
  ],
  radix: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Digit', color: COLORS.comparing },
    { label: 'Sorted', color: COLORS.sorted },
  ],
  gnome: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Comparing', color: COLORS.comparing },
    { label: 'Swapped', color: COLORS.swapped },
    { label: 'Sorted', color: COLORS.sorted },
  ],
  pancake: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Flipping', color: COLORS.swapped },
    { label: 'Sorted', color: COLORS.sorted },
  ],
  comb: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Comparing', color: COLORS.comparing },
    { label: 'Swapped', color: COLORS.swapped },
    { label: 'Sorted', color: COLORS.sorted },
  ],
  oddEven: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Comparing', color: COLORS.comparing },
    { label: 'Swapped', color: COLORS.swapped },
    { label: 'Sorted', color: COLORS.sorted },
  ],
  shell: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Comparing', color: COLORS.comparing },
    { label: 'Swapped', color: COLORS.swapped },
    { label: 'Sorted', color: COLORS.sorted },
  ],
  bitonic: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Comparing', color: COLORS.comparing },
    { label: 'Swapped', color: COLORS.swapped },
    { label: 'Sorted', color: COLORS.sorted },
  ],
  bogo: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Sorted', color: COLORS.sorted },
  ],
  decide: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Comparing', color: COLORS.comparing },
    { label: 'Swapped', color: COLORS.swapped },
    { label: 'Pivot', color: COLORS.pivot },
    { label: 'Sorted', color: COLORS.sorted },
  ],
  saltShaker: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Comparing', color: COLORS.comparing },
    { label: 'Swapped', color: COLORS.swapped },
    { label: 'Sorted', color: COLORS.sorted },
  ],
  linear: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Current', color: COLORS.current },
    { label: 'Found', color: COLORS.found },
    { label: 'Path', color: COLORS.path },
  ],
  binary: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Current', color: COLORS.current },
    { label: 'Found', color: COLORS.found },
    { label: 'Path', color: COLORS.path },
    { label: 'Left', color: COLORS.left },
    { label: 'Right', color: COLORS.right },
  ],
  jump: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Current', color: COLORS.current },
    { label: 'Found', color: COLORS.found },
    { label: 'Path', color: COLORS.path },
  ],
  interpolation: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Current', color: COLORS.current },
    { label: 'Found', color: COLORS.found },
    { label: 'Path', color: COLORS.path },
  ],
  exponential: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Current', color: COLORS.current },
    { label: 'Found', color: COLORS.found },
    { label: 'Path', color: COLORS.path },
  ],
  fibonacci: [
    { label: 'Normal', color: COLORS.normal },
    { label: 'Current', color: COLORS.current },
    { label: 'Found', color: COLORS.found },
    { label: 'Path', color: COLORS.path },
  ],
};

// Helper to get the next power of two
function nextPowerOfTwo(n: number): number {
  return Math.pow(2, Math.ceil(Math.log2(n)));
}

// Helper to generate a unique id
let globalBarId = 0;
function getUniqueBarId() {
  return ++globalBarId;
}

const App: React.FC = () => {
  // Mode and algorithm selection
  const [mode, setMode] = useState<'sort' | 'search'>('sort');
  const [algorithm, setAlgorithm] = useState<string>('bubble');
  // Change array to Bar[]
  const [array, setArray] = useState<Bar[]>([]);
  const [arraySize, setArraySize] = useState<number>(30);
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(50);
  const [searchTarget, setSearchTarget] = useState<number>(50);
  const [analytics, setAnalytics] = useState(getInitialAnalytics());
  const [startTime, setStartTime] = useState<number | null>(null);
  const playRef = useRef(isPlaying);
  const [bitonicWarning, setBitonicWarning] = useState<string | null>(null);

  // Generate a random array of Bar objects with unique ids
  function generateArray(size: number): Bar[] {
    const arr: Bar[] = [];
    for (let i = 0; i < size; i++) {
      arr.push({ id: getUniqueBarId(), value: Math.floor(Math.random() * 490) + 10 });
    }
    return arr;
  }

  // Shuffle array (swap entire bar objects)
  function shuffleArray(arr: Bar[]): Bar[] {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Convert Bar[] to number[] for step generators
  function barsToValues(bars: Bar[]): number[] {
    return bars.map(b => b.value);
  }

  // Convert number[] to Bar[] with persistent ids, handling duplicates
  function valuesToBars(values: number[], prevBars: Bar[]): Bar[] {
    // Map from value to a queue of ids
    const valueToIds = new Map<number, number[]>();
    for (const bar of prevBars) {
      if (!valueToIds.has(bar.value)) valueToIds.set(bar.value, []);
      valueToIds.get(bar.value)!.push(bar.id);
    }
    const used = new Map<number, number>();
    return values.map(v => {
      const usedCount = used.get(v) || 0;
      const ids = valueToIds.get(v) || [];
      if (usedCount < ids.length) {
        used.set(v, usedCount + 1);
        return { id: ids[usedCount], value: v };
      }
      // fallback: new id
      return { id: getUniqueBarId(), value: v };
    });
  }

  // Build steps for the selected algorithm
  function buildSteps(arr: Bar[], target: number): any[] {
    const values = barsToValues(arr);
    const gen = getStepGenerator(mode, algorithm, values, target);
    const allSteps: any[] = [];
    let prevBars = arr;
    for (const step of gen) {
      // For each step, convert step.array (number[]) to Bar[] with persistent ids
      const bars = valuesToBars(step.array, prevBars);
      allSteps.push({ ...step, bars });
      prevBars = bars;
    }
    return allSteps;
  }

  // Helper to pick a random value from the array
  function pickRandomTarget(arr: Bar[]): number {
    if (arr.length === 0) return 0;
    return arr[Math.floor(Math.random() * arr.length)].value;
  }

  // Helper to insert a value into the array at a random position if not present
  function ensureValueInArray(arr: Bar[], value: number): Bar[] {
    if (arr.some(bar => bar.value === value)) return arr;
    // Insert at a random position
    const idx = Math.floor(Math.random() * (arr.length + 1));
    const newBar = { id: getUniqueBarId(), value };
    const newArr = arr.slice();
    newArr.splice(idx, 0, newBar);
    return newArr;
  }

  // On mount or array size/algorithm/mode/target change, generate array and steps
  useEffect(() => {
    let arr = generateArray(arraySize);
    let t = searchTarget;
    if (mode === 'search') {
      t = pickRandomTarget(arr);
      setSearchTarget(t);
      arr = ensureValueInArray(arr, t);
      setArray(arr);
    } else {
      setArray(arr);
    }
    const s = buildSteps(arr, t);
    setSteps(s);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [arraySize, algorithm, mode]);

  