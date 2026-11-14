export function getAdSenseClientId(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  return raw ? raw : undefined;
}

export function buildAdSenseMetaOther(
  clientId?: string
): Record<string, string> | undefined {
  const trimmed = clientId?.trim();
  if (!trimmed) return undefined;
  return { 'google-adsense-account': trimmed };
}

export function buildAdsTxtContent(clientId?: string): string {
  const trimmed = clientId?.trim();
  if (!trimmed) {
    return '# PickKR ads.txt - set NEXT_PUBLIC_ADSENSE_CLIENT_ID to publish authorized seller record\n';
  }
  const pubId = trimmed.startsWith('ca-pub-')
    ? trimmed.replace(/^ca-/, '')
    : trimmed.startsWith('pub-')
      ? trimmed
      : `pub-${trimmed}`;
  return `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;
}
