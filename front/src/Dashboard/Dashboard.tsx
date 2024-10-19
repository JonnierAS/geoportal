import DashboardNav from '@/Dashboard/components/DashboardNav'
import Content from '@/Dashboard/components/Content'

export default function Dashboard() {
  return (
    <div className='block min-h-screen bg-white text-gray-700'>
        <DashboardNav />
        <Content />
    </div>
  )
}
