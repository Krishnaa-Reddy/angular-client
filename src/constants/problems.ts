import { DSASheet, Problem, ProblemStatus } from "../types/problem.type";

export const STATUSES : ProblemStatus[] =  ['solved', 'attempted', 'unattempted'];

export const PROBLEMS_LIST: Problem[] = [
    {
      id: '1',
      difficulty: 'easy',
      status: 'solved',
      statement: 'Two Sum',
      url: 'https://leetcode.com/problems/two-sum',
      topics: ['Arrays', 'Hash Table'],
      companiesAsked: ['Amazon', 'Google'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Using hash map to store the complement and index',
          images: ['url-to-image1', 'url-to-image2'],
        },
        {
          approach: 'approach-2',
          algorithm: 'Using hash map to store the complement and index',
          images: ['url-to-image1', 'url-to-image2'],
        },
        {
          approach: 'approach-3',
          algorithm: 'Using hash map to store the complement and index',
          images: ['url-to-image1', 'url-to-image2'],
        },
      ],
    },
    {
      id: '2',
      difficulty: 'medium',
      status: 'attempted',
      statement: 'Add Two Numbers',
      url: 'https://leetcode.com/problems/add-two-numbers',
      topics: ['Linked List', 'Math'],
      companiesAsked: ['Microsoft', 'Facebook'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Iterative approach with carry over addition',
          images: ['url-to-image1', 'url-to-image2'],
        },
      ],
    },
    {
      id: '3',
      difficulty: 'medium',
      status: 'unattempted',
      statement: 'Longest Substring Without Repeating Characters',
      url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters',
      topics: ['Hash Table', 'Two Pointers', 'String'],
      companiesAsked: ['Amazon', 'Google', 'Microsoft'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Sliding window technique with hash set',
          images: ['url-to-image1'],
        },
      ],
    },
    {
      id: '4',
      difficulty: 'hard',
      status: 'unattempted',
      statement: 'Median of Two Sorted Arrays',
      url: 'https://leetcode.com/problems/median-of-two-sorted-arrays',
      topics: ['Arrays', 'Binary Search', 'Divide and Conquer'],
      companiesAsked: ['Amazon', 'Google'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Binary search on the smaller array',
          images: ['url-to-image1', 'url-to-image2'],
        },
      ],
    },
    {
      id: '5',
      difficulty: 'medium',
      status: 'solved',
      statement: 'Longest Palindromic Substring',
      url: 'https://leetcode.com/problems/longest-palindromic-substring',
      topics: ['String', 'Dynamic Programming'],
      companiesAsked: ['Microsoft', 'Amazon'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Expand around center approach',
          images: ['url-to-image1'],
        },
        {
          approach: 'approach-2',
          algorithm: 'Dynamic programming approach',
          images: ['url-to-image2'],
        },
      ],
    },
    {
      id: '6',
      difficulty: 'medium',
      status: 'attempted',
      statement: 'ZigZag Conversion',
      url: 'https://leetcode.com/problems/zigzag-conversion',
      topics: ['String'],
      companiesAsked: ['Google', 'Facebook'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Simulate the ZigZag pattern by filling rows',
          images: ['url-to-image1'],
        },
      ],
    },
    {
      id: '7',
      difficulty: 'easy',
      status: 'solved',
      statement: 'Reverse Integer',
      url: 'https://leetcode.com/problems/reverse-integer',
      topics: ['Math'],
      companiesAsked: ['Microsoft', 'Google'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Pop and push digits & check for overflow',
          images: ['url-to-image1'],
        },
      ],
    },
    {
      id: '8',
      difficulty: 'medium',
      status: 'unattempted',
      statement: 'String to Integer (atoi)',
      url: 'https://leetcode.com/problems/string-to-integer-atoi',
      topics: ['String'],
      companiesAsked: ['Amazon', 'Facebook'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Finite state machine approach',
          images: ['url-to-image1'],
        },
      ],
    },
    {
      id: '9',
      difficulty: 'easy',
      status: 'solved',
      statement: 'Palindrome Number',
      url: 'https://leetcode.com/problems/palindrome-number',
      topics: ['Math'],
      companiesAsked: ['Google', 'Apple'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Reverse half of the number and compare',
          images: ['url-to-image1'],
        },
      ],
    },
    {
      id: '10',
      difficulty: 'hard',
      status: 'attempted',
      statement: 'Regular Expression Matching',
      url: 'https://leetcode.com/problems/regular-expression-matching',
      topics: ['String', 'Dynamic Programming'],
      companiesAsked: ['Microsoft', 'Google'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Dynamic programming approach',
          images: ['url-to-image1'],
        },
      ],
    },
    {
      id: '11',
      difficulty: 'medium',
      status: 'solved',
      statement: 'Container With Most Water',
      url: 'https://leetcode.com/problems/container-with-most-water',
      topics: ['Array', 'Two Pointers'],
      companiesAsked: ['Amazon', 'Google'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Two pointer approach',
          images: ['url-to-image1'],
        },
      ],
    },
    {
      id: '12',
      difficulty: 'medium',
      status: 'unattempted',
      statement: 'Integer to Roman',
      url: 'https://leetcode.com/problems/integer-to-roman',
      topics: ['Math', 'String'],
      companiesAsked: ['Microsoft', 'Apple'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Greedy algorithm',
          images: ['url-to-image1'],
        },
      ],
    },
    {
      id: '13',
      difficulty: 'easy',
      status: 'solved',
      statement: 'Roman to Integer',
      url: 'https://leetcode.com/problems/roman-to-integer',
      topics: ['Math', 'String'],
      companiesAsked: ['Amazon', 'Google'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Traverse the string and sum values',
          images: ['url-to-image1'],
        },
      ],
    },
    {
      id: '14',
      difficulty: 'easy',
      status: 'attempted',
      statement: 'Longest Common Prefix',
      url: 'https://leetcode.com/problems/longest-common-prefix',
      topics: ['String'],
      companiesAsked: ['Amazon', 'Microsoft'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Horizontal scanning',
          images: ['url-to-image1'],
        },
      ],
    },
    {
      id: '15',
      difficulty: 'medium',
      status: 'unattempted',
      statement: '3Sum',
      url: 'https://leetcode.com/problems/3sum',
      topics: ['Array', 'Two Pointers'],
      companiesAsked: ['Google', 'Facebook'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Two pointer approach after sorting',
          images: ['url-to-image1'],
        },
      ],
    },
    {
      id: '16',
      difficulty: 'medium',
      status: 'solved',
      statement: '3Sum Closest',
      url: 'https://leetcode.com/problems/3sum-closest',
      topics: ['Array', 'Two Pointers'],
      companiesAsked: ['Amazon', 'Google'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Two pointer approach after sorting',
          images: ['url-to-image1'],
        },
      ],
    },
    {
      id: '17',
      difficulty: 'medium',
      status: 'attempted',
      statement: 'Letter Combinations of a Phone Number',
      url: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number',
      topics: ['String', 'Backtracking'],
      companiesAsked: ['Amazon', 'Apple'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Backtracking approach',
          images: ['url-to-image1'],
        },
      ],
    },
    {
      id: '18',
      difficulty: 'medium',
      status: 'unattempted',
      statement: '4Sum',
      url: 'https://leetcode.com/problems/4sum',
      topics: ['Array', 'Two Pointers'],
      companiesAsked: ['Google', 'Facebook'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'K-sum general approach',
          images: ['url-to-image1'],
        },
      ],
    },
    {
      id: '19',
      difficulty: 'medium',
      status: 'solved',
      statement: 'Remove Nth Node From End of List',
      url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list',
      topics: ['Linked List', 'Two Pointers'],
      companiesAsked: ['Microsoft', 'Amazon'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Two pass approach to find length',
          images: ['url-to-image1'],
        },
        {
          approach: 'approach-2',
          algorithm: 'One pass approach with two pointers',
          images: ['url-to-image2'],
        },
      ],
    },
    {
      id: '20',
      difficulty: 'easy',
      status: 'solved',
      statement: 'Valid Parentheses',
      url: 'https://leetcode.com/problems/valid-parentheses',
      topics: ['String', 'Stack'],
      companiesAsked: ['Amazon', 'Microsoft'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Using stack to check matching parentheses',
          images: ['url-to-image1'],
        },
      ],
    },
    {
      id: '21',
      difficulty: 'easy',
      status: 'solved',
      statement: 'Merge Two Sorted Lists',
      url: 'https://leetcode.com/problems/merge-two-sorted-lists',
      topics: ['Linked List'],
      companiesAsked: ['Amazon', 'Microsoft'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Iterative approach to merge lists',
          images: ['url-to-image1'],
        },
      ],
    },
    {
      id: '22',
      difficulty: 'medium',
      status: 'unattempted',
      statement: 'Generate Parentheses',
      url: 'https://leetcode.com/problems/generate-parentheses',
      topics: ['String', 'Backtracking'],
      companiesAsked: ['Facebook', 'Google'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Backtracking approach',
          images: ['url-to-image1'],
        },
      ],
    },
    {
      id: '23',
      difficulty: 'hard',
      status: 'attempted',
      statement: 'Merge k Sorted Lists',
      url: 'https://leetcode.com/problems/merge-k-sorted-lists',
      topics: ['Linked List', 'Divide and Conquer', 'Heap'],
      companiesAsked: ['Amazon', 'Google'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Using min heap',
          images: ['url-to-image1'],
        },
        {
          approach: 'approach-2',
          algorithm: 'Merge with divide and conquer',
          images: ['url-to-image2'],
        },
      ],
    },
    {
      id: '24',
      difficulty: 'medium',
      status: 'solved',
      statement: 'Swap Nodes in Pairs',
      url: 'https://leetcode.com/problems/swap-nodes-in-pairs',
      topics: ['Linked List'],
      companiesAsked: ['Amazon', 'Microsoft'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Iterative approach to swap pairs',
          images: ['url-to-image1'],
        },
        {
          approach: 'approach-2',
          algorithm: 'Recursive approach to swap pairs',
          images: ['url-to-image2'],
        },
      ],
    },
    {
      id: '25',
      difficulty: 'hard',
      status: 'unattempted',
      statement: 'Reverse Nodes in k-Group',
      url: 'https://leetcode.com/problems/reverse-nodes-in-k-group',
      topics: ['Linked List'],
      companiesAsked: ['Amazon', 'Google'],
      solution: [
        {
          approach: 'approach-1',
          algorithm: 'Reverse k nodes at a time recursively',
          images: ['url-to-image1'],
        },
      ],
    },
  ];
  
  export const TOPICS: string[] = [
    'Arrays',
    'Hash Table',
    'Linked List',
    'Math',
    'Two Pointers',
    'String',
    'Binary Search',
    'Divide and Conquer',
    'Dynamic Programming',
    'Backtracking',
    'Stack',
    'Heap',
  ];

  export const DSA_DATA: DSASheet = {
    topics: TOPICS,
    problems: PROBLEMS_LIST,
  };