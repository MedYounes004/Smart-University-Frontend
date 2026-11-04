const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081/api";

export type AuthUser = { id: string; firstName: string; lastName: string; email: string; role: "student" | "professor" | "admin" | "department_head" | "club_delegate"; studentId?: string; employeeId?: string };
type AuthResponse = { token: string; user: AuthUser };

export function getToken() { return localStorage.getItem("smart_university_token"); }
export function getCurrentUser(): AuthUser | null { const raw=localStorage.getItem("smart_university_user"); return raw ? JSON.parse(raw) : null; }
export function saveSession(data: AuthResponse) { localStorage.setItem("smart_university_token", data.token); localStorage.setItem("smart_university_user", JSON.stringify(data.user)); }
export function clearSession() { localStorage.removeItem("smart_university_token"); localStorage.removeItem("smart_university_user"); }

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
  const token=getToken(); if(token) headers.set("Authorization", `Bearer ${token}`);
  const response=await fetch(`${API_URL}${path}`, {...options, headers});
  const body= response.status===204 ? null : await response.json().catch(()=>null);
  if(!response.ok) throw new Error(body?.message || body?.error || `Request failed (${response.status})`);
  return body as T;
}

export const api = {
  login: async (email:string,password:string) => { const data=await request<AuthResponse>("/auth/login",{method:"POST",body:JSON.stringify({email,password})}); saveSession(data); return data; },
  register: async (payload:Record<string,unknown>) => { const data=await request<AuthResponse>("/auth/register",{method:"POST",body:JSON.stringify(payload)}); saveSession(data); return data; },
  me: () => request<AuthUser>("/auth/me"),
  list: <T=Record<string,unknown>>(resource:string) => request<T[]>(`/${resource}`),
  create: <T=Record<string,unknown>>(resource:string,payload:Record<string,unknown>) => request<T>(`/${resource}`,{method:"POST",body:JSON.stringify(payload)}),
  update: <T=Record<string,unknown>>(resource:string,id:string,payload:Record<string,unknown>) => request<T>(`/${resource}/${id}`,{method:"PUT",body:JSON.stringify(payload)}),
  remove: (resource:string,id:string) => request<void>(`/${resource}/${id}`,{method:"DELETE"}),
  askAssistant: (question:string) => request<{answer:string;sources:string[]}>("/assistant/ask",{method:"POST",body:JSON.stringify({question})}),
};
