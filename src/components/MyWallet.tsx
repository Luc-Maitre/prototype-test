import { useState } from 'react'
import { Button } from '@spark-ui/components/button'
import { Chip } from '@spark-ui/components/chip'

import iconClockArrow from '../assets/icon-clock-arrow.svg'
import iconBatteryStatus from '../assets/icon-battery-status.svg'
import iconChevronBack from '../assets/icon-chevron-back.svg'
import walletOrnament from '../assets/wallet-ornament.svg'
import iconCheck from '../assets/icon-check.svg'
import iconSandglass from '../assets/icon-sandglass.svg'
import iconPiggyBank from '../assets/icon-piggy-bank.svg'
import iconCoins from '../assets/icon-transaction-coins.svg'
import iconShoppingCart from '../assets/icon-shopping-cart.svg'
import iconMonument from '../assets/icon-monument.svg'

type FilterType = 'Tout' | 'Gains' | 'Dépenses' | 'Transferts'

const FILTERS: FilterType[] = ['Tout', 'Gains', 'Dépenses', 'Transferts']

const OPERATIONS: Record<string, Array<{
  id: number
  label: string
  date: string
  amount: string
  type: 'gain' | 'expense' | 'transfer'
}>> = {
  'Jan 2024': [
    { id: 1, label: 'Camera vintage',          date: '10 Jan 2024', amount: '+42,00 €', type: 'gain' },
    { id: 2, label: 'Set de verres en crystal', date: '10 Jan 2024', amount: '-20,00 €', type: 'expense' },
    { id: 3, label: 'Transfer IT16****8491',    date: '10 Jan 2024', amount: '-20,00 €', type: 'transfer' },
  ],
  'Dec 2023': [
    { id: 4, label: 'Camera vintage',        date: '10 Dec 2023', amount: '+42,00 €', type: 'gain' },
    { id: 5, label: 'T-shirt',               date: '10 Dec 2023', amount: '-30,00 €', type: 'expense' },
    { id: 6, label: 'Transfer IT16****8491', date: '10 Dec 2023', amount: '-20,00 €', type: 'transfer' },
  ],
}

const OP_ICON_CONFIG = {
  gain:     { bg: '#e0f2e9', icon: iconCoins },
  expense:  { bg: '#f0f2f5', icon: iconShoppingCart },
  transfer: { bg: '#3a4757', icon: iconMonument },
}

// Dimensions en px pour les images SVG (non affectées par le spacing Spark)
const SZ = { 16: 16, 20: 20, 32: 32, 40: 40, 44: 44 } as const

function OperationIcon({ type }: { type: 'gain' | 'expense' | 'transfer' }) {
  const { bg, icon } = OP_ICON_CONFIG[type]
  return (
    <div
      className="size-sz-40 shrink-0 rounded-lg flex items-start p-[10px]"
      style={{ background: bg }}
    >
      <img alt="" src={icon} width={SZ[20]} height={SZ[20]} style={{ display: 'block' }} />
    </div>
  )
}

function ProgressStep({
  iconSrc, bg, showConnector, children,
}: {
  iconSrc: string
  bg: string
  showConnector: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-md">
      <div className="flex shrink-0 flex-col items-center gap-sm">
        <div
          className="size-sz-32 rounded-full flex items-center justify-center shrink-0"
          style={{ background: bg }}
        >
          <img alt="" src={iconSrc} width={SZ[16]} height={SZ[16]} style={{ display: 'block' }} />
        </div>
        {showConnector && (
          <div className="w-sz-1 flex-1 bg-[rgba(172,184,199,0.56)]" style={{ minHeight: 16 }} />
        )}
      </div>
      <div className="flex-1 py-md">
        {children}
      </div>
    </div>
  )
}

