
export type TopicRoute = {
  path: string;
  title: string;
}

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

export type Solution = {
  approach: 'approach-1' | 'approach-2' | 'approach-3';
  algorithm: string;
  images: string[];
};

// TODO : Use it if needed in future
// export type ProblemContent = {
//   problem?: Problem;
//   status?: 'loaded' | 'no-data';
// };

  
export type DSASheet = {
    topics: string[];
    problems: Problem[];
  };


