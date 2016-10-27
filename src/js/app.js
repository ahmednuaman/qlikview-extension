import $ from 'jquery'

const EXT_NAME = 'Ext'
const URL_PREFIX = Qva.Remote + (Qva.Remote.indexOf('?') >= 0 ? '&' : '?') + `public=only&name=Extensions/${EXT_NAME}/`

$(() => {
  Qva.LoadCSS(`${URL_PREFIX}asset/css/app.css`)

  Qv.AddExtension(EXT_NAME, function () {
    console.log(this.Data.Rows)

    this.Element.innerHTML = '<div class="some-element">hello!</div>'
  })
})
