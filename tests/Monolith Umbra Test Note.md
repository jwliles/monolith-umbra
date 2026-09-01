---
aliases: [Theme fixture]
cssclasses: [table-wide]
tags: [theme, visual-test]
score: 12345.67
reviewed: 2026-08-31
---

# Heading one
## Heading two
### Heading three
#### Heading four
##### Heading five
###### Heading six

Plain text with **bold**, *italic*, ==highlighted text==, `inline code`, an
[[Internal link]], an [external link](https://obsidian.md/), and <kbd>Ctrl</kbd>
+ <kbd>K</kbd>.

> A blockquote with **formatting**, `code`, and a [[link]].

---

## Lists and tasks

- Unordered item
  - Nested item
1. Ordered item
   1. Nested ordered item
- [ ] Open task
- [x] Completed task
- [/] Incomplete
- [-] Cancelled
- [>] Forwarded
- [<] Scheduled
- [?] Question
- [!] Important
- [*] Star
- ["] Quote
- [l] Location
- [b] Bookmark
- [i] Information
- [S] Savings
- [I] Idea
- [p] Pro
- [c] Con
- [f] Fire
- [k] Key
- [w] Win
- [u] Up
- [d] Down

## Code

```javascript
// Long line verifies horizontal scrolling rather than wrapping.
const palette = { name: "Monolith Umbra", enabled: true, count: 42, deliberatelyLongPropertyName: "abcdefghijklmnopqrstuvwxyz" };
console.log(palette.name);
```

## Tables

| Name | State | Count | Description |
| --- | --- | ---: | --- |
| Alpha | Active | 1 | First row |
| Beta | Waiting | 20 | Second row |
| Gamma | Disabled | 300 | Third row with a deliberately long cell to test nowrap behavior |

## Math

Inline math: $e^{i\pi}+1=0$.

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$

## Callouts

> [!note] Note
> Standard informational callout.

> [!warning] Warning
> Warning state.

> [!failure] Failure
> Error state.

> [!success] Success
> Success state.

## Embeds

Add local fixtures here when testing in a vault:

- `![[sample-note]]`
- `![[sample-image.png]]`
- `![[sample-document.pdf]]`

## Tags

#alpha #beta #gamma #selected-state
