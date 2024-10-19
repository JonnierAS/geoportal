import { HomeIcon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom'

export const ButtonHome = () => {
  return (
    <Link to={'/'} className='tooltip text-sm hover:bg-gray-200 rounded p-1'>
        <HomeIcon className='w-5 h-5' />
        <span className='tooltiptext'>Home</span>
    </Link>
  )
}
