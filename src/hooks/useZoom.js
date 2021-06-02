import { useStore, useZoomPanHelper } from 'react-flow-renderer'

const useZoom = () => {
  const { fitView, setCenter } = useZoomPanHelper()
  const store = useStore()
  const { nodes } = store.getState()

  const zoom = node => {
    const zoomNode =
      node && node.id ? nodes.find(el => el.id === node.id) : undefined

    if (zoomNode) {
      const x = zoomNode.__rf.position.x + zoomNode.__rf.width / 2
      const y = zoomNode.__rf.position.y + zoomNode.__rf.height / 2
      const zoomFactor = 1.85

      setCenter(x, y, zoomFactor)
    } else {
      fitView()
    }
  }
  return zoom
}

export default useZoom
