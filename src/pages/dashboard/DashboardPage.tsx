import { useNavigate } from 'react-router-dom'
import { Alert } from '../../components/ui/Alert'
import { ROUTES } from '../../app/paths'
import { useAuth } from '../../data/auth/AuthContext'
import { getTimeGreeting } from '../../lib/greeting'
import { DashboardKpis } from './components/DashboardKpis'
import { RecentRequests } from './components/RecentRequests'
import { ReposicaoNecessaria } from './components/ReposicaoNecessaria'
import { useDashboardPage } from './useDashboardPage'

export function DashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { itemsCount, unitsInStock, criticalItems, openRequests, recentRequests, isLoading, loadError } =
    useDashboardPage()

  const firstName = user?.name.split(' ')[0] ?? ''

  return (
    <div>
      <h2 className="mb-1">
        {getTimeGreeting()}, {firstName}.
      </h2>
      <p className="text-muted text-sm mb-5">Resumo do estoque e das solicitações em andamento.</p>

      {loadError && <Alert>{loadError}</Alert>}

      {isLoading ? (
        <p className="text-muted text-sm px-2 py-6">Carregando painel…</p>
      ) : (
        <>
          <DashboardKpis
            itemsCount={itemsCount}
            unitsInStock={unitsInStock}
            criticalCount={criticalItems.length}
            openRequests={openRequests}
          />

          <div className="grid gap-8 items-start mt-8" style={{ gridTemplateColumns: '1.35fr 1fr' }}>
            <ReposicaoNecessaria items={criticalItems} onViewStock={() => navigate(ROUTES.estoque)} />
            <RecentRequests requests={recentRequests} onAudit={() => navigate(ROUTES.solicitacoes)} />
          </div>
        </>
      )}
    </div>
  )
}
