import { ABColors } from './enumerations';
import ABButton from './components/ABButton';

export const baseShadow = {
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
};

export const buttonBackground = (button: ABButton) => ({
    backgroundColor: button.state.hover ? ABColors.MINOR : ABColors.CATCHY
});