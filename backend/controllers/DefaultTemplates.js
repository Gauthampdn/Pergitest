const defaultTemplates = [
  {
    title: "Email Editing ",
    description: "Make your emails sound more of professional",
    image: "",
    icon: "",
    template: [
      {
        type: "header",
        context: "Edit the below email to sound professional and with clarity:",
      },
      {
        type: "textbox",
        context: "Paste email here",
      }
    ],
  },
  {
    title: "Cover Letter Editing",
    description: "Edit your cover letter professionally.",
    image: "",
    icon: "",
    template: [
      {
        type: "header",
        context: "Below is my cover letter, and I want you to make it sound more concise and reword it so that I seem like an apt candidate for the job:",
      },
      {
        type: "textbox",
        context: "Cover letter here",
      },
    ],
  },
  {
    title: "Explainer",
    description: "Explains topics better",
    image: "",
    icon: "",
    template: [
      {
        type: "header",
        context: "Explain the following topic with analogies and examples:",
      },
      {
        type: "textbox",
        context: "Topic",
      },
      {
        type: "selector",
        context: [". Be concise", ". Explain thouroughly"],
      },
    ],
  },
  {
    title: "Essay Improver",
    description: "Edits your essays to sound better",
    image: "",
    icon: "",
    template: [
      {
        type: "header",
        context: "Below is an essay for one of my classes, and the topic/prompt is ",
      },
      {
        type: "textbox",
        context: "Topic/prompt",
      },
      {
        type: "header",
        context: "and this is my essay:",
      },      {
        type: "textbox",
        context: "essay",
      },
      {
        type: "header",
        context: " I want you to edit the essay below with the following suggestions:",
      },
      {
        type: "textbox",
        context: "suggestions",
      },
      {
        type: "headers",
        context: "Also do the following:",
      },
      {
        type: "selector",
        context: ["Be concise ", "Use sophisticated vocab", "Expand on the ideas more"],
      },
    ],
  },
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
];

module.exports = defaultTemplates;
