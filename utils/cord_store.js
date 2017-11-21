import { CordStore } from 'utils/cord'
import { get, post } from 'utils/api_http'

const cord_store = new CordStore({
  base_url: `/api/v2`,
  http_methods: { get, post },
})

cord_store.register(require(`cords/person`).default)
cord_store.register(require(`cords/article`).default)
cord_store.register(require(`cords/admin_article`).default)
cord_store.register(require(`cords/course`).default)
cord_store.register(require(`cords/company`).default)
cord_store.register(require(`cords/company_membership`).default)
cord_store.register(require(`cords/document`).default)
cord_store.register(require(`cords/course_group`).default)
cord_store.register(require(`cords/business_plan/appendix`).default)
cord_store.register(require(`cords/business_plan/attachment`).default)
cord_store.register(require(`cords/business_plan/business_plan`).default)
cord_store.register(require(`cords/business_plan/competitor`).default)
cord_store.register(require(`cords/business_plan/key_person`).default)
cord_store.register(require(`cords/business_plan/page_template`).default)
cord_store.register(require(`cords/business_plan/page`).default)
cord_store.register(require(`cords/lesson`).default)
cord_store.register(require(`cords/quiz/quiz`).default)
cord_store.register(require(`cords/quiz/question`).default)
cord_store.register(require(`cords/quiz/answer`).default)
cord_store.register(require(`cords/forum/question`).default)
cord_store.register(require(`cords/forum/answer`).default)
cord_store.register(require(`cords/section`).default)
cord_store.register(require(`cords/poll`).default)
cord_store.register(require(`cords/properties`).default)
cord_store.register(require(`cords/attachment`).default)
cord_store.register(require(`cords/event`).default)
cord_store.register(require(`cords/video`).default)
cord_store.register(require(`cords/properties`).default)
cord_store.register(require(`cords/motd`).default)
cord_store.register(require(`cords/notification`).default)
cord_store.register(require(`cords/sulform`).default)
cord_store.register(require(`cords/page`).default)
cord_store.register(require(`cords/action`).default)
cord_store.register(require(`cords/email`).default)

export default cord_store
