import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useControl } from 'react-map-gl';
import { useDispatch } from 'react-redux';
import MaplibreDraw from '@/map/mapLibre/mapbox/MaplibreClass'; // Importa la nueva clase
import DragCircleCustomMode from '@/map/mapLibre/mapbox/drawCircle/drawCircle';
import { SRMode, SRStyle } from '@/map/mapLibre/mapbox/MapboxScaleRotateMode';
import { setMapboxDrawRef } from '@/redux/features/mapFeatures';

const DrawControl = forwardRef((props: any, ref: any) => {
  const dispatch = useDispatch();
  const propsMapbox: any = {
    controls: {
      point: false,
      line_string: false,
      polygon: false,
    },
    userProperties: true,
    styles: SRStyle,
    modes: {
      ...MaplibreDraw.modes,
      draw_circle: DragCircleCustomMode,
      scaleRotateMode: SRMode,
    },
  };

  // Usar MaplibreDraw en lugar de MapboxDraw
  const draw = useControl(
    () => new MaplibreDraw(propsMapbox),
    ({ map }) => {
      map.on('draw.create', props.onCreate);
      map.on('draw.update', props.onUpdate);
      map.on('draw.delete', props.onDelete);
      map.on('draw.modechange', props.modeChange);
      map.on('draw.combine', props.onCombine);
      map.on('draw.uncombine', props.onUncombine);
    },
    ({ map }) => {
      map.off('draw.create', props.onCreate);
      map.off('draw.update', props.onUpdate);
      map.off('draw.delete', props.onDelete);
      map.off('draw.modechange', props.modeChange);
      map.off('draw.combine', props.onCombine);
      map.off('draw.uncombine', props.onUncombine);
    },
    { position: props.position }
  );

  useEffect(() => {
    if (draw) {
      dispatch(setMapboxDrawRef(draw));
    }
  }, [draw, dispatch]);

  useImperativeHandle(ref, () => ({
    add: draw.add.bind(draw),
    delete: draw.delete.bind(draw),
    getAll: draw.getAll.bind(draw),
  }));

  return null;
});

DrawControl.displayName = 'DrawControl';

DrawControl.defaultProps = {
  onCreate: () => {},
  onUpdate: () => {},
  onDelete: () => {},
  modeChange: () => {},
  onCombine: () => {},
  onUncombine: () => {},
};

export default DrawControl;
