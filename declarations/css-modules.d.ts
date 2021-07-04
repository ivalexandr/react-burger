declare module '*.css' {
  interface IClassNames {
      [className: string]: string;
  }
  const s: IClassNames;
  export = s;
} 