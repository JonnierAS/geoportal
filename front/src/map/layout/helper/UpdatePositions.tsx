
export const UpdatePositionsHelper = () => {
    const updatePositions = (side: string, className: any, leftValue: string) => {
        const elements = document.querySelectorAll(className);
        elements.forEach((element) => {
          element.style.setProperty(side, leftValue, 'important');
        });
    }
      
  return {updatePositions}
}
