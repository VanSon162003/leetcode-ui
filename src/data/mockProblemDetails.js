// Mock data for problem details with test cases
export const mockProblemDetails = {
    "two-sum": {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        acceptance: "44.8%",
        slug: "two-sum",
        topics: ["Array", "Hash Table"],
        companies: ["Amazon", "Google", "Microsoft"],
        likes: 12500,
        dislikes: 400,
        description: `
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.
        `,
        testCases: [
            {
                input: { nums: [2, 7, 11, 15], target: 9 },
                expected: [0, 1],
                description: "Basic case with two numbers that sum to target"
            },
            {
                input: { nums: [3, 2, 4], target: 6 },
                expected: [1, 2],
                description: "Case with different indices"
            },
            {
                input: { nums: [3, 3], target: 6 },
                expected: [0, 1],
                description: "Case with duplicate numbers"
            },
            {
                input: { nums: [1, 2, 3, 4, 5], target: 8 },
                expected: [2, 4],
                description: "Case with larger array"
            },
            {
                input: { nums: [-1, -2, -3, -4, -5], target: -8 },
                expected: [2, 4],
                description: "Case with negative numbers"
            }
        ],
        starterCode: `function twoSum(nums, target) {
    // Your code here
    return [];
}`,
        solution: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`
    },

    "add-two-numbers": {
        id: 2,
        title: "Add Two Numbers",
        difficulty: "Medium",
        acceptance: "33.1%",
        slug: "add-two-numbers",
        topics: ["Linked List", "Math"],
        companies: ["Amazon", "Google", "Microsoft"],
        likes: 8900,
        dislikes: 300,
        description: `
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example 1:
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

Example 2:
Input: l1 = [0], l2 = [0]
Output: [0]

Example 3:
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]

Constraints:
- The number of nodes in each linked list is in the range [1, 100].
- 0 <= Node.val <= 9
- It is guaranteed that the list represents a number that does not have leading zeros.
        `,
        testCases: [
            {
                input: { l1: [2, 4, 3], l2: [5, 6, 4] },
                expected: [7, 0, 8],
                description: "Basic addition with carry"
            },
            {
                input: { l1: [0], l2: [0] },
                expected: [0],
                description: "Both lists contain only zero"
            },
            {
                input: { l1: [9, 9, 9, 9, 9, 9, 9], l2: [9, 9, 9, 9] },
                expected: [8, 9, 9, 9, 0, 0, 0, 1],
                description: "Long lists with multiple carries"
            },
            {
                input: { l1: [5], l2: [5] },
                expected: [0, 1],
                description: "Single digits with carry"
            }
        ],
        starterCode: `function addTwoNumbers(l1, l2) {
    // Your code here
    return [];
}`,
        solution: `function addTwoNumbers(l1, l2) {
    let dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;
    
    while (l1 || l2 || carry) {
        let sum = carry;
        if (l1) {
            sum += l1.val;
            l1 = l1.next;
        }
        if (l2) {
            sum += l2.val;
            l2 = l2.next;
        }
        
        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);
        current = current.next;
    }
    
    return dummy.next;
}`
    },

    "longest-substring-without-repeating-characters": {
        id: 3,
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        acceptance: "29.8%",
        slug: "longest-substring-without-repeating-characters",
        topics: ["Hash Table", "String", "Sliding Window"],
        companies: ["Amazon", "Google", "Microsoft"],
        likes: 11200,
        dislikes: 500,
        description: `
Given a string s, find the length of the longest substring without repeating characters.

Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

Constraints:
- 0 <= s.length <= 5 * 10^4
- s consists of English letters, digits, symbols and spaces.
        `,
        testCases: [
            {
                input: { s: "abcabcbb" },
                expected: 3,
                description: "Basic case with repeated characters"
            },
            {
                input: { s: "bbbbb" },
                expected: 1,
                description: "All same characters"
            },
            {
                input: { s: "pwwkew" },
                expected: 3,
                description: "Substring in the middle"
            },
            {
                input: { s: "" },
                expected: 0,
                description: "Empty string"
            },
            {
                input: { s: "dvdf" },
                expected: 3,
                description: "Case with overlapping substrings"
            }
        ],
        starterCode: `function lengthOfLongestSubstring(s) {
    // Your code here
    return 0;
}`,
        solution: `function lengthOfLongestSubstring(s) {
    let maxLength = 0;
    let start = 0;
    const charMap = new Map();
    
    for (let end = 0; end < s.length; end++) {
        if (charMap.has(s[end]) && charMap.get(s[end]) >= start) {
            start = charMap.get(s[end]) + 1;
        }
        charMap.set(s[end], end);
        maxLength = Math.max(maxLength, end - start + 1);
    }
    
    return maxLength;
}`
    },

    "median-of-two-sorted-arrays": {
        id: 4,
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        acceptance: "28.9%",
        slug: "median-of-two-sorted-arrays",
        topics: ["Array", "Binary Search", "Divide and Conquer"],
        companies: ["Amazon", "Google", "Microsoft"],
        likes: 7800,
        dislikes: 200,
        description: `
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

