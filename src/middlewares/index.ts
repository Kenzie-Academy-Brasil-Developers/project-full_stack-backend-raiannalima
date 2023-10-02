import { idExists } from "./idExists.middleware";
import { handleError } from "./handleError.middleware";
import { validateBody } from "./validateBody.middleware";
import { isAdmin } from "./isAdmin.middleware";
import { uniqueEmail } from "./uniqueEmail.middleware";
import { verifyToken } from "./verifyToken.middleware";

export default { idExists, handleError, validateBody, isAdmin, uniqueEmail, verifyToken };