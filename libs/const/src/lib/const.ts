export const MODAL_STATE = {
  OPEN: true,
  CLOSE: false,
} as const;

export type ModalState = typeof MODAL_STATE[keyof typeof MODAL_STATE];
