export const parameters = {
  options: {
    storySort: (a, b) => {
      return a.id.localeCompare(b.id, undefined, { numeric: true })
    },
  },
  actions: {
    argTypesRegex: "^on[A-Z].*",
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
