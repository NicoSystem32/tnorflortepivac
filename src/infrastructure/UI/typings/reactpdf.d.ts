import '@react-pdf/renderer'

declare module '@react-pdf/renderer' {
    export interface DocumentProps {
        title?: string
        author?: string
        subject?: string
        creator?: string
        keywords?: string
        producer?: string
        language?: string
        pdfVersion?: PDFVersion
        onRender?: (props: OnRenderProps) => any
        children?: React.ReactNode
    }
}
