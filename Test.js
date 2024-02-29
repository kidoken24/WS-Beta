function Drag(evt){
    
  
  var SVG = document.getElementById("SVG");
  SVG.addEventListener('mousedown',StartDrag);
  SVG.addEventListener('mousemove',DragMove);
  SVG.addEventListener('mouseup',EndDrag);
  SVG.addEventListener('mouseleave',EndDrag);

  function MousePosition(evt){
      var CTM = SVG.getScreenCTM();
      return{
          x: (evt.clientX - CTM.e)/CTM.a,
          y: (evt.clientY - CTM.f)/CTM.d
      };
  }

  var ElementSelection, offset, transform;
  function DragInit(evt){
      offset = MousePosition(evt);

      var transforms = ElementSelection.transform.baseVal;
      if(transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE)
      {
          var translate = SVG.createSVGTransform();
          translate.setTranslate(0, 0);
          ElementSelection.transform.baseVal.insertItemBefore(translate, 0);
      }

      transform = transforms.getItem(0);
      offset.x -= transform.matrix.e;
      offset.y -= transform.matrix.f;
  }

  function StartDrag(evt){
      if(document.getElementById("SVG").parentNode.classList.contains('draggable-group'))
      {
          ElementSelection = evt.target.parentNode;
          DragInit(evt);
      }
  }
  
  function DragMove(evt){
      if(ElementSelection)
      {
          console.log('if_true')
          evt.preventDefault();
          var coord = MousePosition(evt);
          transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
      }
  }

  function EndDrag(evt){
      ElementSelection = false;
  }

}