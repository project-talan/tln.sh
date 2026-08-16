export type TerminalBlock = {
  comment?: string;
  command?: string;
  result?: string;
  resultTone?: 'success' | 'muted';
};
