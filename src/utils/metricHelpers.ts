export const getTextMetrics = (text: string, type: string) => {
  switch (type) {
    case "words":
      return !text?.trim() ? 0 : text.split(/[\s\n]+/).length;
    case "chars":
      return !text?.trim() ? 0 : text.length;
    case "sentences":
      return !text?.trim() ? 0 : text.split(".").length;
    case "paragraphs":
      return !text?.trim() ? 0 : text.split(/\n+/).length;
    case "longest-words":
      const words = text.toLowerCase().match(/\b\w+\b/g) || [];
      if (!words.length) {
        return [];
      }
      let maxLength = 0,
        longestWords: string[] = [];
      for (const word of words) {
        if (maxLength < word.length) {
          longestWords = [word];
          maxLength = word.length;
        } else if (maxLength === word.length) {
          longestWords.push(word);
        }
      }
      return longestWords;
  }
};
