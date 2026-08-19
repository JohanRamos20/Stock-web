import { SECTOR_LABELS, type Sector, type User } from '../../types/auth'

export interface ApiUser {
  id: string
  name: string
  email: string
  sector: string
  role: string
}

function isKnownSector(value: string): value is Sector {
  return value in SECTOR_LABELS
}

export function mapApiUser(apiUser: ApiUser): User {
  return {
    ...apiUser,
    sector: isKnownSector(apiUser.sector) ? SECTOR_LABELS[apiUser.sector] : apiUser.sector,
  }
}
