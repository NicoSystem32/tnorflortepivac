import { ReactElement, FC, useState, useEffect } from 'react'

// styles
import {
    StyledCardFile,
    StyledCardFileName,
    StyledCardFileIcon,
    Progress,
    CtrProgress,
} from './fileAndProgressBar-styles'

// icons
import { CloseCircleSVG } from '../../../../utils/getIcons'

export interface FileAndProgressBarProps {
    fileName: string
    progress?: number
    onDelete?: (name: string) => void
}

const FilesAndProgressBar: FC<FileAndProgressBarProps> = ({
    fileName,
    progress = 20,
    onDelete,
}): ReactElement => {
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        const timer = counter < 100 && setInterval(() => setCounter(counter + 1), 10)

        return () => {
            if (timer) {
                return clearInterval(timer)
            }
        }
    }, [counter])

    return (
        <StyledCardFile>
            <StyledCardFileName>{fileName}</StyledCardFileName>
            {counter < 100 ? (
                <CtrProgress>
                    <Progress now={counter} variant="warning" />
                    <span>{counter}%</span>
                </CtrProgress>
            ) : (
                <StyledCardFileIcon
                    src={CloseCircleSVG}
                    alt="Delete"
                    onClick={() => {
                        if (onDelete) {
                            onDelete(fileName)
                        }
                    }}
                />
            )}
        </StyledCardFile>
    )
}

export default FilesAndProgressBar
