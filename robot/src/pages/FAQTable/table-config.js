export const caption = "This is where you can add, edit and delete Harolds answers to Frequently Asked Questions";
export const createHead = withWidth => {
  return {
    cells: [
      {
        key: "question",
        content: "Question",
        isSortable: true,
        width: withWidth ? 15 : undefined
      },
      {
        key: "answer",
        content: "Answer",
        shouldTruncate: true,
        isSortable: false,
        width: withWidth ? 35 : undefined
      },
      {
        key: "more",
        shouldTruncate: false,
        width: withWidth ? 15 : undefined
      }
    ]
  };
};
export const head = createHead(true);