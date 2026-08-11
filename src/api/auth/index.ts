import type { AuthService } from '../../types/auth'
import { apiAuthService } from './apiAuthService'

/**
 * Único ponto de troca do provedor de autenticação: nenhum outro arquivo
 * (AuthContext, LoginPage) precisa mudar ao alternar a implementação aqui.
 */
export const authService: AuthService = apiAuthService
