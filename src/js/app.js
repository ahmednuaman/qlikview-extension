Qva.AddExtension('Org/Ext', function () {
  Qva.LoadCSS(Qva.Remote + (Qva.Remote.indexOf('?') >= 0 ? '&' : '?') + 'public=only&name=Extensions/Ext/styles.css')
}, true)
