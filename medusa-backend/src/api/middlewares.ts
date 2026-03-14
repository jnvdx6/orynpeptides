import {
  defineMiddlewares,
  validateAndTransformBody,
} from "@medusajs/framework/http"
import { PostStoreContactSchema } from "./store/contact/validators"
import { PostStoreNewsletterSchema } from "./store/newsletter/validators"
import { PostStoreWishlistSchema } from "./store/wishlist/validators"

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/contact",
      method: "POST",
      middlewares: [validateAndTransformBody(PostStoreContactSchema)],
    },
    {
      matcher: "/store/newsletter",
      method: "POST",
      middlewares: [validateAndTransformBody(PostStoreNewsletterSchema)],
    },
    {
      matcher: "/store/wishlist",
      method: "POST",
      middlewares: [validateAndTransformBody(PostStoreWishlistSchema)],
    },
  ],
})
