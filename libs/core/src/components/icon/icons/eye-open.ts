import { gdsCustomElement } from '../../../utils/helpers/custom-element-scoping'
import { GdsIcon } from '../icon'

/**
 * @element gds-icon-eye-open
 */
@gdsCustomElement('gds-icon-eye-open')
export class IconEyeOpen extends GdsIcon {
  /** @private */
  static _regularSVG = `<path d="M2 11.9999L1.32902 11.6648C1.22366 11.8758 1.22366 12.124 1.32902 12.335L2 11.9999ZM22 12L22.671 12.3351C22.7763 12.1241 22.7763 11.8759 22.671 11.6649L22 12ZM2.67098 12.335C4.9893 7.69273 8.55546 5.49997 12 5.5C15.4445 5.50003 19.0107 7.69284 21.329 12.3351L22.671 11.6649C20.1618 6.64058 16.1417 4.00003 12 4C7.85827 3.99997 3.83815 6.64046 1.32902 11.6648L2.67098 12.335ZM1.32902 12.335C3.83815 17.3593 7.85826 19.9999 12 19.9999C16.1417 20 20.1618 17.3595 22.671 12.3351L21.329 11.6649C19.0107 16.3072 15.4445 18.4999 12 18.4999C8.55547 18.4999 4.9893 16.3071 2.67098 11.6648L1.32902 12.335ZM14.5 12C14.5 13.3807 13.3807 14.5 12 14.5V16C14.2091 16 16 14.2091 16 12H14.5ZM12 14.5C10.6193 14.5 9.5 13.3807 9.5 12H8C8 14.2091 9.79086 16 12 16V14.5ZM9.5 12C9.5 10.6193 10.6193 9.5 12 9.5V8C9.79086 8 8 9.79086 8 12H9.5ZM12 9.5C13.3807 9.5 14.5 10.6193 14.5 12H16C16 9.79086 14.2091 8 12 8V9.5Z" fill="currentColor"/>`
  /** @private */
  static _solidSVG = `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.1417 4.00003 20.1618 6.64058 22.671 11.6649C22.7763 11.8759 22.7763 12.1241 22.671 12.3351C20.1618 17.3595 16.1417 20 12 19.9999C7.85826 19.9999 3.83815 17.3593 1.32902 12.335C1.22366 12.124 1.22366 11.8758 1.32902 11.6648C3.83815 6.64046 7.85827 3.99997 12 4ZM8.375 12C8.375 9.99797 9.99797 8.375 12 8.375C14.002 8.375 15.625 9.99797 15.625 12C15.625 14.002 14.002 15.625 12 15.625C9.99797 15.625 8.375 14.002 8.375 12Z" fill="currentColor"/>`
  /** @private */
  static _name = 'eye-open'
}
