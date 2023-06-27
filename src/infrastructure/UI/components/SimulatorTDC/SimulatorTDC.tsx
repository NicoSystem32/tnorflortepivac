import React from 'react'

// styled components
import { SimulatorSection, SimulatorContent, DataSimulator } from './simulatorTDC-styles'

import { formatValue, formatDecimalValue } from '../GlobalFuntions/globalFunction'

type SimulatorTDCProps = {
    numberOfPayments: number
    netYield: number
    effectiveRate: number
}

const SimulatorTDC = ({
    numberOfPayments,
    netYield,
    effectiveRate,
}: SimulatorTDCProps): React.ReactElement => {
    return (
        <SimulatorSection data-tour="tdc-simulator">
            <p className="simulator-title">Rendimientos</p>
            <SimulatorContent>
                <DataSimulator className="text-subtitle-po">
                    <dt className="data-label">Tasa efectiva</dt>
                    <dd className="data-value">{effectiveRate * 100}%</dd>
                </DataSimulator>
                <DataSimulator className="text-subtitle-po">
                    <dt className="data-label">Número de pagos</dt>
                    <dd className="data-value">{numberOfPayments}</dd>
                </DataSimulator>
                <DataSimulator className="text-subtitle-po">
                    <dt className="data-label">Rendimiento neto</dt>
                    <dd className="data-value">
                        $ {formatValue(netYield, 1)}
                        <sup className="sub-indice">{formatDecimalValue(netYield, 1)}</sup>
                    </dd>
                </DataSimulator>
            </SimulatorContent>
        </SimulatorSection>
    )
}

export default SimulatorTDC
