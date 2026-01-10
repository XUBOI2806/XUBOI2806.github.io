// import { useQuery, useMutation } from "@tanstack/react-query";
// import { api, type MessageInput } from "@shared/routes";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { projects } from "@/data/project";
import { experience } from "@/data/experiences";
import { education } from "@/data/education";


// GET /api/profile
export function useProfile() {
  return {
    data: profile,
    isLoading: false,
    isError: false,
  };
}

// GET /api/skills
export function useSkills() {
  return {
    data: skills,
    isLoading: false,
    isError: false,
  };
}

// GET /api/projects
export function useProjects() {
  return {
    data: projects,
    isLoading: false,
    isError: false,
  };
}

// GET /api/experience
export function useExperience() {
  return {
    data: experience,
    isLoading: false,
    isError: false,
  };
}

// GET /api/education
export function useEducation() {
  return {
    data: education,
    isLoading: false,
    isError: false,
  };
}

// // POST /api/contact
// export function useSendMessage() {
//   return useMutation({
//     mutationFn: async (data: MessageInput) => {
//       const validated = api.messages.create.input.parse(data);
//       const res = await fetch(api.messages.create.path, {
//         method: api.messages.create.method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(validated),
//       });

//       if (!res.ok) {
//         if (res.status === 400) {
//           const error = api.messages.create.responses[400].parse(await res.json());
//           throw new Error(error.message);
//         }
//         throw new Error("Failed to send message");
//       }
//       return api.messages.create.responses[201].parse(await res.json());
//     },
//   });
// }
