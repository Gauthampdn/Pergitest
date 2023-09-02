const defaultTemplates = [
  {
    title: "Pergi Tutorial",
    description: "This is how to use Pergi",
    image: "",
    icon: "",
    template: [
      {
        type: "header",
        context: "These are headers where whatever you want to type and have preset",
      },
      {
        type: "textbox",
        context: "Textboxes are where you have the text you would rewrite",
      },
      {
        type: "selector",
        context: ["easy", "medium", "hard"],
      },
      {
        type: "header",
        context: "Lastly click submit to send the full message to the AI",
      }
    ],
  },
  // ... you can add more default templates here if needed
];

module.exports = defaultTemplates;
