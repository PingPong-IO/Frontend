import React, { useEffect, useState } from 'react';

function DynamicCanvasSize({ setCanvasSize, innerSize }) {
  useEffect(() => {
    const reRenderCanvasSize = (width, height) => {
      const what = width * 2 > height * 3 ? true : false;
      if (what) setCanvasSize({ width: (height * 3) / 2, height: height });
      else setCanvasSize({ width: width, height: (width * 2) / 3 });
    };

    const handleResize = () => {
      reRenderCanvasSize(innerSize.width, innerSize.height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [innerSize, setCanvasSize]);

  return null;
}

export default DynamicCanvasSize;
