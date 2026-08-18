import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import type { WithdrawalSlipDto } from '../types/withdrawalSlip'
import { formatUnit } from '../lib/units'

const GREEN_DARK = '#1F5D3A'
const GREEN_ACCENT = '#2E8B57'
const LIGHT_BG = '#EEF5F0'
const GRAY_TEXT = '#5B6472'
const BORDER = '#D7E4DB'

const MARGIN = 54
const FOOTER_HEIGHT = 130

const styles = StyleSheet.create({
  page: {
    padding: MARGIN,
    paddingBottom: MARGIN + FOOTER_HEIGHT,
    fontSize: 9.5,
    color: GREEN_DARK,
    fontFamily: 'Helvetica',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    flexGrow: 1,
    paddingRight: 12,
  },
  institution: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: GREEN_DARK,
  },
  institutionSubtitle: {
    fontSize: 9,
    color: GRAY_TEXT,
    marginTop: 2,
  },
  logo: {
    width: 44,
    height: 56,
    objectFit: 'contain',
  },
  divider: {
    borderBottomWidth: 1.2,
    borderBottomColor: BORDER,
    marginTop: 10,
    marginBottom: 14,
  },

  numeroBox: {
    backgroundColor: LIGHT_BG,
    borderWidth: 0.75,
    borderColor: BORDER,
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  numeroTexto: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
  },
  numeroDestaque: {
    color: GREEN_ACCENT,
  },
  dataTexto: {
    fontSize: 9,
    marginTop: 4,
    color: GRAY_TEXT,
  },

  infoBox: {
    borderWidth: 0.75,
    borderColor: BORDER,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.75,
    borderBottomColor: BORDER,
  },
  infoRowLast: {
    borderBottomWidth: 0,
  },
  infoCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  infoCellDivider: {
    borderRightWidth: 0.75,
    borderRightColor: BORDER,
  },
  infoLabel: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: GRAY_TEXT,
    marginRight: 6,
  },
  infoValue: {
    fontSize: 9.5,
    color: GREEN_DARK,
  },

  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: GREEN_DARK,
    marginBottom: 8,
  },

  table: {
    borderWidth: 0.75,
    borderColor: BORDER,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: GREEN_DARK,
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 0.75,
    borderTopColor: BORDER,
  },
  cellDivider: {
    borderRightWidth: 0.75,
    borderRightColor: BORDER,
  },
  th: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#FFFFFF',
    paddingVertical: 7,
    paddingHorizontal: 8,
  },
  td: {
    fontSize: 9.5,
    color: GREEN_DARK,
    paddingVertical: 7,
    paddingHorizontal: 8,
  },
  colItem: { width: '9%', textAlign: 'center' },
  colDescricao: { width: '46%' },
  colTipo: { width: '20%' },
  colUnd: { width: '10%', textAlign: 'center' },
  colQtd: { width: '15%', textAlign: 'center' },

  totalBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: LIGHT_BG,
    borderWidth: 0.75,
    borderColor: BORDER,
    borderTopWidth: 0,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  totalLabel: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: GREEN_DARK,
  },
  totalValue: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: GREEN_DARK,
  },

  footer: {
    position: 'absolute',
    left: MARGIN,
    right: MARGIN,
    bottom: MARGIN,
  },
  footerDivider: {
    borderTopWidth: 0.75,
    borderTopColor: BORDER,
    marginBottom: 20,
  },
  sigRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sigCol: {
    width: '45%',
    alignItems: 'center',
  },
  sigLine: {
    borderTopWidth: 0.75,
    borderTopColor: GRAY_TEXT,
    width: '100%',
    marginBottom: 4,
  },
  sigLabel: {
    fontSize: 9,
    color: GRAY_TEXT,
    textAlign: 'center',
  },
  footerBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 16,
  },
  auditText: {
    fontSize: 7.5,
    color: GRAY_TEXT,
    maxWidth: '80%',
  },
  pageNumber: {
    fontSize: 7.5,
    color: GRAY_TEXT,
  },
})

