import JoinRoom from './joinRoom'
import Chat  from './chat'

export const routes = [
    {
        path: "/",
        element: <JoinRoom />,
    },
    {
        path: "/chat",
        element: <Chat />
    }
]