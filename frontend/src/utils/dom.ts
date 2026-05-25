export function getShadowInput(container: HTMLElement, selector: string): string {
  const el = container.querySelector(selector) as HTMLElement & { shadowRoot?: ShadowRoot }
  const input = el?.shadowRoot?.querySelector("input") as HTMLInputElement
  return input?.value?.trim() ?? ""
}

export function onShadowBtn(container: HTMLElement, selector: string, fn: () => void) {
  setTimeout(() => {
    const btn = container.querySelector(selector) as HTMLElement & { shadowRoot?: ShadowRoot }
    btn?.shadowRoot?.querySelector("button")?.addEventListener("click", fn)
  }, 100)
}
