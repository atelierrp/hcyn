import { liveEvents } from "@/content/live";
import { installations } from "@/content/installations";
import { registrations } from "@/content/registrations";
import { projects } from "@/content/projects/black-square";

export function getLiveEventsByStatus(status) {
  return liveEvents.filter((e) => e.status === status);
}

export function getInstallationsByStatus(status) {
  return installations.filter((i) => i.status === status);
}

export function getInstallationBySlug(slug) {
  return installations.find((i) => i.slug === slug);
}

export function getInstallationSlugs() {
  return installations.map((i) => i.slug);
}

export function getRegistrationBySlug(slug) {
  return registrations.find((r) => r.slug === slug);
}

export function getRegistrationSlugs() {
  return registrations.map((r) => r.slug);
}

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs() {
  return projects.map((p) => p.slug);
}
