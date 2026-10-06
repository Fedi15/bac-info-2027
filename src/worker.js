import { registerLead } from "../api/register.js";
import { listLeads } from "../api/leads.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    try {
      if (url.pathname === "/api/register") {
        return await registerLead(request, env);
      }

      if (url.pathname === "/api/leads") {
        return await listLeads(request, env);
      }

      return await env.ASSETS.fetch(request);
    } catch (error) {
      console.error("Worker error:", error);
      return Response.json({ ok: false, error: "Server error" }, { status: 500 });
    }
  }
};
