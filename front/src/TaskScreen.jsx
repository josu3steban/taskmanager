import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./routes"

function TaskScreen() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default TaskScreen
