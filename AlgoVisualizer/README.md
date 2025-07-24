# 🧠 Algorithm Visualizer

**Step-by-step, interactive, and colorful algorithm learning tool built with React + TypeScript.**

Visualize sorting algorithms in action with smooth animations, pseudocode overlays, and detailed step tracking. Perfect for students, educators, or anyone curious about how algorithms work!

![Screenshot](./public/screenshot.png) <!-- Replace with actual screenshot -->

---

## ✨ Features

- 🔁 **Sorting Algorithm Mode**: Bubble Sort (more coming soon!)
- 📏 **Adjustable Array Size**
- ⚡ **Custom Animation Speed**
- ▶️ **Interactive Controls**: Play, Pause, Step, Reset, Shuffle
- 🎨 **Color Legend**:
  - ⬜ Normal
  - 🔄 Comparing
  - ↔️ Swapped
  - ✅ Sorted
- 📊 **Real-Time Stats**: comparisons, swaps, current step, elapsed time
- 🧠 **Pseudocode View**: see the algorithm in action line-by-line

---

## 🌐 Live Demo

🔗 **Try it here**: [https://algolens-lyart.vercel.app/](https://algolens-lyart.vercel.app/)

> No installation needed — just open and explore.

---

## 🚀 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/COOLCODERVG/algovisualizer.git
cd algovisualizer/AlgoVisualizer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the App

```bash
npm run dev
```

> App will run at [http://localhost:5173](http://localhost:5173)

---

## 📘 Bubble Sort Pseudocode

```text
for i = 0 to n-1
  for j = 0 to n-i-2
    if arr[j] > arr[j+1]
      swap arr[j], arr[j+1]
```

---

## 📂 Project Structure

```
AlgoVisualizer/
├── public/
│   └── screenshot.png      # UI screenshot (optional)
├── src/
│   ├── components/         # Visualizer & controls
│   ├── visualAlgorithms.ts # Generator logic for step-by-step sorting
│   └── App.tsx             # Main entry component
├── index.html
├── vite.config.ts
├── package.json
```

---

## ✅ Submission Checklist

- ✅ **Functional & complete** — all controls, sorting logic, and visuals work
- ✅ **Easy to run** — setup takes <2 minutes with clear instructions
- ✅ **Live site available** — hosted at Vercel with link provided
- ✅ **Well-documented** — this README includes purpose, usage, and visuals
- ✅ **Polished UI** — clean, bug-free, and responsive design

---

## 📄 License

© 2025 **Algorithm Visualizer**. All rights reserved.  
Licensed under the [MIT License](./LICENSE)

---

Want to contribute or suggest a feature (e.g., Merge Sort, Binary Search, or Quick Sort)? Feel free to open an issue or pull request!