import { fabric } from "fabric"
import FabricTool, { ConfigureCanvasProps } from "./fabrictool"

class HorizontalLineTool extends FabricTool {
  strokeWidth: number = 10
  strokeColor: string = "#ffffff"

  configureCanvas({
    strokeWidth,
    strokeColor,
  }: ConfigureCanvasProps): () => void {
    this._canvas.isDrawingMode = false
    this._canvas.selection = false
    this._canvas.forEachObject((o) => (o.selectable = o.evented = false))
    
    this.strokeWidth = strokeWidth
    this.strokeColor = strokeColor
    
    this._canvas.on("mouse:down", (e: any) => this.onMouseDown(e))
    
    return () => {
      this._canvas.off("mouse:down")
    }
  }

  onMouseDown(o: any) {
    let canvas = this._canvas
    let _clicked = o.e["button"]
    let pointer = canvas.getPointer(o.e)
    
    // Créer une ligne horizontale sur toute la largeur du canvas
    let line = new fabric.Line(
      [0, pointer.y, canvas.getWidth(), pointer.y],
      {
        strokeWidth: this.strokeWidth,
        stroke: this.strokeColor,
        selectable: false,
        evented: false,
      }
    )
    
    // Ajouter seulement si clic gauche
    if (_clicked === 0) {
      canvas.add(line)
    }
  }

  onMouseMove(o: any) {
    // Pas d'action nécessaire
  }

  onMouseUp(o: any) {
    // Pas d'action nécessaire
  }

  onMouseOut(o: any) {
    // Pas d'action nécessaire
  }
}

export default HorizontalLineTool