import { TDColors } from './enumerations';
import TDButton from './components/TDButton';

export const baseShadow = {
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
};

export const buttonBackground = (button: TDButton) => ({
    backgroundColor: button.state.hover ? TDColors.MINOR : TDColors.CATCHY
});