import type {
  Accordion,
  Carousel,
  Collapse,
  Dial,
  Dismiss,
  Drawer,
  Dropdown,
  Modal,
  Popover,
  Tabs,
  Tooltip,
  InputCounter,
  CopyClipboard,
  Datepicker,
} from "flowbite";

type FlowbiteModules = {
  default: typeof import("flowbite");
  Accordion: Accordion;
  Carousel: Carousel;
  Collapse: Collapse;
  Dial: Dial;
  Dismiss: Dismiss;
  Drawer: Drawer;
  Dropdown: Dropdown;
  Modal: Modal;
  Popover: Popover;
  Tabs: Tabs;
  Tooltip: Tooltip;
  InputCounter: InputCounter;
  CopyClipboard: CopyClipboard;
  Datepicker: Datepicker;
  initAccordions: () => void;
  initCarousels: () => void;
  initCollapses: () => void;
  initDials: () => void;
  initDismisses: () => void;
  initDrawers: () => void;
  initDropdowns: () => void;
  initModals: () => void;
  initPopovers: () => void;
  initTabs: () => void;
  initTooltips: () => void;
  initInputCounters: () => void;
  initCopyClipboards: () => void;
  initDatepickers: () => void;
  initFlowbite: () => void;
};

export function useFlowbite(
  callback: (modules?: FlowbiteModules) => void
): void {
  if (import.meta.client) {
    import("flowbite").then((flowbite) => {
      const modules: unknown = flowbite;
      callback(modules as FlowbiteModules);
    });
  } else {
    callback();
  }
}
