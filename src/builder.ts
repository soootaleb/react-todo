/**
 * This class is a tool to build CSS in JS
 * It leverages method chaining to expose a clean interface to specify components style
 * 
 * @method build Object returns the core style object to apply on components
 * 
 * TODO: Decide wether the core style object is immutable or not:
 *  - Each method can return a new object using spread operator to get the previous object properties
 *  - Each method can alter the core object properties
 * 
 * For the moment, we try to alter the core object.
 * 
 * TODO: We could use the Proxy mechanics
 * 
 * TODO: Increase resiliance by verifying that called methods are adapted (e.g calling justify() after flex())
 */
export class Style {
    
    private style;

    private _mobile;

    /**
     * TODO: Declare an interface that matches CSS as JS & use it in constructor. It'll bring type safety.
     * @param style CSS as JS Objects
     */
    constructor(style: Object) {
        this.style = style;
    }

    public static get device(): {
        mobile: boolean
    } {
        return {
            mobile: window.orientation !== undefined
        };
    }

    public static flex(direction: 'row' | 'column' = 'row'): Style {
        const msMatch = 'screen and (-ms-high-contrast: active), (-ms-high-contrast: none)';
        const microsoft: boolean = matchMedia(msMatch).matches;
        return new Style({
            display: microsoft ? '-ms-flexbox' as '-ms-flexbox' : 'flex' as 'flex',
            MsFlexDirection: direction,
            flexDirection: direction
        });
    }

    public flex(direction: 'row' | 'column' = 'row'): Style {
        const msMatch = 'screen and (-ms-high-contrast: active), (-ms-high-contrast: none)';
        const microsoft: boolean = matchMedia(msMatch).matches;
        this.style.display = microsoft ? '-ms-flexbox' as '-ms-flexbox' : 'flex' as 'flex';
        this.style.MsFlexDirection = direction;
        this.style.flexDirection = direction;
        return this;
    }

    public row(): Style {
        this.style.width = '100%';
        return this;
    }

    public static row(): Style {
        return new Style({
            width: '100%'
        });
    }

    public width(value: number | string): Style {
        this.style.width = value;
        return this;
    }

    public padding(value: number | string): Style {
        this.style.padding = value;
        return this;
    }

    public justify(where:
            'end' |
            'safe' |
            'left' |
            'start' |
            'right' |
            'center' |
            'unsafe' |
            'normal' |
            'stretch' |
            'flex-end' |
            'flex-start' |
            'space-around' |
            'space-evenly' |
            'space-between'
    ): Style {
        this.style.justifyContent = where;
        return this;
    }

    public align(where:
            'end' |
            'safe' |
            'start' |
            'normal' |
            'unsafe' |
            'center' |
            'stretch' |
            'flex-end' |
            'self-end' |
            'baseline' |
            'flex-start' |
            'self-start' 
    ): Style {
        this.style.alignItems = where;
        return this;
    }

    public shrink(value: number): Style {
        this.style.flexShrink = value;
        this.style.MsFlexNegative = value;
        return this;
    }

    public expand(value: number = 1): Style {
        this.style.flex = value;
        this.style.MsFlex = value;
        return this;
    }

    public center(): Style {
        return this.justify('center').align('center');
    }

    public mobile(style: Object): Style {
        this._mobile = {
            ...this._mobile,
            ...style
        };
        return this;
    }

    public build(): Object {
        return Style.device.mobile ? {
            ...this.style,
            ...this._mobile
        } : this.style;
    }
}