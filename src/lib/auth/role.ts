export function isAdminRole(role: string): boolean {
  return role.toUpperCase() === 'ADMIN'
}

export function getRoleLabel(role: string): string {
  return isAdminRole(role) ? 'Administrador do almoxarifado' : 'Servidor requisitante'
}
