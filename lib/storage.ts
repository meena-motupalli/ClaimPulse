import { Claim } from '@/types/claim';
import { INITIAL_MOCK_CLAIMS } from '@/data/mockClaims';

const STORAGE_KEY = 'claimpulse_user_claims_v1';

export function getStoredClaims(): Claim[] {
  if (typeof window === 'undefined') return INITIAL_MOCK_CLAIMS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_CLAIMS));
      return INITIAL_MOCK_CLAIMS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_MOCK_CLAIMS;
  } catch (e) {
    return INITIAL_MOCK_CLAIMS;
  }
}

export function getClaimById(id: string): Claim | undefined {
  const claims = getStoredClaims();
  return claims.find((c) => c.id === id);
}

export function saveClaim(newClaim: Omit<Claim, 'id' | 'lastUpdated'>): Claim {
  const claims = getStoredClaims();
  const generatedId = `CP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date().toISOString();

  const fullClaim: Claim = {
    ...newClaim,
    id: generatedId,
    lastUpdated: now,
    source: newClaim.source || 'user_input',
  };

  const updatedList = [fullClaim, ...claims];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  }
  return fullClaim;
}
