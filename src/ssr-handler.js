import React from 'react'
import ReactDOMServer from 'react-dom/server'

import App from '../src/App.js'

function handleRender (assets) {
  assets = assets || null

  return function (req, res) {
    const html = ReactDOMServer.renderToString(<App />)

    res.render('index.hbs', {
      title: 'React Reference Project',
      assets: assets,
      html: html,
    })
  }
}

module.exports = handleRender
