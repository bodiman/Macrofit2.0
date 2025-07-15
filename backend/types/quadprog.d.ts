declare module 'quadprog' {
  interface QuadProgResult {
    solution: number[];
    value: number;
    unconstrained_solution: number[];
    iterations: number[];
    iact: number[];
    message: string;
  }

  function solveQP(
    Dmat: number[][],
    dvec: number[],
    Amat: number[][],
    bvec: number[],
    meq: number
  ): QuadProgResult;

  export = solveQP;
} 