import { gdsCustomElement } from '../../../utils/helpers/custom-element-scoping'
import { GdsIcon } from '../icon'

/**
 * @element gds-icon-bubble-question
 */
@gdsCustomElement('gds-icon-bubble-question')
export class IconBubbleQuestion extends GdsIcon {
  /** @private */
  static _regularSVG = `<path d="M3.75 3.75V3C3.33579 3 3 3.33579 3 3.75H3.75ZM20.25 3.75H21C21 3.33579 20.6642 3 20.25 3V3.75ZM20.25 18.25V19C20.6642 19 21 18.6642 21 18.25H20.25ZM3.75 18.25H3C3 18.6642 3.33579 19 3.75 19V18.25ZM11.9979 20.75L11.5161 21.3248C11.7936 21.5574 12.1976 21.5585 12.4764 21.3275L11.9979 20.75ZM15.0155 18.25V17.5C14.8408 17.5 14.6716 17.561 14.537 17.6725L15.0155 18.25ZM9.0155 18.25L9.49731 17.6752C9.36227 17.562 9.1917 17.5 9.0155 17.5V18.25ZM11.2804 11.8019C11.2188 12.2116 11.501 12.5935 11.9106 12.655C12.3203 12.7165 12.7022 12.4343 12.7637 12.0247L11.2804 11.8019ZM12.8816 10.6136L13.3032 11.2339L13.3032 11.2338L12.8816 10.6136ZM9.87366 9.42768C9.87366 9.8419 10.2094 10.1777 10.6237 10.1777C11.0379 10.1777 11.3737 9.8419 11.3737 9.42768H9.87366ZM3.75 4.5H20.25V3H3.75V4.5ZM19.5 3.75V18.25H21V3.75H19.5ZM4.5 18.25V3.75H3V18.25H4.5ZM20.25 17.5H15.0155V19H20.25V17.5ZM14.537 17.6725L11.5194 20.1725L12.4764 21.3275L15.494 18.8275L14.537 17.6725ZM12.4797 20.1752L9.49731 17.6752L8.5337 18.8248L11.5161 21.3248L12.4797 20.1752ZM9.0155 17.5H3.75V19H9.0155V17.5ZM12.7637 12.0247C12.796 11.8096 12.8675 11.6643 12.9495 11.5539C13.0361 11.4375 13.1522 11.3365 13.3032 11.2339L12.46 9.99327C11.9841 10.3167 11.4245 10.842 11.2804 11.8019L12.7637 12.0247ZM13.3032 11.2338C13.7232 10.9483 14.3737 10.4252 14.3737 9.42768H12.8737C12.8737 9.56123 12.8379 9.6406 12.7876 9.70897C12.7249 9.79415 12.6241 9.88168 12.4599 9.99332L13.3032 11.2338ZM14.3737 9.42768C14.3737 8.18351 13.3734 7.16333 12.1237 7.16333V8.66333C12.5315 8.66333 12.8737 8.99844 12.8737 9.42768H14.3737ZM12.1237 7.16333C10.874 7.16333 9.87366 8.18351 9.87366 9.42768H11.3737C11.3737 8.99844 11.7158 8.66333 12.1237 8.66333V7.16333Z" fill="currentColor"/><path d="M11.25 14.25C11.25 14.6642 11.5858 15 12 15C12.4142 15 12.75 14.6642 12.75 14.25C12.75 13.8358 12.4142 13.5 12 13.5C11.5858 13.5 11.25 13.8358 11.25 14.25Z" fill="currentColor" stroke="currentColor" stroke-width="0.5"/>`
  /** @private */
  static _solidSVG = `<path fill-rule="evenodd" clip-rule="evenodd" d="M3 3.75C3 3.33579 3.33579 3 3.75 3H20.25C20.6642 3 21 3.33579 21 3.75V18.25C21 18.6642 20.6642 19 20.25 19H15.2858L12.4764 21.3275C12.1976 21.5585 11.7936 21.5574 11.5161 21.3248L8.74274 19H3.75C3.33579 19 3 18.6642 3 18.25V3.75ZM9.87366 9.42768C9.87366 8.18351 10.874 7.16333 12.1237 7.16333C13.3734 7.16333 14.3737 8.18351 14.3737 9.42768C14.3737 10.4252 13.7232 10.9483 13.3032 11.2338C13.1522 11.3364 13.0361 11.4375 12.9495 11.5539C12.8674 11.6643 12.796 11.8096 12.7637 12.0247C12.7022 12.4343 12.3203 12.7165 11.9106 12.655C11.501 12.5935 11.2188 12.2116 11.2804 11.8019C11.4245 10.8421 11.984 10.3168 12.4599 9.99332C12.6241 9.8817 12.7249 9.79414 12.7876 9.70897C12.8379 9.6406 12.8737 9.56123 12.8737 9.42768C12.8737 8.99844 12.5315 8.66333 12.1237 8.66333C11.7158 8.66333 11.3737 8.99844 11.3737 9.42768C11.3737 9.8419 11.0379 10.1777 10.6237 10.1777C10.2094 10.1777 9.87366 9.8419 9.87366 9.42768ZM12 15.25C11.4477 15.25 11 14.8023 11 14.25C11 13.6977 11.4477 13.25 12 13.25C12.5523 13.25 13 13.6977 13 14.25C13 14.8023 12.5523 15.25 12 15.25Z" fill="currentColor"/>`
  /** @private */
  static _name = 'bubble-question'
}
