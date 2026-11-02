import type { FaqCopy } from "@/features/faq/types";

export const en: FaqCopy = {
  eyebrow: "Operations",
  description:
    "Real questions about parallel Work Items, direct changes, checks, git, history and the documentation you need.",
  metaTemplate: "{questions} questions · {topics} topics",
  themes: {
    "work-items": {
      title: "Work Items and approval",
      items: [
        {
          question: "Can I have several Work Items in parallel?",
          answer:
            "Not at the same time in the in_progress state: REI allows only one active at a time. You can have several pending ones waiting their turn. The limit is hard; `rei check`, `rei doctor` and `rei items status` fail if they detect more than one.",
        },
        {
          question: "How do I approve a plan or ask for changes?",
          answer:
            "Approval is given in the chat or the terminal; the Leader runs `rei status set <id> in_progress`. If something does not reflect what was agreed, ask the Spec Author to update the plan. The `rei view` viewer is read-only and does not replace your answer.",
        },
      ],
    },
    "cambios-directos": {
      title: "Direct changes",
      items: [
        {
          question: "Can I change something without opening a Work Item?",
          answer:
            "Only if it is a trivial change (documentation, typo, formatting or comment) and you explicitly ask for it as a “direct change” or “no Work Item”. The Leader confirms with you, applies the change and verifies it; it leaves no plan or record. If it touches behavior, security, data, dependencies, public API, architecture or more than one file, it refuses and offers a Task or a Feature.",
        },
      ],
    },
    verificacion: {
      title: "Verification and checks",
      items: [
        {
          question: "Where do I declare my project's checks?",
          answer:
            "In `.rei/config.json`. `rei check` runs those commands and reflects the result in its exit code. Slow checkpoints, such as the production build, are documented in `.rei/docs/project/verification.md` and run when the Work Item is closed.",
        },
        {
          question: "What do I do if rei check fails because of a project check?",
          answer:
            "It means a project command failed. Review the details in the output, fix the problem and run it again before requesting review. A failed verification is never ignored.",
        },
      ],
    },
    git: {
      title: "Git, history and documentation",
      items: [
        {
          question: "Does REI need git?",
          answer:
            "No, but it works better with it. If the repository uses `git`, the Reviewer reviews only the real changes of the Work Item with `rei review-diff`. `rei check` initializes `git` automatically if it does not exist.",
        },
        {
          question: "Where can I see the history of everything that has been done?",
          answer:
            "In `.rei/progress/history.md`, a permanent record that is never overwritten. The state of the active session lives in `.rei/progress/current.md` and the detail of each Work Item in `.rei/progress/work-items/`.",
        },
        {
          question: "Do I need to read all the documentation in .rei/docs/?",
          answer:
            "No. Agents load only what each stage needs. As a person, read `.rei/docs/project/` for the project rules and `.rei/docs/harness/` for the details of the harness.",
        },
      ],
    },
  },
};
