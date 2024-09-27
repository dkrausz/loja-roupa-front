import { Banner } from "./components/banner"
import { CardList } from "./components/cardList"
import { Footer } from "./components/footer"
import { Header } from "./components/header"

function App() {


  return (
    <>
    <Header/>
    <main>    
      <Banner/>
      <CardList/>
    </main>
    <Footer/>

    </>
  )
}

export default App
