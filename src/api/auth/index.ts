import type { AuthService } from '../../types/auth'
import { mockAuthService } from './mockAuthService'

/**
 * Único ponto de troca do provedor de autenticação: quando existir uma API
 * real, crie um apiAuthService.ts implementando AuthService e troque a linha
 * abaixo — nenhum outro arquivo (AuthContext, LoginPage) precisa mudar.
 */
export const authService: AuthService = mockAuthService
