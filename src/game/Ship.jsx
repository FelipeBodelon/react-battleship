
export default function Ship({
  name, 
  type, 
  maxImpacts,
  maxMovement,
  fireRange, 
  currentImpacts=0, 
  id, 
  position
 })
 {
  return {
    name, 
    type, 
    maxImpacts, 
    maxMovement, 
    fireRange, 
    currentImpacts, 
    id, 
    position
  };
}
