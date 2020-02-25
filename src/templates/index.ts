
const main = (title: string, content: string) => {
  return (`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        ${content}
      </body>
    </html>  
  `)
}

export const index = main('Welcome page', '<div id="app"/>')

export const error = (errorMessage: string) => main('Error page', `
  <h3>Something is wrong</h3>
  <p>
    ${errorMessage}
  </p>
`)