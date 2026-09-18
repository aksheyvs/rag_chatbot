/**
 * The fixed profile source used by the resume chat.
 * Replace the values below with the resume owner's verified information.
 */
export const resumeProfile = {
    name: "Not provided",
    summary: "No verified profile summary has been configured yet.",
    skills: [],
    technologies: [],
    projects: [
        {
            name: "AI Weather App",
            description: "A project referenced by the product examples, but no verified project details have been configured yet.",
        },
    ],
    education: "Not provided",
} as const;

export const resumeProfileContext = `
Name: ${resumeProfile.name}
Summary: ${resumeProfile.summary}
Skills: ${resumeProfile.skills.join(", ") || "Not provided"}
Technologies: ${resumeProfile.technologies.join(", ") || "Not provided"}
Projects:
${resumeProfile.projects.map((project) => `- ${project.name}: ${project.description}`).join("\n")}
Education: ${resumeProfile.education}
`.trim();