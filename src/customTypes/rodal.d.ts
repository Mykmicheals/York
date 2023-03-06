declare module "rodal" {
  export interface RodalProps {
    visible: boolean;
    onClose?: () => void;
    onAnimationEnd?: () => void;
    width?: number | string;
    height?: number | string;
    measure?: "px" | "%";
    customStyles?: Record<string, string>;
    className?: string;
    showCloseButton?: boolean;
    closeOnEsc?: boolean;
    closeMaskOnClick?: boolean;
    showMask?: boolean;
    animation?: "zoom" | "fade" | "flip";
    duration?: number;
    closeTimeout?: number;
    enterAnimation?: string;
    leaveAnimation?: string;
    closeAnimation?: string;
    customMaskStyles?: Record<string, string>;
    zIndex?: number;
  }

  export default class Rodal extends React.Component<RodalProps> {}
}
