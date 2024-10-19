import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { useControl } from 'react-map-gl';
import { useDispatch } from 'react-redux';
import { SRMode, SRStyle } from './MapboxScaleRotateMode';
import DragCircleCustomMode from "./drawCircle/drawCircle";
import { setMapboxDrawRef } from '../../../redux/features/mapFeatures';

// Define la interfaz para las props
export interface DrawControlProps {
  position?: string;
  onCreate?: (event: any) => void;
  onUpdate?: (event: any) => void;
  onDelete?: (event: any) => void;
  modeChange?: (event: any) => void;
  onCombine?: (event: any) => void;
  onUncombine?: (event: any) => void;
}

const DrawControl = forwardRef<unknown, DrawControlProps>((props: any, ref) => {
  const dispatch = useDispatch();
  const modes = { ...MapboxDraw.modes };
  modes.draw_circle = DragCircleCustomMode;
  
  const draw = useControl(
    () => new MapboxDraw({
      controls: {
        point: false,
        line_string: false,
        polygon: false,
        draw_circle: true
      },
      userProperties: true,
      styles: SRStyle,
      modes: Object.assign(modes, {
        scaleRotateMode: SRMode,
      }),
    }),
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
    {
      position: props.position
    },
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

DrawControl.displayName = "DrawControl";

DrawControl.defaultProps = {
  onCreate: () => {},
  onUpdate: () => {},
  onDelete: () => {},
  modeChange: () => {},
  onCombine: () => {},
  onUncombine: () => {}
};

export default DrawControl;
