import { ReactElement, FC, useState, useEffect } from 'react'

import { FileAndProgressBar } from '..'

// styles
import { StyledCardsFile } from './listFilesAndProgressBar-styles'

export interface ListFilesAndProgressBarProps {
    files: File[]
    progress?: number
    onDelete?: (name: string) => void
}

const ListFilesAndProgressBar: FC<ListFilesAndProgressBarProps> = ({
    files,
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
        <StyledCardsFile>
            {files.length > 0 &&
                files.map((file) => (
                    <FileAndProgressBar
                        key={`${file.name}-file`}
                        fileName={file.name}
                        onDelete={(name) => {
                            if (onDelete) {
                                onDelete(name)
                            }
                        }}
                    />
                ))}
        </StyledCardsFile>
    )
}

export default ListFilesAndProgressBar
