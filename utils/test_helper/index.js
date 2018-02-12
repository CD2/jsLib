import ComponentTest from "./component_test"
import SceneTest from "./Scene_test"

jest.mock(`tinymce`)
jest.mock(`axios`)
jest.mock(`utils/query`)
jest.mock(`utils/auth`)

// noinspection JSAnnotator
window.localStorage = { getItem: () => `{data:[1,2,3]}` }
window.Intercom = () => {}

export default {
  describe_component: (...args) => new ComponentTest(...args),
  describe_Scene: (...args) => new SceneTest(...args),
}
