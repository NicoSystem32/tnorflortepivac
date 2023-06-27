import { appInsights } from './appInsights'

const SaveLog = (err) => {
    appInsights.trackException({ error: err })
}

export default SaveLog
