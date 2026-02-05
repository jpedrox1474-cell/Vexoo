export function createPageUrl(pageName) {
    if (!pageName) return '/';
    return '/' + pageName.replace(/ /g, '-');
}

export function cn(...inputs) {
    // Mock cn if needed or import from lib/utils if you prefer using that one.
    // For now, this function was not used in Login.jsx but useful to have.
    return inputs.filter(Boolean).join(" ");
}
