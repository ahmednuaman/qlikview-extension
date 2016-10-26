Qva.AddExtension('Org/Ext', function () {
  const urlPrefix = Qva.Remote + (Qva.Remote.indexOf('?') >= 0 ? '&' : '?') + 'public=only&name='

  Qva.LoadCSS(`${urlPrefix}Extensions/Ext/asset/css/styles.css`)

  this.Element.innerHTML = 'Hello!'
}, true)
