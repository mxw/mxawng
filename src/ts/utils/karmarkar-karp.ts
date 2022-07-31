/*
 * karmarkar-karp stable partitioning
 *
 * why can't i find a reasonable js partitioning package?
 */

import Heap from 'heap-js';

type Entry<T> = {
  // (x, index) partitions.  partitions array is sorted by sum (increasing),
  // and each partition is sorted by initial order (increasing).
  partitions: {
    arr: [T, number][];
    sum: number;
  }[];
  sumdiff: number;
};

function combine<T>(
  a: Entry<T>,
  b: Entry<T>,
  weight: (x: T) => number,
): Entry<T> {
  const k = a.partitions.length;
  const combined: Entry<T> = {
    partitions: [],
    sumdiff: 0,
  };

  for (let i = 0; i < k; ++i) {
    const a_part = a.partitions[i];
    const b_part = b.partitions[k - i - 1];

    const part = [];
    let [a_i, b_i] = [0, 0];

    // combine partitions, preserving original order
    while (part.length < a_part.arr.length + b_part.arr.length) {
      const a_ord = a_part.arr[a_i]?.[1] ?? Infinity;
      const b_ord = b_part.arr[b_i]?.[1] ?? Infinity;

      if (a_ord < b_ord) {
        part.push(a_part.arr[a_i++]);
      } else {
        part.push(b_part.arr[b_i++]);
      }
    }
    combined.partitions.push({
      arr: part,
      sum: a_part.sum + b_part.sum
    });
  }

  combined.partitions.sort((a, b) => b.sum - a.sum);
  combined.sumdiff = combined.partitions.at(0).sum -
                     combined.partitions.at(-1).sum;
  return combined;
}

export default function kk<T>(
  input: T[],
  k: number,
  weight: (x: T) => number,
): T[][] {
  if (k < 1 || !Number.isInteger(k)) return [];
  if (k === 1) return [input, ...Array.from({length: k - 1}, () => [])];

  if (input.length === 0) return Array.from({length: k}, () => []);

  const heap = new Heap<Entry<T>>((a, b) => b.sumdiff - a.sumdiff);
  heap.init(input.map((x: T, i: number) => ({
    partitions: [{
      arr: [[x, i] as [T, number]],
      sum: weight(x),
    }, ...Array.from({length: k - 1}, () => ({arr: [], sum: 0}))],
    sumdiff: weight(x),
  })));

  while (heap.size() > 1) {
    const a = heap.pop();
    const b = heap.pop();

    heap.push(combine(a, b, weight));
  }

  const combined = heap.pop();
  return combined.partitions.sort((a, b) => (
    (a.arr[0]?.[1] ?? Infinity) - (b.arr[0]?.[1] ?? Infinity)
  )).map(p => p.arr.map(([x, _]) => x));
}

/*

// tests lol
console.log(kk([8,7,6,5,4], 2, (x: number) => x));
console.log(kk([8,7,6,5,4], 3, (x: number) => x));
console.log(kk([5,5,5,4,4,3,3,1], 3, (x: number) => x));

*/
