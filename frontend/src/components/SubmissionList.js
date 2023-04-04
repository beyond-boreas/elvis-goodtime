import { useContext } from 'react'
import { SocketContext } from '../contexts/SocketContext'

function SubmissionList({ submissions }) {
    return (
        <ul>
        {submissions.map(submission =>
            <li key={submission.content}>
                {submission.user} {submission.content}
            </li>
        )}
        </ul>
    )
}

export default SubmissionList