Example 1:
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.

Example 2:
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

Constraints:
- nums1.length == m
- nums2.length == n
- 0 <= m <= 1000
- 0 <= n <= 1000
- 1 <= m + n <= 2000
- -10^6 <= nums1[i], nums2[i] <= 10^6
        `,
        testCases: [
            {
                input: { nums1: [1, 3], nums2: [2] },
                expected: 2.0,
                description: "Odd total length"
            },
            {
                input: { nums1: [1, 2], nums2: [3, 4] },
                expected: 2.5,
                description: "Even total length"
            },
            {
                input: { nums1: [], nums2: [1] },
                expected: 1.0,
                description: "One empty array"
            },
            {
                input: { nums1: [2], nums2: [] },
                expected: 2.0,
                description: "Other empty array"
            },
            {
                input: { nums1: [1, 2, 3, 4, 5], nums2: [6, 7, 8, 9, 10] },
                expected: 5.5,
                description: "Larger arrays"
            }
        ],
        starterCode: `function findMedianSortedArrays(nums1, nums2) {
    // Your code here
    return 0;
}`,
        solution: `function findMedianSortedArrays(nums1, nums2) {
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    const m = nums1.length;
    const n = nums2.length;
    let left = 0;
    let right = m;
    
    while (left <= right) {
        const partitionX = Math.floor((left + right) / 2);
        const partitionY = Math.floor((m + n + 1) / 2) - partitionX;
        
        const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
        const minRightX = partitionX === m ? Infinity : nums1[partitionX];
        
        const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
        const minRightY = partitionY === n ? Infinity : nums2[partitionY];
        
        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
            } else {
                return Math.max(maxLeftX, maxLeftY);
            }
        } else if (maxLeftX > minRightY) {
            right = partitionX - 1;
        } else {
            left = partitionX + 1;
        }
    }
}`
    },

    "longest-palindromic-substring": {
        id: 5,
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        acceptance: "28.7%",
        slug: "longest-palindromic-substring",
        topics: ["String", "Dynamic Programming"],
        companies: ["Amazon", "Google", "Microsoft"],
        likes: 9500,
        dislikes: 350,
        description: `
Given a string s, return the longest palindromic substring in s.

Example 1:
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.

Example 2:
Input: s = "cbbd"
Output: "bb"

Example 3:
Input: s = "a"
Output: "a"

Example 4:
Input: s = "ac"
Output: "a"

Constraints:
- 1 <= s.length <= 1000
- s consist of only digits and English letters.
        `,
        testCases: [
            {
                input: { s: "babad" },
                expected: "bab",
                description: "Multiple palindromes, return first longest"
            },
            {
                input: { s: "cbbd" },
                expected: "bb",
                description: "Even length palindrome"
            },
            {
                input: { s: "a" },
                expected: "a",
                description: "Single character"
            },
            {
                input: { s: "ac" },
                expected: "a",
                description: "No palindrome, return first character"
            },
            {
                input: { s: "racecar" },
                expected: "racecar",
                description: "Entire string is palindrome"
            }
        ],
        starterCode: `function longestPalindrome(s) {
    // Your code here
    return "";
}`,
        solution: `function longestPalindrome(s) {
    if (!s || s.length < 1) return "";
    
    let start = 0;
    let end = 0;
    
    for (let i = 0; i < s.length; i++) {
        const len1 = expandAroundCenter(s, i, i);
        const len2 = expandAroundCenter(s, i, i + 1);
        const len = Math.max(len1, len2);
        
        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }
    
    return s.substring(start, end + 1);
}

function expandAroundCenter(s, left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}`
    },

    "zigzag-conversion": {
        id: 6,
        title: "ZigZag Conversion",
        difficulty: "Medium",
        acceptance: "35.2%",
        slug: "zigzag-conversion",
        topics: ["String"],
        companies: ["PayPal", "Adobe"],
        likes: 6800,
        dislikes: 250,
        description: `
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

P   A   H   N
A P L S I I G
Y   I   R

And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

string convert(string s, int numRows);

Example 1:
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"

Example 2:
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I

Example 3:
Input: s = "A", numRows = 1
Output: "A"

