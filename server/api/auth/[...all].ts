import { auth } from "../../../app/lib/auth";

export default defineEventHandler(event => auth.handler(toWebRequest(event)));
