export const CONTACT_DRAWER_EVENT = "souraw:open-contact-drawer";

export function openContactDrawer() {
    window.dispatchEvent(new Event(CONTACT_DRAWER_EVENT));
}
