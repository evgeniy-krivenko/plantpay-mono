/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGAElement>>;
  export default content;
}