interface WithdrawalSlipDocumentProps {
  data: WithdrawalSlipDto
}

export function WithdrawalSlipDocument({ data }: WithdrawalSlipDocumentProps) {
  const totalUnits = data.materials.reduce((sum, material) => sum + material.quantity, 0)

  return (
    <Document title={`Termo de Retirada de Material ${data.requestId}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <Text style={styles.institution}>INSTITUTO FEDERAL DO CEARÁ — CAMPUS JAGUARIBE</Text>
            <Text style={styles.institutionSubtitle}>Coordenação de Almoxarifado e Patrimônio (CAP-JAG)</Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.numeroBox}>
          <Text style={styles.numeroTexto}>
            Termo de Retirada de Material Nº: <Text style={styles.numeroDestaque}>{data.requestId}</Text>
          </Text>
          <Text style={styles.dataTexto}>Data: {data.createdAt}</Text>
        </View>

        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <View style={[styles.infoCell, styles.infoCellDivider]}>
              <Text style={styles.infoLabel}>Requisitante:</Text>
              <Text style={styles.infoValue}>{data.requesterName}</Text>
            </View>
            <View style={styles.infoCell}>
              <Text style={styles.infoLabel}>Setor:</Text>
              <Text style={styles.infoValue}>{data.sector}</Text>
            </View>
          </View>
          <View style={[styles.infoRow, styles.infoRowLast]}>
            <View style={styles.infoCell}>
              <Text style={styles.infoLabel}>Prazo:</Text>
              <Text style={styles.infoValue}>{data.deadline}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Materiais Retirados</Text>
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.th, styles.colItem, styles.cellDivider]}>Item</Text>
            <Text style={[styles.th, styles.colDescricao, styles.cellDivider]}>Descrição do Material</Text>
            <Text style={[styles.th, styles.colTipo, styles.cellDivider]}>Tipo</Text>
            <Text style={[styles.th, styles.colUnd, styles.cellDivider]}>Und.</Text>
            <Text style={[styles.th, styles.colQtd]}>Qtd.</Text>
          </View>

          {data.materials.map((material, index) => (
            <View key={`${material.name}-${index}`} style={styles.tableRow}>
              <Text style={[styles.td, styles.colItem, styles.cellDivider]}>
                {String(index + 1).padStart(2, '0')}
              </Text>
              <Text style={[styles.td, styles.colDescricao, styles.cellDivider]}>{material.name}</Text>
              <Text style={[styles.td, styles.colTipo, styles.cellDivider]}>{material.category}</Text>
              <Text style={[styles.td, styles.colUnd, styles.cellDivider]}>{formatUnit(material.unit)}</Text>
              <Text style={[styles.td, styles.colQtd]}>{material.quantity}</Text>
            </View>
          ))}
        </View>
        <View style={styles.totalBar}>
          <Text style={styles.totalLabel}>TOTAL:</Text>
          <Text style={styles.totalValue}>
            {data.materials.length} material(is) • {totalUnits} unidades
          </Text>
        </View>

        <View style={styles.footer} fixed>
          <View style={styles.footerDivider} />
          <View style={styles.sigRow}>
            <View style={styles.sigCol}>
              <View style={styles.sigLine} />
              <Text style={styles.sigLabel}>Assinatura do requisitante</Text>
            </View>
            <View style={styles.sigCol}>
              <View style={styles.sigLine} />
              <Text style={styles.sigLabel}>Assinatura do responsável pelo almoxarifado</Text>
            </View>
          </View>
          <View style={styles.footerBottomRow}>
            <Text style={styles.auditText}>
              Documento gerado eletronicamente pelo sistema STOCK para fins de auditoria — Solicitação{' '}
              {data.requestId}
            </Text>
            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`}
            />
          </View>
        </View>
      </Page>
    </Document>
  )
}