Constraints:
- 1 <= s.length <= 1000
- s consists of English letters (lower-case and upper-case), ',' and '.'.
- 1 <= numRows <= 1000
        `,
        testCases: [
            {
                input: { s: "PAYPALISHIRING", numRows: 3 },
                expected: "PAHNAPLSIIGYIR",
                description: "Basic zigzag conversion"
            },
            {
                input: { s: "PAYPALISHIRING", numRows: 4 },
                expected: "PINALSIGYAHRPI",
                description: "Zigzag with 4 rows"
            },
            {
                input: { s: "A", numRows: 1 },
                expected: "A",
                description: "Single character"
            },
            {
                input: { s: "AB", numRows: 1 },
                expected: "AB",
                description: "Two characters, one row"
            }
        ],
        starterCode: `function convert(s, numRows) {
    // Your code here
    return "";
}`,
        solution: `function convert(s, numRows) {
    if (numRows === 1) return s;
    
    const rows = new Array(numRows).fill("");
    let currentRow = 0;
    let goingDown = false;
    
    for (const char of s) {
        rows[currentRow] += char;
        
        if (currentRow === 0 || currentRow === numRows - 1) {
            goingDown = !goingDown;
        }
        
        currentRow += goingDown ? 1 : -1;
    }
    
    return rows.join("");
}`
    },

    "reverse-integer": {
        id: 7,
        title: "Reverse Integer",
        difficulty: "Easy",
        acceptance: "25.5%",
        slug: "reverse-integer",
        topics: ["Math"],
        companies: ["Apple", "Microsoft"],
        likes: 7200,
        dislikes: 180,
        description: `
Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

Example 1:
Input: x = 123
Output: 321

Example 2:
Input: x = -123
Output: -321

Example 3:
Input: x = 120
Output: 21

Example 4:
Input: x = 0
Output: 0

Constraints:
- -2^31 <= x <= 2^31 - 1
        `,
        testCases: [
            {
                input: { x: 123 },
                expected: 321,
                description: "Positive number"
            },
            {
                input: { x: -123 },
                expected: -321,
                description: "Negative number"
            },
            {
                input: { x: 120 },
                expected: 21,
                description: "Number ending with zero"
            },
            {
                input: { x: 0 },
                expected: 0,
                description: "Zero"
            },
            {
                input: { x: 1534236469 },
                expected: 0,
                description: "Overflow case"
            }
        ],
        starterCode: `function reverse(x) {
    // Your code here
    return 0;
}`,
        solution: `function reverse(x) {
    let result = 0;
    const isNegative = x < 0;
    x = Math.abs(x);
    
    while (x > 0) {
        result = result * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    
    if (isNegative) {
        result = -result;
    }
    
    if (result < -Math.pow(2, 31) || result > Math.pow(2, 31) - 1) {
        return 0;
    }
    
    return result;
}`
    },

    "string-to-integer-atoi": {
        id: 8,
        title: "String to Integer (atoi)",
        difficulty: "Medium",
        acceptance: "16.6%",
        slug: "string-to-integer-atoi",
        topics: ["String", "Math"],
        companies: ["Amazon", "Microsoft"],
        likes: 5400,
        dislikes: 400,
        description: `
Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).

The algorithm for myAtoi(string s) is as follows:

1. Read in and ignore any leading whitespace.
2. Check if the next character (if not already at the end of the string) is '-' or '+'. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
3. Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.
4. Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).
5. If the integer is out of the 32-bit signed integer range [-2^31, 2^31 - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -2^31 should be clamped to -2^31, and integers greater than 2^31 - 1 should be clamped to 2^31 - 1.
6. Return the integer as the final result.

Note:
- Only the space character ' ' is considered a whitespace character.
- Do not ignore any characters other than the leading whitespace or the rest of the string after the digits.

Example 1:
Input: s = "42"
Output: 42

Example 2:
Input: s = "   -42"
Output: -42

Example 3:
Input: s = "4193 with words"
Output: 4193

Example 4:
Input: s = "words and 987"
Output: 0

Example 5:
Input: s = "-91283472332"
Output: -2147483648

Constraints:
- 0 <= s.length <= 200
- s consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'.
        `,
        testCases: [
            {
                input: { s: "42" },
                expected: 42,
                description: "Simple positive number"
            },
            {
                input: { s: "   -42" },
                expected: -42,
                description: "Negative number with leading spaces"
            },
            {
                input: { s: "4193 with words" },
                expected: 4193,
                description: "Number followed by words"
            },
            {
                input: { s: "words and 987" },
                expected: 0,
                description: "Words before number"
            },
            {
                input: { s: "-91283472332" },
                expected: -2147483648,
                description: "Overflow case"
            },
            {
                input: { s: "   +0 123" },
                expected: 0,
                description: "Positive zero with spaces"
            }
        ],
        starterCode: `function myAtoi(s) {
    // Your code here
    return 0;
}`,
        solution: `function myAtoi(s) {
    let index = 0;
    let sign = 1;
    let result = 0;
    
    // Skip leading whitespace
    while (index < s.length && s[index] === ' ') {
        index++;
    }
    
    // Check for sign
    if (index < s.length && (s[index] === '+' || s[index] === '-')) {
        sign = s[index] === '-' ? -1 : 1;
        index++;
    }
    
    // Read digits
    while (index < s.length && s[index] >= '0' && s[index] <= '9') {
        const digit = s[index] - '0';
        
        // Check for overflow
        if (result > (Math.pow(2, 31) - 1 - digit) / 10) {
            return sign === 1 ? Math.pow(2, 31) - 1 : -Math.pow(2, 31);
        }
        
        result = result * 10 + digit;
        index++;
    }
    
    return sign * result;
}`
    }
};
