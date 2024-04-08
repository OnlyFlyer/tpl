export * from './add';
export * from './divide';
export * from './multiple';
export * from './subtract';

export function print(input: string) {
  console.log(input);
};

export function sleep<T extends any>(t: number, data: T): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, t);
  });
};

console.log(print('xx'));
