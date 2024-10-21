import React from "react";
import { LeftRigthButton } from "./LeftRigthButton";

export function SidePanel({ side, Component, isResizable=false }: {side: string, Component: any, isResizable: boolean}) {
  const [isResizing, setIsResizing] = React.useState(false);
  const [initialX, setInitialX] = React.useState(0);
  const [panelWidth, setPanelWidth] = React.useState(360)
  React.useEffect(() => {

    if(panelWidth <= 220){
      setShowPanel(false)
      setPanelWidth(360)
    }

    const handleMouseMove = (e: any) => {
      if (isResizing) {
        const deltaX = e.clientX - initialX;
        const newWidth =
          side === "right" ? panelWidth - deltaX : panelWidth + deltaX;
        setPanelWidth(newWidth);
        setInitialX(e.clientX);
      }
    };

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, initialX, panelWidth, setPanelWidth, side]);

  const handleMouseDown = (e: any) => {
    setIsResizing(true);
    setInitialX(e.clientX);
  };

  const panelStyles = {
    width: `${panelWidth}px`,
    height: "100vh",
  };

  const [showPanel, setShowPanel] = React.useState(false);
  return (
    <>
      <LeftRigthButton side={side} showPanel={showPanel} setShowPanel={setShowPanel} panelWidth={panelWidth}/>
      <div
        className={` "sidepanel-container" ${showPanel ? '': 'hidden'} ${side === "right" ? "right-0" : "left-0"}`}
      >
        <div
          className={"sidepanel-content absolute bg-white pt-14 z-[950]"}
          style={panelStyles}
        >
            {/* <Component /> */}
        </div>
          {isResizable && <button
          type="button"
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize panel"
          tabIndex={1}
          className={"absolute top-14 bottom-0 touch-none flex  items-center justify-center w-1 z-[950] bg-indigo-300 hover:bg-indigo-400"}
          style={{
            cursor: "col-resize",
            right: side === "right" ? panelWidth - 5 : "unset",
            left: side === "left" ? panelWidth - 5 : "unset",
          }}
          onMouseDown={handleMouseDown}
        >
          <div className="hover-hover:hidden h-16 w-1 rounded" />
        </button>
        }        
      </div>
    </>
  );
}