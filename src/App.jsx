import { IconButton } from "@material-tailwind/react"


function App() {

  return (
    <>
      
      <div className="flex gap-4">
        <IconButton color="blue">
          Hi
        </IconButton>
        <IconButton color="red">
          <i className="fas fa-heart" />
        </IconButton>
        <IconButton color="green">
          <i className="fas fa-heart" />
        </IconButton>
        <IconButton color="amber">
          <i className="fas fa-heart" />
        </IconButton>
      </div>
      
    </>
  )
}

export default App
