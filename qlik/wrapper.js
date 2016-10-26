((Qva, window, Element) => {
  const head = window.document.head
  const body = window.document.body

  const QvaURL = (url) => url.indexOf(Qva.Remote) === 0 ? url.replace(/.+Extensions\/[^\/]+/, '') : url

  const QvaModule = {
    Element
  }

  Qva.Remote = window.location.href

  Qva.AddExtension = (path, run) => {
    run.apply(QvaModule)
  }

  Qva.LoadCSS = (url) => {
    const el = window.document.createElement('link')

    el.rel = 'stylesheet'
    el.href = QvaURL(url)

    head.appendChild(el)
  }

  Qva.LoadScript = (url) => {
    const el = window.document.createElement('script')

    el.src = QvaURL(url)

    head.appendChild(el)
  }
})((window.Qva = {}), window, document.getElementById('container'))
