export type ProblemStatus = 'solved' | 'attempted' | 'unattempted';

export type Problem = {
  id: string;
  difficulty: 'hard' | 'medium' | 'easy';
  status: ProblemStatus;
  statement: string;
  solution?: Solution[];
  url?: string | string[];
  topics?: string | string[];
  companiesAsked?: string[];
};

export type StatusModel = {
  id: string;
  status: ProblemStatus;
};

export interface AdjacentRoutes {
  prevPrblmId: string;
  prevTopic: string;
  nextPrblmId: string;
  nextTopic: string;
  curTopic: string;
}

export interface ProblemRoute extends Problem {
  adjRoutes: AdjacentRoutes;
}

export type Solution = {
  approach: 'approach-1' | 'approach-2' | 'approach-3';
  algorithm: string;
  images: string[];
};

export type ProblemContent = {
  problem?: Problem;
  status?: 'loaded' | 'no-data';
};

  
export type DSASheet = {
    topics: string[] | undefined;
    problems: Problem[] | undefined;
  };


