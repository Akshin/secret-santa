import type { IFormData } from "@/types";

export const collectFields = function (
  fields: string[],
  item: IFormData = {},
  delimiter: string = ""
): string {
  if (!fields || !fields.length) return "";

  let result: string = "";
  fields.forEach((field, i) => {
    const fieldValue = item[field] || "";
    result += fieldValue;
    if (i !== fields.length - 1 && delimiter) {
      result += `${delimiter} `;
    }
  });

  return result;
};

// 1 яблоко, 3 яблока, 10 яблок (txt)
export function sklonenie(number: number, txt: string[]): string {
  const cases: number[] = [2, 0, 1, 1, 1, 2];
  return txt[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}
