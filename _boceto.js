// Modo boceto compartido. Agrega el filtro de trazo y envuelve cada texto en .ln para dibujarlo como líneas.
;(() => {
  document.body.insertAdjacentHTML('afterbegin', '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="rough"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="5"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter></svg>')
  if (!location.search.includes('sketch')) return
  document.body.classList.add('sketch')
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (n.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT) })
  const nodes = []
  while (walker.nextNode()) nodes.push(walker.currentNode)
  nodes.forEach((n) => {
    if (n.parentElement.closest('svg, style, script')) return
    const s = document.createElement('span')
    s.className = 'ln'
    n.replaceWith(s)
    s.append(n)
  })
})()
