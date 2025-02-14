import type { Components, JSX } from "../types/components";

interface PollParty extends Components.PollParty, HTMLElement {}
export const PollParty: {
  prototype: PollParty;
  new (): PollParty;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
