import "../../story/docDemo.css"
import "../../story/tailwind.min.css"
export const parameters = {
  // layout: 'centered',
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