export function MyWallet() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('Tout')

  return (
    <div className="flex min-h-screen justify-center bg-gray-200 py-xl">
      <div className="relative w-[390px] overflow-hidden rounded-[44px] bg-background shadow-2xl">

        {/* iOS Status Bar */}
        <div className="flex h-sz-44 items-center justify-between bg-surface px-xl">
          <span
            className="text-[15px] font-semibold tracking-[-0.5px] text-on-surface"
            style={{ fontFamily: 'system-ui' }}
          >
            9:41
          </span>
          <div className="relative shrink-0" style={{ width: 74, height: 13 }}>
            <img
              alt=""
              src={iconBatteryStatus}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
            />
          </div>
        </div>

        {/* Navbar */}
        <div
          className="relative flex h-[60px] items-center border-b border-[rgba(58,71,87,0.16)] bg-surface px-lg"
          style={{ boxShadow: '0px 4px 4px rgba(108,129,157,0.5)' }}
        >
          <button
            className="size-sz-44 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'rgba(255,255,255,0.16)', boxShadow: '0px 2px 20px rgba(0,0,0,0.1)', border: 'none', cursor: 'pointer' }}
          >
            <img alt="Retour" src={iconChevronBack} width={SZ[16]} height={SZ[16]} style={{ display: 'block' }} />
          </button>
          <p
            className="absolute overflow-hidden text-ellipsis whitespace-nowrap text-center text-headline-2 text-on-surface"
            style={{ left: '18.13%', right: '18.13%' }}
          >
            Mon porte-monnaie
          </p>
        </div>

        {/* Page content */}
        <div className="flex flex-col gap-xl bg-background px-lg pb-sz-40 pt-xl">

          {/* Wallet balance card */}
          <div className="relative w-full overflow-hidden rounded-lg border border-[rgba(172,184,199,0.56)] bg-surface">
            <div style={{ position: 'absolute', left: -274, top: -121, width: 385, height: 417 }}>
              <img
                alt=""
                src={walletOrnament}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
              />
            </div>
            <div className="relative flex flex-col items-center pt-lg">
              <div className="flex flex-col items-center gap-sm">
                <span className="text-body-1" style={{ color: 'rgba(21,34,51,0.72)' }}>
                  Solde disponible
                </span>
                <span className="text-display-1 font-bold text-on-surface">42,00 €</span>
              </div>
              <div className="w-full px-xl py-lg">
                <Button design="tinted" intent="main" size="md" className="w-full">
                  Transférer
                  <img alt="" src={iconMonument} width={SZ[16]} height={SZ[16]} style={{ display: 'inline-block', marginLeft: 8, verticalAlign: 'middle' }} />
                </Button>
              </div>
            </div>
          </div>

          {/* État de votre demande */}
          <div className="flex flex-col gap-lg rounded-lg border border-[rgba(172,184,199,0.56)] bg-surface p-lg">
            <p className="text-headline-2 font-bold text-on-surface">État de votre demande</p>
            <div className="flex flex-col">
              <ProgressStep iconSrc={iconCheck} bg="#e0f2e9" showConnector>
                <p className="text-body-2 text-on-surface">Informations envoyées</p>
              </ProgressStep>
              <ProgressStep iconSrc={iconSandglass} bg="#e6f2fd" showConnector>
                <p className="text-body-2-highlight font-bold text-on-surface">
                  Vérification de l'identité en cours
                </p>
                <p className="mt-sm text-caption" style={{ color: 'rgba(21,34,51,0.72)' }}>
                  Cette étape peut prendre de quelques minutes<br />
                  à 3 jours ouvrés.{' '}
                  <span className="font-bold underline">En savoir plus.</span>
                </p>
              </ProgressStep>
              <ProgressStep iconSrc={iconPiggyBank} bg="#f0f2f5" showConnector={false}>
                <p className="text-body-2 text-on-surface">
                  Vous pouvez utiliser votre porte-monnaie !
                </p>
              </ProgressStep>
            </div>
          </div>

          {/* Liste des opérations */}
          <div className="flex flex-col gap-lg">
            <p className="text-headline-1 font-bold text-on-surface">Liste des opérations</p>

            {/* Chips + Montant à venir */}
            <div className="flex flex-col gap-xl">
              <div className="flex gap-lg overflow-x-auto pb-sm" style={{ scrollbarWidth: 'none' }}>
                {FILTERS.map(filter => (
                  <Chip
                    key={filter}
                    design={activeFilter === filter ? 'tinted' : 'outlined'}
                    intent="support"
                    pressed={activeFilter === filter}
                    onClick={() => setActiveFilter(filter)}
                  >
                    <Chip.Content>{filter}</Chip.Content>
                  </Chip>
                ))}
              </div>

              {/* Montant à venir */}
              <div className="flex items-center justify-between rounded-sm bg-neutral-container p-lg">
                <div className="flex items-center gap-md">
                  <img alt="" src={iconClockArrow} width={SZ[16]} height={SZ[16]} style={{ display: 'block', flexShrink: 0 }} />
                  <p className="text-body-2-highlight font-bold text-on-neutral-container">Montant à venir</p>
                </div>
                <p className="text-body-2-highlight font-bold text-on-neutral-container">+0,00 €</p>
              </div>
            </div>

            {/* Opérations par mois */}
            <div className="flex flex-col gap-sz-40">
              {Object.entries(OPERATIONS).map(([month, items]) => (
                <div key={month} className="flex flex-col gap-lg">
                  <p className="text-headline-2 font-bold text-on-surface">{month}</p>
                  <div className="flex flex-col gap-2xl">
                    {items.map(op => (
                      <div key={op.id} className="flex items-center gap-lg">
                        <OperationIcon type={op.type} />
                        <div className="flex min-w-0 flex-1 flex-col gap-sm">
                          <p className="text-body-2-highlight font-bold text-on-surface">{op.label}</p>
                          <p className="text-caption" style={{ color: 'rgba(21,34,51,0.72)' }}>{op.date}</p>
                        </div>
                        <p
                          className={`text-body-2-highlight font-bold whitespace-nowrap ${op.type === 'gain' ? 'text-success' : 'text-on-surface'}`}
                        >
                          {op.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
