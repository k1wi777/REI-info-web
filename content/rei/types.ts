export type CommandCategoryId =
  | "proyecto"
  | "work-items"
  | "verificacion"
  | "mantenimiento";

export type CommandCategory = {
  id: CommandCategoryId;
  label: string;
  description: string;
};

export type CommandFlag = {
  flag: string;
  description: string;
};

export type Command = {
  id: string;
  name: string;
  summary: string;
  category: CommandCategoryId;
  flags: CommandFlag[];
  example: string;
};

export type WorkItemStateId =
  | "pending"
  | "ready"
  | "in_progress"
  | "review"
  | "done"
  | "blocked"
  | "changes_requested";

export type WorkItemState = {
  id: WorkItemStateId;
  label: string;
  meaning: string;
  kind: "cycle" | "branch";
  terminal?: boolean;
};

export type AgentRoleId =
  | "leader"
  | "spec-author"
  | "implementer"
  | "reviewer"
  | "initializer";

export type AgentRole = {
  id: AgentRoleId;
  name: string;
  responsibility: string;
  /** Cuándo interviene el rol dentro del arnés. */
  when: string;
  limit: string;
};

export type ApprovalGate = {
  id: string;
  label: string;
  status: string;
  detail: string;
};
