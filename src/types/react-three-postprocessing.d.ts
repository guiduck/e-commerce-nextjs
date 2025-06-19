/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "@react-three/postprocessing" {
  export * from "postprocessing";
  import { ReactNode } from "react";

  export const EffectComposer: (props: { children: ReactNode }) => JSX.Element;
  export const Bloom: (props: any) => JSX.Element;
  export const Noise: (props: any) => JSX.Element;
}
