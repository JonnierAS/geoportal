import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { UpdatePositionsHelper } from "./helper/UpdatePositions";

export const LeftRigthButton = ({ side, setShowPanel, showPanel, panelWidth }: {side: string, setShowPanel: any, showPanel: boolean, panelWidth: number}) => {
    const helper = UpdatePositionsHelper()

    const panelStyles = side === "right" ? showPanel ? {right: `${panelWidth}px`} : {right: 0} : showPanel ?  {left: `${panelWidth}px`} : { left: 0 }

    const handleChangePanel = ()=>{
      setShowPanel(!showPanel)
      const leftValue = side == 'left' && !showPanel ? '370px' : '12px';
      if(side == 'left'){
        helper.updatePositions(side,'.leaflet-bottom',leftValue)
        helper.updatePositions(side,'.maplibregl-ctrl-top-left', leftValue);
        helper.updatePositions(side,'.maplibregl-ctrl-bottom-left', leftValue);
      }
  }

    return (    
        <button
          onClick={handleChangePanel}
          aria-label="Abrir panel"
          style={panelStyles}
          className={`
                ${side === "right" ? "border-l rounded-r-none" : "border-r rounded-l-none"}
                absolute px-0.5 py-2 top-1/2 border-t border-b
                bg-white hover:bg-purple-100 border-gray-300
                rounded z-[950]
            `}
        >
          {showPanel ? side === 'right' ? <ChevronRightIcon /> : <ChevronLeftIcon /> : side === 'right' ? <ChevronLeftIcon /> : <ChevronRightIcon /> }
        </button>        
  );
}
