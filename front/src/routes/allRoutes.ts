import Dashboard from "@/Dashboard/Dashboard"
import MapContent from "@/map/MapContent"



const publicRoutes = [
    {path: '/map/:id', component: MapContent},
    {path: '/', component: Dashboard}
]

export {publicRoutes}