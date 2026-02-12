import { fabric } from "fabric"
import FabricTool, { ConfigureCanvasProps } from "./fabrictool"

class HorizontalLineTool extends FabricTool {
  strokeWidth: number = 10
  strokeColor: string = "#ffffff"
  objectCounter: number = 0

  configureCanvas({
    strokeWidth,
    strokeColor,
  }: ConfigureCanvasProps): () => void {
    this._canvas.isDrawingMode = false
    this._canvas.selection = false
    this._canvas.forEachObject((o) => (o.selectable = o.evented = false))
    
    this.strokeWidth = strokeWidth
    this.strokeColor = strokeColor
    
    // Compter seulement les groupes de lignes numérotées
    this.objectCounter = this._canvas.getObjects().filter(
      (obj: any) => obj.type === 'group' && obj.lineNumber !== undefined
    ).length
    
    this._canvas.on("mouse:down", (e: any) => this.onMouseDown(e))
    
    return () => {
      this._canvas.off("mouse:down")
    }
  }

  onMouseDown(o: any) {
    let canvas = this._canvas
    let _clicked = o.e["button"]
    let pointer = canvas.getPointer(o.e)
    
    if (_clicked === 0) {
      this.objectCounter++
      
      // Créer la ligne
      let line = new fabric.Line(
        [0, 0, canvas.getWidth(), 0],
        {
          strokeWidth: this.strokeWidth,
          stroke: this.strokeColor,
        }
      )
      
      // Créer le label
      let label = new fabric.Text(`#${this.objectCounter}`, {
        left: 10,
        top: -20,
        fontSize: 14,
        fill: this.strokeColor,
        fontFamily: 'Arial',
        fontWeight: 'bold',
      })
      
      // Créer un groupe
      let group = new fabric.Group([line, label], {
        left: 0,
        top: pointer.y,
        selectable: false,
        evented: false,
      })
      
      // Ajouter une propriété personnalisée pour identifier
      ;(group as any).lineNumber = this.objectCounter
      
      canvas.add(group)
    }
  }

  onMouseMove(o: any) {}
  onMouseUp(o: any) {}
  onMouseOut(o: any) {}
}

export default HorizontalLineTool