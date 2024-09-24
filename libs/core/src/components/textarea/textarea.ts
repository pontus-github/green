import { TemplateResult } from 'lit'
import { property, query, queryAsync, state } from 'lit/decorators.js'
import { until } from 'lit/directives/until.js'
import { nothing } from 'lit/html.js'
import { when } from 'lit/directives/when.js'
import { choose } from 'lit/directives/choose.js'
import { msg } from '@lit/localize'

import { constrainSlots } from '../../utils/helpers'
import { watch } from '../../utils/decorators'
import { forwardAttributes } from '../../utils/directives'
import { GdsFormControlElement } from '../form/form-control'
import { gdsCustomElement, html } from '../../scoping'
import '../layout/flex'
import { tokens } from '../../tokens.style'
import { styles } from './textarea.styles'
import { styleExpressionProperty } from '../../utils/decorators/style-expression-property'

// Local Components
import '../icon/icons/cross-small'
import '../icon/icons/circle-info'
import '../icon/icons/triangle-exclamation'
import '../layout/flex'
import '../layout/container'
import '../layout/card'
import '../content/text'
import '../badge'
import '../button'

/**
 * @summary A custom input element that can be used in forms.
 * @status beta
 *
 * @element gds-input
 *.
 * @slot lead - Accepts `gds-icon-[ICON_NAME]`. Use this to place an icon in the start of the field.
 * @slot trail - Accepts `gds-badge`. Use this to place a badge in the field, for displaying currency for example.
 * @slot extended-supporting-text - A longer supporting text can be placed here. It will be
 *       displayed in a panel when the user clicks the info button.
 */
@gdsCustomElement('gds-textarea')
export class GdsTextarea extends GdsFormControlElement<string> {
  static styles = [tokens, styles]

  @property()
  value = ''

  /**
   * The label displayed above the field
   */
  @property()
  label = ''

  /**
   * Rows of the textarea
   */
  @styleExpressionProperty({
    valueTemplate: (v) => v,
    selector: 'textarea',
    styleTemplate: (_prop, values) => {
      const ROWS = values[0]
      return `min-height: calc(1lh * ${ROWS});`
    },
  })
  rows = 4

  @state()
  private lines = 4 // Default number of lines
  private isDragging = false // Track dragging state
  private lastMouseY = 0 // Store the last mouse Y position

  /**
   * The supporting text displayed between the label and the field itself
   */
  @property({ attribute: 'supporting-text' })
  supportingText = ''

  /**
   * Whether the supporting text should be displayed or not.
   */
  @property({
    attribute: 'show-extended-supporting-text',
    type: Boolean,
    reflect: true,
  })
  showExtendedSupportingText = false

  /**
   * If the input is Disabled
   */
  @property({
    attribute: 'disabled',
    type: Boolean,
    reflect: true,
  })
  disabled = false

  /**
   * Whether the field should be clearable or not. Clearable fields will display a clear button when
   * the field has a value.
   */
  @property({ type: Boolean })
  clearable = false

  /**
   * Whether the field should be resizeable or not. If set to `false`, the field will not be resizeable.
   *
   * When `auto` (default), the field will disaplay a resize handle and will be resizeable in the vertical direction.
   *
   * The textarea is resizeable based on the `rows` attribute and the content of the textarea by default.
   *
   * @property resize
   *
   */
  @property()
  resize = ''

  /**
   * The maximum number of characters allowed in the field.
   */
  @property({ type: Number })
  maxlength = Number.MAX_SAFE_INTEGER

  /**
   * The variant of the input field. The default variant displays a label, supporting text, and
   * extended supporting text. The floating-label variant only displays the field itself and the
   * supporting text below.
   *
   * The floating-label variant should only be used in specific cases, for example when the input field
   * is placed inside a table cell or in a space-constrained layout.
   *
   * A typical form should use the default variant.
   */
  @property({ type: String })
  variant: 'default' | 'floating-label' = 'default'

  @queryAsync('textarea')
  private elTextareaAsync!: Promise<HTMLTextAreaElement>

  @query('textarea')
  private elTextarea!: HTMLTextAreaElement

  @queryAsync('slot[name="extended-supporting-text"]')
  private elExtendedSupportingTextSlot!: Promise<HTMLSlotElement>

  @state()
  trailSlotOccupied = false

  constructor() {
    super()
    constrainSlots(this)
    this.lines = 0
    this.resize = 'auto'
  }

  connectedCallback(): void {
    super.connectedCallback()
    this._setAutoHeight()
    this.#addResizeHandleListener()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.#addResizeHandleListener()
  }

  render() {
    return html`${choose(this.variant, [
      ['default', () => this.#renderDefault()],
      ['floating-label', () => this.#renderFloatingLabel()],
    ])}`
  }

  protected _getValidityAnchor() {
    return this.elTextarea
  }

