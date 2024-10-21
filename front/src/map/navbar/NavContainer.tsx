import { ButtonHome } from "./components/ButtonHome"

export const NavContainer = () => {
  return (
    <div className='flex flex-auto border-b border-gray-200 px-2 lg:px-0'>
        <nav className='w-full max-w-4xl mx-auto flex items-center justify-between flex-auto gap-x-2 py-2'>
            <h2 className='font-bold text-xl sm:block w-24 text-gray-700 text-center'>
              GeoPortal
            </h2>
            <ButtonHome />
        </nav>
    </div>
  )
}
