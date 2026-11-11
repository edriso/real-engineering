/// <reference types="vite/client" />

declare module 'virtual:lessons' {
  const lessons: {
    number: number;
    slug: string;
    title: string;
    summary: string;
    part: string;
    minutes: number;
  }[];
  export default lessons;
}
