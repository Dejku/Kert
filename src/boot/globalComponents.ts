import { boot } from 'quasar/wrappers'

const globalComponents = {
  'BaseButton': 'BaseButton',
}

export default boot(({ app }) => {
  Object.entries(globalComponents).forEach(async ([name, component]) => await import(`../components/~Global/${component}.vue`).then(component => app.component(name, component.default)))
})