  #renderDefault() {
    return html`
      <gds-flex
        flex-direction="column"
        width="100%"
        gap="xs"
        level="3"
        user-select="${this.disabled ? 'none' : 'auto'}"
        pointer-events="${this.disabled ? 'none' : 'auto'}"
        color="${this.disabled
          ? 'disabled'
          : this.invalid
            ? 'negative'
            : 'tertiary'}"
      >
        <gds-flex
          class="head"
          align-items="center"
          justify-content="space-between"
          padding="3xs 0 0 0"
        >
          <gds-flex flex-direction="column">
            <gds-text font-weight="book" font-size="detail-m">
              <label for="input"> ${this.label} </label>
            </gds-text>
            ${when(this.supportingText, () => this.#renderSupportingText())}
          </gds-flex>
          ${until(this.#asyncRenderExtendedSupportingTextButton(), nothing)}
        </gds-flex>

        ${this.#renderExtendedSupportingText()}

        <gds-flex
          position="relative"
          align-items="flex-start"
          justify-content="center"
          gap="xs"
          level="3"
          padding=${!this.trailSlotOccupied ? 's s s m' : 's m s m'}
          border-radius="xs"
          .background=${this.disabled
            ? 'disabled'
            : this.invalid
              ? 'negative-secondary'
              : 'secondary'}
          .border=${this.disabled
            ? ''
            : this.invalid
              ? '4xs/negative'
              : '4xs/secondary'}
          class="field ${this.invalid ? 'invalid' : ''}"
          @click=${this.#handleFieldClick}
          cursor="text"
        >
          ${this.#renderSlotLead()} ${this.#renderNativeTextarea()}

          <gds-flex gap="xs" align-items="center" block-size="l">
            ${this.#renderClearButton()} ${this.#renderSlotTrail()}
          </gds-flex>
          ${when(
            this.resize === 'auto',
            () => this.#renderResizeHandle(),
            () => nothing,
          )}
        </gds-flex>

        <gds-flex
          class="foot"
          align-items="flex-start"
          justify-content="space-between"
          aria-live="polite"
          gap="xl"
        >
          ${when(
            this.invalid,
            () => html`
              <gds-flex align-items="flex-start" gap="xs" margin="2xs 0 0 0">
                <gds-flex min-width="18px">
                  <gds-icon-triangle-exclamation width="18" height="18" solid>
                  </gds-icon-triangle-exclamation>
                </gds-flex>
                <gds-text
                  tag="span"
                  font-size="detail-s"
                  font-weight="book"
                  class="error-text"
                >
                  ${this.validationMessage}
                </gds-text>
              </gds-flex>
            `,
          )}
          <gds-flex
            margin="0 0 0 auto"
            min-width="4ch"
            justify-content="flex-end"
          >
            ${when(this.#shouldShowRemainingChars, () =>
              this.#renderRemainingCharsBadge(),
            )}
          </gds-flex>
        </gds-flex>
      </gds-flex>
    `
  }

  // variant="floatingLabel"
  #renderFloatingLabel() {
    return nothing
  }

  // Any attribute name added here will get forwarded to the native <input> element.
  #forwardableAttrs = (attr: Attr) =>
    ['type', 'placeholder', 'required'].includes(attr.name)

  #handleOnInput = (e: Event) => {
    const element = e.target as HTMLInputElement
    this.value = element.value
  }

  #handleOnChange = (e: Event) => {
    const element = e.target as HTMLInputElement
    this.value = element.value
    this.dispatchEvent(
      new Event('change', {
        bubbles: true,
        composed: true,
      }),
    )
  }

  @watch('value')
  private _setAutoHeight() {
    this.elTextareaAsync.then((element) => {
      const lines = (element.value.split('\n').length || 1).toString()
      element?.style.setProperty('--_lines', lines.toString())
    })
  }

  #handleFieldClick = () => {
    this.elTextareaAsync.then((el) => el.focus())
  }

  #handleClearBtnClick = () => {
    this.value = ''
  }

  #handleSupportingTextBtnClick = () => {
    this.showExtendedSupportingText = !this.showExtendedSupportingText
    this.dispatchEvent(
      new CustomEvent('gds-ui-state', {
        bubbles: true,
        composed: true,
        detail: this.showExtendedSupportingText,
      }),
    )
  }

  #renderSlotLead() {
    return html` <slot name="lead"></slot> `
  }

  #renderSlotTrail() {
    return html`
      <slot
        name="trail"
        gds-allow="gds-badge"
        @slotchange=${this.#handleSlotChange}
      ></slot>
    `
  }

  #addResizeHandleListener() {
    const resizeHandle = this.querySelector('.resize-handle')
    if (resizeHandle) {
      resizeHandle.addEventListener(
        'mousedown',
        this.#startDragging.bind(this) as EventListener,
      )
    }
  }

  #startDragging(event: MouseEvent) {
    event.preventDefault() // Prevent default behavior
    this.isDragging = true // Set dragging state to true
    this.lastMouseY = event.clientY // Store the initial mouse position
    document.addEventListener('mousemove', this.#onDrag.bind(this))
    document.addEventListener('mouseup', this.#stopDragging.bind(this))
  }

  #onDrag(event: MouseEvent) {
    if (!this.isDragging) return // If not dragging, return
    const deltaY = event.clientY - this.lastMouseY // Calculate the movement in Y direction

    // Check if the movement exceeds the threshold (10 or 20 pixels)
    if (Math.abs(deltaY) >= 20) {
      if (deltaY > 0) {
        // Dragging down, increase lines
        this.lines += 1
      } else {
        // Dragging up, decrease lines
        this.lines = Math.max(1, this.lines - 1) // Ensure lines do not go below 1
      }

      this.elTextareaAsync.then((element) => {
        element?.style.setProperty('--_lines', this.lines.toString())
      })

      // Update lastMouseY to the current position
      this.lastMouseY = event.clientY
    }
  }

  #stopDragging() {
    this.isDragging = false // Set dragging state to false
    document.removeEventListener('mousemove', this.#onDrag.bind(this))
    document.removeEventListener('mouseup', this.#stopDragging.bind(this))
  }

  #renderResizeHandle() {
    return html`
      <gds-container
        class="resize-handle"
        position="absolute"
        inset="auto auto -10px 0"
        width="100%"
        height="20px"
        cursor="row-resize"
        z-index="2"
        @mousedown=${this.#startDragging}
      ></gds-container>
    `
  }

  #handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement
    const assignedNodes = slot.assignedNodes({ flatten: true })
    this.trailSlotOccupied =
      assignedNodes.length > 0 &&
      assignedNodes.some(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE ||
          (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== ''),
      )
  }

  #renderNativeTextarea() {
    return html`
      <textarea
        @input=${this.#handleOnInput}
        @change=${this.#handleOnChange}
        .value=${this.value}
        id="input"
        style="${this.invalid
          ? 'color: var(--gds-color-l3-content-negative);'
          : this.disabled
            ? 'color: currentColor;pointer-events:none;'
            : null}"
        aria-describedby="supporting-text"
        placeholder=" "
        ${forwardAttributes(this.#forwardableAttrs)}
      ></textarea>
    `
  }

  #renderSupportingText() {
    return html`
      <gds-text
        level="3"
        font-size="detail-m"
        .color="${this.disabled
          ? 'disabled'
          : this.invalid
            ? 'negative'
            : 'tertiary'}"
        class="supporting-text"
        id="supporting-text"
      >
        ${this.supportingText}
      </gds-text>
    `
  }

  #renderExtendedSupportingText() {
    return html`
      <gds-card
        level="3"
        display="${this.showExtendedSupportingText ? 'block' : 'none'}"
        class="extended-supporting-text"
        padding="s m"
        border-radius="xs"
        background="secondary"
        color="tertiary"
      >
        <gds-text
          font-size="body-s"
          display="${this.showExtendedSupportingText ? 'block' : 'none'}"
        >
          <slot
            name="extended-supporting-text"
            @slotchange=${() => this.requestUpdate()}
          ></slot>
        </gds-text>
      </gds-card>
    `
  }

  #renderClearButton() {
    if (this.clearable && this.value.length > 0)
      return html`
        <gds-button
          size="small"
          rank="tertiary"
          variant="${this.invalid ? 'negative' : ''}"
          ?disabled="${this.disabled}"
          label="${msg('Clear input')}"
          @click=${this.#handleClearBtnClick}
        >
          <gds-icon-cross-small />
        </gds-button>
      `
    else return nothing
  }

  get #shouldShowRemainingChars() {
    return this.maxlength < Number.MAX_SAFE_INTEGER
  }

  #renderRemainingCharsBadge() {
    const remaining = this.maxlength - this.value.length
    let variant
    if (remaining < 0) {
      variant = 'negative'
    } else if (remaining < 20) {
      variant = 'warning'
    } else {
      variant = 'positive'
    }
    return html`<gds-badge variant="${variant}">${remaining}</gds-badge>`
  }

  /**
   * Returns a promise that resolves when the DOM query for the extended supporting text slot has resolved.
   * If the slot is empty, an empty template is returned, otherwise the support text toggle button is returned.
   */
  async #asyncRenderExtendedSupportingTextButton(): Promise<TemplateResult> {
    return this.elExtendedSupportingTextSlot.then((slot) => {
      if (slot && slot.assignedElements().length > 0)
        return html`
          <gds-button
            size="small"
            rank="tertiary"
            label="${msg('Show extended supporting text')}"
            @click=${this.#handleSupportingTextBtnClick}
          >
            <gds-icon-circle-info ?solid=${this.showExtendedSupportingText} />
          </gds-button>
        `
      else return nothing
    })
  }
}
