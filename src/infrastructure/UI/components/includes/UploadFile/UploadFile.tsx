import { ReactElement, FC, ReactNode } from 'react'
import { Accept, FileError, FileRejection, useDropzone } from 'react-dropzone'

// styles
import {
    TextInstruction,
    UploaderFileCtr,
    UploaderFileH4,
    UploaderFileImg,
    UploaderFileText,
    UploadFileCtr,
    UploadFileLeft,
    UploadFileRight,
} from './uploadFile-styles'

// icons
import { UploadFileSVG } from '../../../utils/getIcons'

export interface UploadFileProps {
    fieldTexts: PropertiesText
    maxSize: number
    children: ReactNode
    onDrop: (accFiles: File[], rejFiles: FileRejection[]) => void
    accept?: Accept
    multiple?: boolean
}

export interface PropertiesText {
    titleDnD: string
    textExtension: string
    instructionText: string
}

export interface UploadableFile {
    file: File
    errors: FileError[]
}

const UploadFile: FC<UploadFileProps> = ({
    accept,
    multiple = false,
    maxSize,
    onDrop,
    fieldTexts,
    children,
}): ReactElement => {
    const { getRootProps, getInputProps } = useDropzone({
        maxSize,
        onDrop,
        multiple,
        accept,
    })

    return (
        <UploadFileCtr>
            <UploadFileLeft {...getRootProps()}>
                <input {...getInputProps()} />
                <UploaderFileCtr>
                    <UploaderFileImg src={UploadFileSVG} alt="Icon" />
                    <UploaderFileH4>{fieldTexts.titleDnD}</UploaderFileH4>
                    <UploaderFileText>{fieldTexts.textExtension}</UploaderFileText>
                </UploaderFileCtr>
            </UploadFileLeft>
            <UploadFileRight>
                <TextInstruction>{fieldTexts.instructionText}</TextInstruction>
                {children}
            </UploadFileRight>
        </UploadFileCtr>
    )
}

export default UploadFile
