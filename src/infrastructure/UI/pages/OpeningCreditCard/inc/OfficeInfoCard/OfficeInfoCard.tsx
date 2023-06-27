import { ReactElement, FC } from 'react'

// styles
import {
    CtrNotificationOffice,
    LinkOffice,
    OfficeInformation,
    OfficeInformationCol,
    OfficeInformationIcon,
    OfficeInformationRow,
    OfficeInformationText,
    OfficeTitle,
} from './officeInfoCard-styles'

// Icons
import { MiniPhoneSVG, PickerMapSVG, TimeSVG } from '../../../../utils/getIcons'
import { OfficeData } from '../../../../../../domain/models'
import { Loading } from '../../../../components'

export interface OfficeInfoCardProps {
    onModifyOffice: () => void
    office: OfficeData
    loadingOffices: boolean
}

const OfficeInfoCard: FC<OfficeInfoCardProps> = ({
    onModifyOffice,
    office,
    loadingOffices,
}): ReactElement => {
    return (
        <CtrNotificationOffice>
            {loadingOffices ? (
                <Loading />
            ) : (
                <>
                    <OfficeTitle>
                        {office?.oFCDepartment
                            ? `${office?.oFCDepartment}, ${office?.oFCCity}`
                            : 'Cavipetrol Club Ecopetrol'}
                    </OfficeTitle>
                    <OfficeInformation>
                        <OfficeInformationCol>
                            <OfficeInformationRow>
                                <OfficeInformationIcon src={PickerMapSVG} alt="location" />
                                <OfficeInformationText>
                                    {office?.oFCAddress ?? 'Calle 127 #54 - 17'}
                                </OfficeInformationText>
                            </OfficeInformationRow>
                            <OfficeInformationRow>
                                <OfficeInformationIcon src={MiniPhoneSVG} alt="phone" />
                                <OfficeInformationText>
                                    {office?.oFCPhone ?? '(601) 898 7898'}
                                </OfficeInformationText>
                            </OfficeInformationRow>
                        </OfficeInformationCol>
                        <OfficeInformationCol>
                            <OfficeInformationRow>
                                <OfficeInformationIcon src={TimeSVG} alt="" />
                                <OfficeInformationText>
                                    {office?.oFCAttentionHours ?? 'Lu - Vi'}
                                </OfficeInformationText>
                            </OfficeInformationRow>
                            <OfficeInformationRow>
                                <OfficeInformationIcon src={TimeSVG} alt="" />
                                <OfficeInformationText>
                                    {office?.oFCAttentionHours ?? '8:00 Am - 5:00 Pm'}
                                </OfficeInformationText>
                            </OfficeInformationRow>
                        </OfficeInformationCol>
                    </OfficeInformation>
                    <LinkOffice onClick={onModifyOffice}>Modificar oficina</LinkOffice>
                </>
            )}
        </CtrNotificationOffice>
    )
}

export default OfficeInfoCard
